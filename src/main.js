let shop = document.getElementById('shop');

//!Retreiving the data from the localStorage and storing into the application
let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, price, desc, img } = item;
      let search = basket.find((item) => item.id === id) || [];
      return ` <div class="item">
    <img width="220" src=${img} alt="" />
    <div id=product-id-${id} class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
  </div>`;
    })
    .join(''));
};

generateShop();

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

  localStorage.setItem('data', JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((item) => item.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket
    .map((item) => item.item)
    .reduce((item, y) => item + y, 0);
  // console.log(basket.map((item) => item.item).reduce((item, y) => item + y, 0));
};

calculation();
