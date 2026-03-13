let cart = [];
let total = 0;

fetch("http://localhost:5000/products")
.then(response => response.json())
.then(products => {

const container = document.getElementById("products");

products.forEach(product => {

const productDiv = document.createElement("div");
productDiv.className = "product";

productDiv.innerHTML = `
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<img src="${product.image}" width="150" height="150">
<button>Add to Cart</button>
`;

const button = productDiv.querySelector("button");

button.addEventListener("click", function(){
addToCart(product);
});

container.appendChild(productDiv);

});

});

function addToCart(product){

cart.push(product);

const cartList = document.getElementById("cart");

const item = document.createElement("li");
item.textContent = product.name + " - ₹" + product.price;

cartList.appendChild(item);

total += product.price;

document.getElementById("total").innerText = "Total: ₹" + total;

}

function placeOrder(){

if(cart.length === 0){
alert("Your cart is empty!");
return;
}

alert("Order placed successfully!");

cart = [];
total = 0;

document.getElementById("cart").innerHTML = "";
document.getElementById("total").innerText = "Total: ₹0";

}