using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseNoroff.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int ProductQuantity { get; set; }
        public decimal TotalPrice { get; set; }
        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }

        //public virtual Member Member { get; set; }
        //public virtual Comment Comment { get; set; }

        //public int Something { get; set; }
        //public string SomethingElse { get; set; }
    }
}
