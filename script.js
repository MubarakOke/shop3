let products = [
    { id: 1, name: "Laptop", amount: 800,  },
    { id: 2, name: "Smartphone", amount: 600 },
    { id: 3, name: "book", amount: 700 },
    { id: 4, name: "house", amount: 400 },
    { id: 5, name: "dryer", amount: 800 },
    { id: 6, name: "bag", amount: 200 },
    { id: 7, name: "pen", amount: 200 },
    { id: 8, name: "shoe", amount: 600 },
    { id: 9, name: "hat", amount: 900 },
    { id: 10, name: "cheger", amount: 300 },
  ];
  
  let cart = [];
  let isAddProductVisible = false;
let isCartVisible = false;

function toggleAddProduct() {
    const addProductSection = document.querySelector('.add-product');
    isAddProductVisible = !isAddProductVisible;

    if (isAddProductVisible) {
        addProductSection.style.display = 'flex'; 
      } else {
        addProductSection.style.display = 'none';
      }
    }

function toggleCart() {
    const cartSection = document.querySelector('.cart');
    isCartVisible = !isCartVisible;
    
    if (isCartVisible) {
        cartSection.classList.remove('hidden');
    } else {
        cartSection.classList.add('hidden');
    }
    }

function displayProducts() {
const productsContainer = document.querySelector('.products');
productsContainer.innerHTML = '';
products.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
});
}
  
  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>#${product.amount}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    return productElement;
  }
  
  function toggleAddProductForm() {
    const addProductForm = document.querySelector('.add-product');
    addProductForm.classList.toggle('hidden');
  }
  
  function addNewProduct() {
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').files[0];
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    // Regular expressions for validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;

    if (!nameRegex.test(productName)) {
        displayTopMessage('Please enter a valid name.');
        return;
    }

    if (!priceRegex.test(productPrice)) {
        displayTopMessage('Please enter a valid price (e.g., 10.99).');
        return;
    }
  
    if (productName && productImage && !isNaN(productPrice) && productPrice > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const newProduct = {
          id: products.length + 1,
          name: productName,
          amount: productPrice,
          image: e.target.result,
        };
  
        products.push(newProduct);
        displayProducts();
        displayTopMessage('Product added!')
      };
      reader.readAsDataURL(productImage);
      const addProductForm = document.querySelector('.add-product');
      addProductForm.classList.add('hidden');
    } else {
      alert('Please enter valid product information.');
    }
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      displayCartItems();
      displayTopMessage('Item added to cart!');
    }
  }
  
  function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name} - #${item.amount} x ${item.quantity}</p>
        <button onclick="increaseQuantity(${item.id})">+</button>
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <button onclick="removeItem(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += item.amount * item.quantity;
    });
    document.getElementById('totalAmount').textContent = total.toFixed(2);
  }
  
  function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
      displayCartItems();
    }
  }
  
  function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      displayCartItems();
    }
  }
  
  function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCartItems();
  }
  
  function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value;
    if (couponCode === 'WEB3BRIDGECOHORTx') {
      const totalAmount = parseFloat(document.getElementById('totalAmount').textContent);
      const discount = totalAmount * 0.1;
      const discountedTotal = totalAmount - discount;
      document.getElementById('totalAmount').textContent = discountedTotal.toFixed(2);
    } else {
      alert('Invalid coupon code');
    }
  }
  
  function checkout() {
    const checkoutMessage = document.getElementById('checkoutMessage');
    checkoutMessage.textContent = 'You have successfully checked out!';
    const mainSection = document.querySelector('.main');
    mainSection.classList.add('hidden');
  
    const checkoutSection = document.querySelector('.checkout');
    checkoutSection.classList.remove('hidden');
  }
  
  function redirectToHome() {
    const mainSection = document.querySelector('.main');
    mainSection.classList.remove('hidden');
  
    const checkoutSection = document.querySelector('.checkout');
    checkoutSection.classList.add('hidden');
  }
  
  function toggleCart() {
    const cartSection = document.querySelector('.cart');
    cartSection.classList.toggle('hidden');
  }
  
  function showCart() {
    const mainSection = document.querySelector('.main');
    mainSection.classList.add('hidden');
  
    const cartSection = document.querySelector('.cart');
    cartSection.classList.remove('hidden');
  }

  function displayTopMessage(message) {
    const topMessage = document.getElementById('topMessage');
    topMessage.textContent = message;
    topMessage.classList.remove('hidden');
    setTimeout(() => {
      topMessage.classList.add('hidden');
    }, 3000);
  }
  
  // Load cart from local storage on page load (if exists)
  window.onload = function () {
    const addProductForm = document.querySelector('.add-product');
    addProductForm.classList.add('hidden');
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
      displayCartItems();
    }
  };
  
  // Save cart to local storage on page unload
  window.onunload = function () {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // Call function to display products when the page loads
  displayProducts();
  