using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using CaseNoroff.Data;
using CaseNoroff.Models;
using CaseNoroff.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseNoroff.Controllers
{
    [Authorize]
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

        [HttpGet]
        public List<Customer> Customers()
        {
			var apiKey = "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";
			var client = new SendGridClient(apiKey);
			var from = new EmailAddress("kristian.nilsen@no.experis.com", "Vipps store");
			var to = new EmailAddress("yakihah538@mailernam.com"); //get user email
			var subject = "Order confirmation";
			var plainText = "lmao";
			var htmlContent = "<strong>Gucci belt</strong>";
			var msg = MailHelper.CreateSingleEmail(from, to, subject, plainText, htmlContent);
			client.SendEmailAsync(msg);
				
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
            return _db.Products.Include(s => s.Size).ToList();
        }

        public List<Customer> CustomerAndOrderAndOrderItemAndProduct()
        {
            return _db.Customers.Include(o => o.Orders).ThenInclude(oi => oi.OrderItems)
                .ThenInclude(p => p.Product).ToList();
        }

        [HttpPost]
        public CustomerOrderViewModel CustomerAndOrderAndOrderItem([FromBody] CustomerOrderViewModel customerOrderViewModel)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
                if (userId != null)
                {
                    customerOrderViewModel.Customer.UserId = userId;
                }

                _db.Customers.Add(customerOrderViewModel.Customer);
                _db.SaveChanges();

                customerOrderViewModel.Order.CustomerId = customerOrderViewModel.Customer.CustomerId;
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

        [HttpPost]
        public OrderViewModel OrderAndOrderItem([FromBody] OrderViewModel orderViewModel)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
                Customer customer = null;
                if (userId != null)
                {
                    customer = _db.Customers.FirstOrDefault(c => c.UserId == userId);

                    //customerOrderViewModel.Customer.UserId = userId;
                }


                orderViewModel.Order.CustomerId = customer.CustomerId;
                orderViewModel.Order.OrderDate = DateTime.Now;
                _db.Orders.Add(orderViewModel.Order);
                _db.SaveChanges();

                foreach (OrderItem orderItem in orderViewModel.OrderItems)
                {
                    orderItem.OrderId = orderViewModel.Order.OrderId;
                    _db.OrderItems.Add(orderItem);
                    _db.SaveChanges();
                }
            }

            return orderViewModel;
        }
    }
}
