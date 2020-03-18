using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CaseNoroff.Data;
using CaseNoroff.Models;
using CaseNoroff.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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

        public ActionResult<Customer> Customer()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId

            if (userId == null)
            {
                return NotFound();
            }
            return _db.Customers.FirstOrDefault(c => c.UserId == userId);
        }

        //Add new customer, update if already exists. Should be used in profilpage, or new order if logged in
        [HttpPost]
        public Customer Customer([FromBody] Customer customer)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId

                if (userId != null)
                {
                    customer.UserId = userId;
                    var user = _db.Users.FirstOrDefault(c => c.Id == userId);
                    customer.Email = user.UserName;
                    var alreadyCustomer = _db.Customers.AsNoTracking().FirstOrDefault(c => c.Email == customer.Email);
                    if (alreadyCustomer != null) //Update if customer already exists
                    {
                        customer.CustomerId = alreadyCustomer.CustomerId;
                        _db.Update(customer);
                        _db.SaveChanges();
                        return customer;
                    }                 

                }
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

        //public List<Order> Orders()
        //{
        //    return _db.Orders.ToList();
        //}

        public List<Product> Product()
        {
            return _db.Products.Include(s => s.Size).ToList();
        }

        //public List<Customer> CustomerAndOrderAndOrderItemAndProduct()
        //{
        //    return _db.Customers.Include(o => o.Orders).ThenInclude(oi => oi.OrderItems)
        //        .ThenInclude(p => p.Product).ToList();
        //}

        [HttpPost]
        public CustomerOrderViewModel CustomerAndOrderAndOrderItem([FromBody] CustomerOrderViewModel customerOrderViewModel)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
                Customer customer = null;
                if (userId != null)
                {
                    customer = _db.Customers.FirstOrDefault(c => c.UserId == userId);
                    customerOrderViewModel.Customer = customer; //Only to get the customer on return data, nothing is added
                    customerOrderViewModel.Order.CustomerId = customer.CustomerId;
                }
                else
                {
                    _db.Customers.Add(customerOrderViewModel.Customer);
                    _db.SaveChanges();
                    customerOrderViewModel.Order.CustomerId = customerOrderViewModel.Customer.CustomerId;
                }

                customerOrderViewModel.Order.OrderDate = DateTime.Now;
                _db.Orders.Add(customerOrderViewModel.Order);
                _db.SaveChanges();

                foreach(OrderItem orderItem in customerOrderViewModel.OrderItems)
                {
                    orderItem.OrderId = customerOrderViewModel.Order.OrderId;
                    _db.OrderItems.Add(orderItem);
                    _db.SaveChanges();
                }
            }

            return customerOrderViewModel;
        }

        public List<Order> OrderAndOrderItemAndProduct()
        {
            return _db.Orders.Include(oi => oi.OrderItems)
                .ThenInclude(p => p.Product).ToList();
        }
    }
}
