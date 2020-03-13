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

        public Customer Customer(int id)
        {
            return _db.Customers.Find(id);
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

        public List<Customer> Customers()
        {
            return _db.Customers.ToList();
        }

        public Order Order(int id)
        {
            return _db.Orders.Include(oi => oi.OrderItems).ThenInclude(p => p.Product).SingleOrDefault(o => o.OrderId == id);
        }

        [HttpPost]
        public Order Order([FromBody] Order order)
        {
            if (ModelState.IsValid)
            {
                order.OrderDate = DateTime.Now;
                _db.Orders.Add(order);
                _db.SaveChanges();
            }

            return order;
        }

        public List<Order> Orders()
        {
            return _db.Orders.ToList();
        }

        public List<Product> Product()
        {
            return _db.Products.ToList();
        }

        //public List<OrderItem> OrderItem()
        //{
        //    return _db.OrderItems.ToList();
        //}

        public List<Customer> CustomerAndOrderAndOrderItemAndProduct()
        {
            return _db.Customers.Include(o => o.Orders).ThenInclude(oi => oi.OrderItems)
                .ThenInclude(p => p.Product).ToList();
        }

        //[HttpPost]
        //public Order CustomerAndOrderAndOrderItemAndProduct(Customer customer)
        //{
        //    //return _db.Customers.Include(o => o.Orders).ThenInclude(oi => oi.OrderItems)
        //    //    .ThenInclude(p => p.Product).ToList();
        //    if (ModelState.IsValid)
        //    {
        //        _db.Customers.Add(customer);
        //        _db.Orders.Add(customer.Orders.FirstOrDefault());
        //        _db.SaveChanges();
        //    }

        //    return customer;
        //}

        public List<Order> OrderAndOrderItemAndProduct()
        {
            return _db.Orders.Include(oi => oi.OrderItems)
                .ThenInclude(p => p.Product).ToList();
        }
    }
}