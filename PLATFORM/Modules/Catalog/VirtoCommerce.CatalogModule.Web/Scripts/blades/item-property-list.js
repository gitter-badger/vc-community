﻿angular.module('virtoCommerce.catalogModule')
.controller('virtoCommerce.catalogModule.itemPropertyListController', ['$scope', 'virtoCommerce.catalogModule.items', 'virtoCommerce.catalogModule.properties', 'platformWebApp.bladeNavigationService', 'platformWebApp.dialogService', function ($scope, items, properties, bladeNavigationService, dialogService) {
    var blade = $scope.blade;

    blade.refresh = function (parentRefresh) {
        items.get({ id: blade.itemId }, function (data) {
            if (data.properties) {
                var numberProps = _.where(data.properties, { valueType: 'Number', multivalue: false, dictionary: false });
                _.forEach(numberProps, function (prop) {
                    _.forEach(prop.values, function (value) {
                        value.value = parseFloat(value.value);
                    });
                });
            }
            //if (data.titularItemId != null) {
            //    $scope.propGroups = [{ title: 'Variation properties', type: 1 }];
            //} else {
            //    $scope.propGroups = [{ title: 'Product properties', type: 0 }];
            //}

            blade.item = angular.copy(data);
            blade.origItem = data;
            blade.isLoading = false;
            if (parentRefresh) {
                blade.parentBlade.refresh();
            }
        },
        function (error) { bladeNavigationService.setError('Error ' + error.status, $scope.blade); });
    }

    function isDirty() {
        return !angular.equals(blade.item, blade.origItem);
    };

    function saveChanges() {
        blade.isLoading = true;
        var changes = { id: blade.item.id, properties: blade.item.properties };
        items.update({}, changes, function (data, headers) {
            blade.refresh(true);
        },
        function (error) { bladeNavigationService.setError('Error ' + error.status, $scope.blade); });
    };

    blade.onClose = function (closeCallback) {
        if (isDirty()) {
            var dialog = {
                id: "confirmItemChange",
                title: "catalog.dialogs.item-save.title",
                message: "catalog.dialogs.item-save.message"
            };
            dialog.callback = function (needSave) {
                if (needSave) {
                    saveChanges();
                }
                closeCallback();
            };
            dialogService.showConfirmationDialog(dialog);
        }
        else {
            closeCallback();
        }
    };

    $scope.editProperty = function (prop) {
        if (prop.isManageable) {
            var newBlade = {
                id: 'editCategoryProperty',
                currentEntityId: prop.id,
                title: 'catalog.blades.property-detail.title-item',
                subtitle: 'catalog.blades.property-detail.subtitle-item',
                controller: 'virtoCommerce.catalogModule.propertyDetailController',
                template: 'Modules/$(VirtoCommerce.Catalog)/Scripts/blades/property-detail.tpl.html'
            };
            bladeNavigationService.showBlade(newBlade, blade);
        } else {
            editUnmanageable({
                title: 'catalog.blades.item-property-detail.title',
                origEntity: prop
            });
        }
    };

    function editUnmanageable(bladeData) {
        var newBlade = {
            id: 'editItemProperty',
            subtitle: 'catalog.blades.item-property-detail.subtitle',
            controller: 'virtoCommerce.catalogModule.itemPropertyDetailController',
            template: 'Modules/$(VirtoCommerce.Catalog)/Scripts/blades/item-property-detail.tpl.html'
        };
        angular.extend(newBlade, bladeData);

        bladeNavigationService.showBlade(newBlade, blade);
    }

    $scope.getPropValues = function (propId, keyword) {
        return properties.values({ propertyId: propId, keyword: keyword }).$promise.then(function (result) {
            return result;
        });
    };

    var formScope;
    $scope.setForm = function (form) {
        formScope = form;
    }

    blade.headIcon = 'fa-gear';

    blade.toolbarCommands = [
		{
		    name: "platform.commands.save", icon: 'fa fa-save',
		    executeMethod: function () {
		        saveChanges();
		    },
		    canExecuteMethod: function () {
		        return isDirty() && formScope && formScope.$valid;
		    },
		    permission: 'catalog:update'
		},
        {
            name: "platform.commands.reset", icon: 'fa fa-undo',
            executeMethod: function () {
                angular.copy(blade.origItem, blade.item);
            },
            canExecuteMethod: function () {
                return isDirty();
            },
            permission: 'catalog:update'
        },
		{
		    name: "catalog.commands.add-property", icon: 'fa fa-plus',
		    executeMethod: function () {
		        editUnmanageable({
		            isNew: true,
		            title: 'catalog.blades.item-property-detail.title-new',
		            origEntity: {
		                type: "Product",
		                valueType: "ShortText",
                        values:[]
		            }
		        });
		    },
		    canExecuteMethod: function () { return true; },
		    permission: 'catalog:update'
		}
    ];

    blade.refresh();
}]);
