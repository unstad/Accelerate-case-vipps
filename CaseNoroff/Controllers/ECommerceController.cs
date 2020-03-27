using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
                return Unauthorized();
            }
            var customer = _db.Customers.FirstOrDefault(c => c.UserId == userId);

            if(customer == null)
            {
                var email = _db.Users.First(u => u.Id == userId);
                customer = new Customer();
                customer.Email = email.ToString();
            }

            return customer;
        }

        //Add new customer, update if already exists. Should be used in profilpage, or new order if logged in
        [HttpPost]
        public ActionResult<Customer> Customer([FromBody] Customer customer)
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
                    _db.Customers.Add(customer);
                    _db.SaveChanges();
                    return customer;
                }
                return Unauthorized();
            }
            return NotFound();
        }

        public ActionResult<List<Order>> Order()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
            Customer customer = _db.Customers.FirstOrDefault(c => c.UserId == userId);

            if (userId == null)
            {
                return Unauthorized();
            }
            return _db.Orders.Where(o => o.CustomerId == customer.CustomerId).Include(da => da.DeliveryAddress).Include(oi => oi.OrderItems).ThenInclude(p => p.Product).ToList();
        }

        public ActionResult<Order> Order(int order_id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
            Customer customer = _db.Customers.FirstOrDefault(c => c.UserId == userId);

            if (userId == null)
            {
                return Unauthorized();
            }
            return _db.Orders.Where(o => o.OrderId == order_id && o.CustomerId == customer.CustomerId).Include(da => da.DeliveryAddress).Include(oi => oi.OrderItems).ThenInclude(p => p.Product).SingleOrDefault(o => o.OrderId == order_id);
        }

        public List<Product> Product()
        {
            return _db.Products.Include(s => s.Size).ToList();
        }

        //CustomerAndOrderAndDeliveryAdressAndOrderItem
        [HttpPost]
        public CustomerOrderViewModel Order([FromBody] CustomerOrderViewModel customerOrderViewModel)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
                var userIdFromMail = _db.Users.FirstOrDefault(u => u.Email == customerOrderViewModel.Customer.Email);
                if (customerOrderViewModel.Customer.UserId == null && userId != null)
                {
                    customerOrderViewModel.Customer.UserId = userId;
                }
                else if (customerOrderViewModel.Customer.UserId == null && userIdFromMail != null)
                {
                    customerOrderViewModel.Customer.UserId = userIdFromMail.Id;
                }


                var alreadyCustomer = _db.Customers.AsNoTracking().FirstOrDefault(c => c.Email == customerOrderViewModel.Customer.Email);
                if (alreadyCustomer != null) //Update if customer already exists
                {
                    customerOrderViewModel.Customer.CustomerId = alreadyCustomer.CustomerId;
                    if (alreadyCustomer.UserId == null && userId != null)
                    {
                        customerOrderViewModel.Customer.UserId = userId;
                    }
                    _db.Update(customerOrderViewModel.Customer);
                    _db.SaveChanges();
                }
                else
                {
                    _db.Customers.Add(customerOrderViewModel.Customer);
                    _db.SaveChanges();
                }

                customerOrderViewModel.Order.CustomerId = customerOrderViewModel.Customer.CustomerId;
                customerOrderViewModel.Order.OrderDate = DateTime.Now;
                _db.Orders.Add(customerOrderViewModel.Order);
                _db.SaveChanges();

                customerOrderViewModel.DeliveryAddress.OrderId = customerOrderViewModel.Order.OrderId;
                _db.DeliveryAddresses.Add(customerOrderViewModel.DeliveryAddress);
                _db.SaveChanges();

                foreach (OrderItem orderItem in customerOrderViewModel.OrderItems)
                {
                    orderItem.OrderId = customerOrderViewModel.Order.OrderId;
                    _db.OrderItems.Add(orderItem);
                    _db.SaveChanges();
                }           

                // Credentials
                // Legg inn din Epost og passord her!
                var credentials = new NetworkCredential("noroffvipps@gmail.com", "Noroff31012?");
                string productString = "";
                string productList = "";
                string seeOrderOnline = "";
                decimal totalPrice = 0.00M;

                if(customerOrderViewModel.Customer.UserId != null)
                {
                    seeOrderOnline = "<p>Log in <a  href='https://localhost:5001/Identity/Account/Login?returnUrl=%2Fauthentication%2Flogin'>here</a> to see order online.</p>";
                }
                else
                {
                    seeOrderOnline = "<p>Follow this <a href='https://localhost:5001/Identity/Account/Register?returnUrl=/authentication/login&customerId=" + customerOrderViewModel.Customer.CustomerId + "'>link</a> to register user, and view order online.</p>";
                }


                if (customerOrderViewModel.OrderItems.Count > 1)
                {
                    productString = "<h2>Products</h2>";
                }
                else
                {
                    productString = "<h2>Product</h2>";
                }

                foreach (var product in customerOrderViewModel.OrderItems)
                {
                    var productObject = _db.Products.FirstOrDefault(p => p.ProductId == product.ProductId);

                    productList += "<tr><td style='border-bottom:1px solid black;text-align: left;'>" + productObject.ProductName +
                        "</td><td style='border-bottom:1px solid black;text-align: right;'>" + product.ProductQuantity +
                        "</td><td style='border-bottom:1px solid black;text-align: right;'>" + product.TotalPrice + ",-</td></tr>";
                    totalPrice += Convert.ToDecimal(product.TotalPrice);
                }

                productString += "<table style='width:100%'>" +
                    "<tr>" +
                        "<th style='border-bottom:1px solid black; text-align: left;'>Product</th>" +
                        "<th style='border-bottom:1px solid black; text-align: right;'>Product quantity</th>" +
                        "<th style='border-bottom:1px solid black; text-align: right;'>Price</th>" +
                    "</tr>" +
                        productList +
                        "<tr><td></td><td></td><td style='text-align: right;'>= " + totalPrice + ",-</td></tr>" +
                 "</table>";

                // Mail message
                var mail = new MailMessage()
                {
                    From = new MailAddress("noroffvipps@gmail.com"),
                    Subject = "Order Confirmation Noroff Vipps",
                    Body = "<div style='text-align:center'>" +
                                "<h1>Order Confirmation Noroff Vipps</h1>" +
                                "<p>Your order id is: " + customerOrderViewModel.Order.OrderId + "</p>" +
                                seeOrderOnline +
                                productString +
                                "<h2>Delivery address</h2>" +
                                "<p>" + customerOrderViewModel.Customer.FirstName + " " + customerOrderViewModel.Customer.LastName + "</p>" +
                                "<p>" + customerOrderViewModel.DeliveryAddress.StreetAddress + "</p>" +
                                "<p>" + customerOrderViewModel.DeliveryAddress.PostalCode + " " + customerOrderViewModel.DeliveryAddress.City + "</p>" +
                                "<p>" + customerOrderViewModel.DeliveryAddress.Country + "</p>" +
                                "<br>" +
                                //"<h2>Order Confirmation Noroff Vipps</h2>" +
                          "</div>"
                };
                mail.IsBodyHtml = true;
                mail.To.Add(new MailAddress(customerOrderViewModel.Customer.Email));
                // Smtp client
                var client = new SmtpClient()
                {
                    Port = 587,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Host = "smtp.gmail.com",
                    EnableSsl = true,
                    Credentials = credentials
                };
                client.Send(mail);
            }

            return customerOrderViewModel;
        }




        //public List<Order> Orders()
        //{
        //    return _db.Orders.ToList();
        //}


        //public List<Customer> CustomerAndOrderAndOrderItemAndProduct()
        //{
        //    return _db.Customers.Include(o => o.Orders).ThenInclude(oi => oi.OrderItems)
        //        .ThenInclude(p => p.Product).ToList();
        //}


        //public List<Customer> Customers()
        //{
        //    return _db.Customers.ToList();
        //}

        //[HttpPost]
        //public Order Order([FromBody] Order order)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        order.OrderDate = DateTime.Now;
        //        _db.Orders.Add(order);
        //        _db.SaveChanges();
        //    }

        //    return order;
        //}

        //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
        //Customer customer = null;
        //if (userId != null)
        //{
        //    customer = _db.Customers.FirstOrDefault(c => c.UserId == userId);
        //    customerOrderViewModel.Customer = customer; //Only to get the customer on return data, nothing is added
        //    customerOrderViewModel.Order.CustomerId = customer.CustomerId;
        //}
        //else
        //{
        //}
    }
}
