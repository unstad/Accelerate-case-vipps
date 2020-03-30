using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CaseNoroff.Data;
using CaseNoroff.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

using System.Security.Claims;


namespace CaseNoroff.Controllers
{
    /* 
     Stripe can be tested with standard card number, exp and cvc
     card number: 4242 4242 4242
     exp: anything thats not expired ex. 08/22
     cvc: anything, atleast 3 digits.
         */
    public class StripeController : Controller
    {
        private readonly ApplicationDbContext _db;
        public StripeController(ApplicationDbContext db)
        {
            _db = db;
        }

        [Route("pay")]
        public async Task<dynamic> Pay(Models.PaymentModel pm)
        {
            return await MakePayment.PayAsync(pm.cardnumber, pm.month, pm.year, pm.cvc, pm.value);
        }

        [Route("secret")]
        [HttpGet]
        public ActionResult Secret()
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = 1099,
                Currency = "nok",
                Metadata = new Dictionary<string, string>
            {
              { "integration_check", "accept_a_payment" },
            },
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);
            return Content(paymentIntent.ClientSecret);
        }

        [Route("charge")]
        [HttpPost]
        public ActionResult Charge(string stripeToken, int value, string stripeEmail, [FromBody] CustomerOrderViewModel customerOrderViewModel)
        {
            // init chargeoptions
            var myCharge = new ChargeCreateOptions();
            // set chargeoptions
            myCharge.Amount = value;
            myCharge.Currency = "NOK";
            myCharge.ReceiptEmail = stripeEmail;
            myCharge.Description = "Sample Charge";
            myCharge.Source = stripeToken;
            myCharge.Capture = true;
            // init chargeservice
            var chargeService = new ChargeService();
            // execute charge with options set
            //Charge stripeCharge = chargeService.Create(myCharge);
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
            bool fromStripe = true;
            //Post order
            new ECommerceController(_db).Order(customerOrderViewModel, fromStripe, userId);
            // response to client
            return Ok("ok");
        }
    }
}