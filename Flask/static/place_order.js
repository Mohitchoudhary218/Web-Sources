var order = {
  customer : {
    first_name : "",
    last_name : ""
  },
  pizza : []
}

var iteration = 0
var pizzaType = "Please enter the type"
var pizzaSize = "Please enter the Size"

function render_view(order,pizzaType,pizzaSize) {
  document.getElementById("confirmation").innerHTML = "Customer name " +
    order.customer.first_name + " " + order.customer.last_name

  ordersTable = document.getElementById("ordersTable")
  tableBody = ordersTable.getElementsByTagName("tbody")[0]

  tableBody.innerHTML = ""

  var row = tableBody.insertRow(0)

  var cell1 = row.insertCell(0)
  
  cell1.innerHTML = pizzaType

  var cell2 = row.insertCell(1)
  cell2.innerHTML = pizzaSize

  document.getElementById("rawJson").innerHTML = "<pre>" + JSON.stringify(order, null, " ") + "</pre>"
}

render_view(order,pizzaType,pizzaSize)

function createOrder() {
    var firstName =
        document.getElementById("firstNameInput").value

    var lastName =
        document.getElementById("lastNameInput").value

    var pizzaType = document.querySelector('input[name="pizzaType"]:checked').value

    var pizzaSize = document.querySelector('input[name="pizzaSize"]:checked').value

    var quantity = document.getElementById("quantity").value

    order.customer.first_name = firstName
    order.customer.last_name = lastName

    var quan = parseInt(quantity)

    order.pizza[iteration]= {
    pizza_type : pizzaType,
    pizza_size : pizzaSize,
    count: quan
  }

  iteration +=1

  var ele = document.getElementsByName("pizzaType");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
  
  var ele1 = document.getElementsByName("pizzaSize");
    for(var i=0;i<ele1.length;i++)
      ele1[i].checked = false;
  document.getElementById("quantity").value = "";

  render_view(order,pizzaType,pizzaSize)

}

async function sending(event)
{
  event.preventDefault()
  let response = await (fetch("submit", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(order)
    }))
  
  let result = await response.json()
  document.getElementById("responseFromServer").innerHTML = "<pre>" + JSON.stringify(result, null, " ") + "</pre>"


}

document.getElementById("submitButton").addEventListener("click", createOrder)
document.getElementById("transfer").addEventListener("click",sending)

document.getElementById("final").addEventListener("click",func)

function func()
{
  document.getElementById("response").innerHTML = "Customer: " + order.customer.first_name + " " + order.customer.last_name
  document.getElementById("response1").innerHTML = "Status: Confirmed"
  document.getElementById("response2").innerHTML = "Order details:"
  for(let i =0; i < order.pizza.length; i++)
  {
    document.getElementById("response3").innerHTML += (i+1 + "." + " " + order.pizza[i].count + " " + order.pizza[i].pizza_size + " " + order.pizza[i].pizza_type) + "<br/>"
  }
}


