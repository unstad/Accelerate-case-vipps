<h1>API Documentation</h1>

<h2>Get products</h2>
<p>Returns json data about the products</p>

<h3>Endpoint Method:</h3>
<p>GET</p>

<h3>Endpoint path</h3>
<p>CommerceController/Product</p>

<h3>Required and accepted headers</h3>
<p>None</p>

<h3>Accepted parameters</h3>
<p>None</p>

<h3>Expected changes to the data</h3>
<p>None</p>

<h3>Possible responses and their meanings</h3>
<p>It will return json data about all the products along with the sizes</p>

<h3>Possible error cases with explanations</h3>
<p>Product list is empty</p>

<hr>

<h2>Get orders and product info</h2>
<p>Returns json data about the orders and product info</p>

<h3>Endpoint Method:</h3>
<p>GET</p>

<h3>Endpoint path</h3>
<p>CommerceController/Order</p>

<h3>Required and accepted headers</h3>
<p>Authorization headers are required.</p>

<h3>Accepted parameters</h3>
<p>None</p>

<h3>Expected changes to the data</h3>
<p>None</p>

<h3>Possible responses and their meanings</h3>
<p>If a user is logged in, it will return orders and products in json, if the logged in user don't have orders it will not return anything.<br />If there is no authorization in the header it will return "404 Not Found"</p>

<h3>Possible error cases with explanations</h3>
<p>Forget authorization in the header</p>

<hr>

<h2>Get order</h2>
<p>Returns json data about the order and product info</p>

<h3>Endpoint Method:</h3>
<p>GET</p>

<h3>Endpoint path</h3>
<p>CommerceController/Order/order_id</p>

<h3>Required and accepted headers</h3>
<p>Authorization headers are required.</p>

<h3>Accepted parameters</h3>
<p>Must have order id to get the order it is looking for</p>

<h3>Expected changes to the data</h3>
<p>None</p>

<h3>Possible responses and their meanings</h3>
<p>If a user is logged in, it will return the order and products in json, if the logged in user don't have that order it will not return anything.<br />If there is no authorization in the header it will return "404 Not Found"</p>

<h3>Possible error cases with explanations</h3>
<p>Parameter can be in wrong format, forget authorization in the header or the order doesn't exists</p>

<hr>

<h2>Get customer info</h2>
<p>Returns json data about logged in customer.</p>

<h3>Endpoint Method:</h3>
<p>GET</p>

<h3>Endpoint path</h3>
<p>CommerceController/Customer</p>

<h3>Required and accepted headers</h3>
<p>Authorization headers are required.</p>

<h3>Accepted parameters</h3>
<p>None</p>

<h3>Expected changes to the data</h3>
<p>None</p>

<h3>Possible responses and their meanings</h3>
<p>If a user is logged in, it will return customer info in json, if the logged in user don't have customer info it will not return anything.<br />If there is no authorization in the header it will return "404 Not Found"</p>

<h3>Possible error cases with explanations</h3>
<p>Forget authorization in the header</p>

<hr>

<h2>Add or update customer</h2>
<p>Returns json data about the new customer or the updated one.</p>

<h3>Endpoint Method:</h3>
<p>POST</p>

<h3>Endpoint path</h3>
<p>CommerceController/Customer</p>

<h3>Required and accepted headers</h3>
<p>Authorization headers are accepted but not required.</p>

<h3>Accepted parameters</h3>
<p>None</p>

<h3>Expected changes to the data</h3>
<p>If the user is not logged in, it will check</p>

<h3>Possible responses and their meanings</h3>
<p>It will return customer info in json, if the user don't have customer info it will not return anything.<br />If there is no authorization in the header it will return "404 Not Found"</p>

<h3>Possible error cases with explanations</h3>
<p>The modelstate might be wrong or authorization headers are forgotton</p>

<hr>

<h2>Get orders and product info</h2>
<p>Returns json data about the orders and product info</p>

<h3>Endpoint Method:</h3>
<p>GET</p>

<h3>Endpoint path</h3>
<p>CommerceController/Order</p>

<h3>Required and accepted headers</h3>
<p>Authorization headers are required.</p>

<h3>Accepted parameters</h3>
<p>None</p>

<h3>Expected changes to the data</h3>
<p>None</p>

<h3>Possible responses and their meanings</h3>
<p>If a user is logged in, it will return orders and products in json, if the logged in user don't have orders it will not return anything.<br />If there is no authorization in the header it will return "404 Not Found"</p>

<h3>Possible error cases with explanations</h3>
<p>Forget authorization in the header</p>

<hr>

<h2>Post order</h2>
<p>Returns json data about the order and product info, will also send email confirmation</p>

<h3>Endpoint Method:</h3>
<p>POST</p>

<h3>Endpoint path</h3>
<p>CommerceController/Order</p>

<h3>Required and accepted headers</h3>
<p>Authorization headers are not required, but you can use it</p>

<h3>Accepted parameters</h3>
<p>None</p>

<h3>Expected changes to the data</h3>
<p>None</p>

<h3>Possible responses and their meanings</h3>
<p>It will return the customer info, order and products in json. There will also be sent a confirmation email.</p>

<h3>Possible error cases with explanations</h3>
<p>Parameter can be in wrong format</p>
