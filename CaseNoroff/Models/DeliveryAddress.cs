using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseNoroff.Models
{
    public class DeliveryAddress
    {
        public int DeliveryAddressId { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        public string Country { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }

    }
}
