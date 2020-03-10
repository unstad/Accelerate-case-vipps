using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseNoroff.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        public string Country { get; set; }
        public int? UserId { get; set; }
    }
}
