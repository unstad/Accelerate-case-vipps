<h1>API Documentation</h1>


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
<p></p>
