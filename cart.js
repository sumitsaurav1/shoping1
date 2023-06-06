let userDetails = JSON.parse(localStorage.getItem("userDetails"))
let userIndex = JSON.parse(localStorage.getItem("userIndex"));

let profile = document.getElementById("profile");
profile.innerText=`Hi, ${userDetails[userIndex].firstName} ${userDetails[userIndex].lastName}`;
let cartProduct = document.getElementById("cart-product");

let products= "";

let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));

cartDetails.forEach((product,i)=>{
   
    products += `<div class="product">
        <img src="${product.image}" alt="">
        <h3>${product.title}</h3>
        <div>${product.price}</div>
        <div>
            ${product.description}
        </div>
        <div>${product.category}</div>
        <div>${product.color}</div>
        <div>${product.size}</div>
        <button id=${product.id}  class="removeFromCart">Remove From Cart</button>
    </div>`

})

cartProduct.innerHTML="";
cartProduct.innerHTML=products;
//localStorage.removeItem("cartDetails")
function removeFromCart(i,cartDetails){
    cartDetails.splice(i,1);
    updateCartQuantity(cartDetails)
    let updatedProducts= "";
    cartDetails.forEach((product,j)=>{
   
        updatedProducts += `<div class="product">
            <img src="${product.image}" alt="">
            <h3>${product.title}</h3>
            <div>${product.price}</div>
            <div>
                ${product.description}
            </div>
            <div>${product.category}</div>
            <div>${product.color}</div>
            <div>${product.size}</div>
            <button id=${product.id} class="removeFromCart">Remove From Cart</button>
        </div>`
    
    })
    
    cartProduct.innerHTML="";
    cartProduct.innerHTML=updatedProducts;
    localStorage.setItem("cartDetails",JSON.stringify(cartDetails))
    checkBill(cartDetails)
    addRemoveFromCartListeners();
    displayMessage(cartDetails)
    if (cartDetails.length === 0) {
        billContainer.innerHTML = "";
    }
}
function addRemoveFromCartListeners() {
    cartDetails.forEach((product, index) => {
      document.getElementById(`${product.id}`).addEventListener("click", (e) => {
        e.preventDefault();
        removeFromCart(index, cartDetails);
      });
    });
}

addRemoveFromCartListeners();

//let bill = document.getElementById("bill");
let billContainer = document.getElementById("bill-container");

function generateBill(bills,total){
    //let bills ="";
    billContainer.innerHTML="";

    let cheackoutlist = document.createElement("div");
    cheackoutlist.setAttribute("class","cheackout-list");
    // billContainer.appendChild(cheackoutlist);

    let h3 = document.createElement("h3");
    h3.innerText="Checkout List";
    cheackoutlist.appendChild(h3);

    let bill = document.createElement("div");
    bill.setAttribute("class","bill");
    bill.setAttribute("id","bill");
    
    // cartDetails.forEach((product)=>{
    //     bills += `<div class="bill-element">
    //         <div>${product.title}</div>
    //         <div>$ ${product.price}</div>
    //     </div>`
    // })

    bill.innerHTML = bills;
    cheackoutlist.appendChild(bill);

    billContainer.appendChild(cheackoutlist);

    let totalBill = document.createElement("div");
    totalBill.setAttribute("class","bill-element total-bill");

    totalBill.innerHTML=`<div>Total</div>
                        <div>$ ${total}</div>`

    billContainer.appendChild(totalBill);  
    
    let checkoutButton = document.createElement("button");
    checkoutButton.setAttribute("class","checkout");
    checkoutButton.setAttribute("id","checkout");
    checkoutButton.innerText="Checkout"
    billContainer.appendChild(checkoutButton);  
    
}

function checkBill(cartDetails){
    let total=0;
    let bills ="";
    cartDetails.forEach((product)=>{
        bills += `<div class="bill-element">
            <div>${product.title}</div>
            <div>$ ${product.price}</div>
        </div>`
        total +=product.price;
    })
    total = total.toFixed(2);
    if(bills){
        generateBill(bills,total);
    }
}

checkBill(cartDetails)

let message =  document.getElementById("message");

function displayMessage(cartDetails){
    if(cartDetails.length>0){
        message.style.display="none"
    }else{
        message.style.display="block"
    }
}

displayMessage(cartDetails)


//update cart quantity
let digit = document.getElementById("digit");
function updateCartQuantity(cartDetails){
    digit.innerText=""
    digit.innerText=`${cartDetails.length}`
}

updateCartQuantity(cartDetails)