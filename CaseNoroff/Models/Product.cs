using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CaseNoroff.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ImgURL { get; set; }
        public virtual ICollection<Size> Size { get; set; }
        //public ICollection<OrderItem> OrderItems { get; set; }

    }
}