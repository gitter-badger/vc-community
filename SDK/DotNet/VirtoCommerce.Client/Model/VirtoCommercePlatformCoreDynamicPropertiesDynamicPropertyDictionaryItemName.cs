using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;



namespace VirtoCommerce.Client.Model
{

    /// <summary>
    /// 
    /// </summary>
    [DataContract]
    public class VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName : IEquatable<VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName" /> class.
        /// </summary>
        public VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName()
        {
            
        }

        
        /// <summary>
        /// Gets or Sets Locale
        /// </summary>
        [DataMember(Name="locale", EmitDefaultValue=false)]
        public string Locale { get; set; }
  
        
        /// <summary>
        /// Gets or Sets Name
        /// </summary>
        [DataMember(Name="name", EmitDefaultValue=false)]
        public string Name { get; set; }
  
        
  
        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName {\n");
            sb.Append("  Locale: ").Append(Locale).Append("\n");
            sb.Append("  Name: ").Append(Name).Append("\n");
            
            sb.Append("}\n");
            return sb.ToString();
        }
  
        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="obj">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object obj)
        {
            // credit: http://stackoverflow.com/a/10454552/677735
            return this.Equals(obj as VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName);
        }

        /// <summary>
        /// Returns true if VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName instances are equal
        /// </summary>
        /// <param name="obj">Instance of VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(VirtoCommercePlatformCoreDynamicPropertiesDynamicPropertyDictionaryItemName other)
        {
            // credit: http://stackoverflow.com/a/10454552/677735
            if (other == null)
                return false;

            return 
                (
                    this.Locale == other.Locale ||
                    this.Locale != null &&
                    this.Locale.Equals(other.Locale)
                ) && 
                (
                    this.Name == other.Name ||
                    this.Name != null &&
                    this.Name.Equals(other.Name)
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            // credit: http://stackoverflow.com/a/263416/677735
            unchecked // Overflow is fine, just wrap
            {
                int hash = 41;
                // Suitable nullity checks etc, of course :)
                
                if (this.Locale != null)
                    hash = hash * 57 + this.Locale.GetHashCode();
                
                if (this.Name != null)
                    hash = hash * 57 + this.Name.GetHashCode();
                
                return hash;
            }
        }

    }


}
