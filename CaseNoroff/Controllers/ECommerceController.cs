using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CaseNoroff.Data;
using CaseNoroff.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseNoroff.Controllers
{
    public class ECommerceController : Controller
    {
        private readonly ApplicationDbContext _db;
        public ECommerceController(ApplicationDbContext db)
        {
            _db = db;
        }

        public List<Customer> Customer()
        {
            return _db.Customers.ToList();
        }

        [HttpPost]
        public Customer Customer([FromBody] Customer customer)
        {
            if (ModelState.IsValid)
            {
                _db.Customers.Add(customer);
                _db.SaveChanges();
            }

            return customer;
        }

        public List<Customer> CustomerAndOrder()
        {
            return _db.Customers.Include(o => o.Orders).ToList();
        }

        public List<Order> Order()
        {
            return _db.Orders.ToList();
        }

        public List<Product> Product()
        {
            return _db.Products.ToList();
        }
        //[HttpPost]
        //Order + OrderItems



        public List<OrderItem> OrderItem()
        {
            return _db.OrderItems.ToList();
        }
    }
}