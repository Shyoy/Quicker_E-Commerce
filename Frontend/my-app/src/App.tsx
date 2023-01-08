import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <head>
        <title>My E-Commerce Site</title>
        <link rel="stylesheet" href="/css/style.css"/>
      </head>
      <body>
        <header>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <div id="search-container">
            <form>
              <input type="text" placeholder="Search for products"/>
              <button type="submit">Search</button>
            </form>
          </div>
        </header>
        <nav>
          <ul>
            <li><a href="/categories/clothing">Clothing</a></li>
            <li><a href="/categories/shoes">Shoes</a></li>
            <li><a href="/categories/accessories">Accessories</a></li>
          </ul>
        </nav>
        <main>
          <div className="container">
            <h1>Featured Products</h1>
            <div className="product-grid">
              <div className="product">
                <img src="/images/product1.jpg" alt="Product 1"/>
                <h2>Product 1</h2>
                <p>$19.99</p>
                <button>Add to Cart</button>
              </div>
              <div className="product">
                <img src="/images/product2.jpg" alt="Product 2"/>
                <h2>Product 2</h2>
                <p>$29.99</p>
                <button>Add to Cart</button>
              </div>
              <div className="product">
                <img src="/images/product3.jpg" alt="Product 3"/>
                <h2>Product 3</h2>
                <p>$39.99</p>
                <button>Add to Cart</button>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="container">
            <div className="contact-info">
              <h3>Contact Us</h3>
              <p>Phone: 555-555-5555</p>
              <p>Email: info@ecommerce.com</p>
            </div>
            <div className="social-media">
              <h3>Follow Us</h3>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
            <p>Copyright 2021</p>
          </div>
        </footer>
      </body>
    </div>
  );
}

export default App;
