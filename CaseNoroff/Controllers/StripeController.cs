using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace CaseNoroff.Controllers
{
    public class StripeController : Controller
    {
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
        public ActionResult Charge(string stripeToken, int value, string stripeEmail)
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

            // response to client
            return Ok("ok");
        }
    }
}