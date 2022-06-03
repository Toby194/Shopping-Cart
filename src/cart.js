let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');

// console.log(shopItemsData);

let basket = JSON.parse(localStorage.getItem('data')) || [];

// console.log(basket);

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket
    .map((item) => item.item)
    .reduce((item, y) => item + y, 0);
  // console.log(basket.map((item) => item.item).reduce((item, y) => item + y, 0));
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        // console.log(x);

        //! This id is coming from basket id
        let { id, item } = x;

        //! y is id from Data.js
        let search = shopItemsData.find((y) => y.id === id) || [];

        //! Destructuring the object
        let { img, name, price } = search;

        return `
        <div class="cart-item">
          <img width="100" src=${img} alt="" />
          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$ ${price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

            <h3>$ ${item * search.price}</h3>
            
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      `;
      })
      .join('')); //join('') will erase coma shown on the browser
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((item) => item.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item++;
  }

  // console.log(basket);

  generateCartItems();

  update(selectedItem.id);

  //!To store data into local storage
  localStorage.setItem('data', JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((item) => item.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item--;
  }

  update(selectedItem.id);

  //!To store data into local storage
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);

  generateCartItems();

  localStorage.setItem('data', JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((item) => item.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  calculation();

  localStorage.setItem('data', JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem('data', JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      // console.log(amount);
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
      <h2>Total Bill: $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

totalAmount();
