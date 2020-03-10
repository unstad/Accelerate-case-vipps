using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CaseNoroff.Data;
using CaseNoroff.Models;
using Microsoft.AspNetCore.Mvc;

namespace CaseNoroff.Controllers
{
    public class ECommerceController : Controller
    {
        private readonly ApplicationDbContext _db;
        public ECommerceController(ApplicationDbContext db)
        {
            _db = db;
        }

        public Object Index()
        {
            return _db.Customers.FirstOrDefault();
        }
    }
}