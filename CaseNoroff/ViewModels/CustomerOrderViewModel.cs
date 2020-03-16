using CaseNoroff.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseNoroff.ViewModels
{
    public class CustomerOrderViewModel
    {
        public Customer Customer { get; set; }
        public Order Order { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
