import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./styles.css";

const products = [
  {
    id: 1,
    name: "Áo Sơ Mi Thom Browne Nam Nữ Cộc Tay Cao Cấp",
    description: "Thời trang hiện đại Nam và Nữ",
    image:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljdvgdckqlle94@resize_w450_nl.webp",
    price: 250000,
  },
  {
    id: 2,
    name: "Sơ mi Thom Browne Cộc Tay Viền Cổ",
    description: "Thời trang hiện đại Nam và Nữ",
    image: "https://antonsstore.com/wp-content/uploads/2020/06/8-6-360x360.png",
    price: 640000,
  },
  {
    id: 3,
    name: "Sơ mi Thom Browne Kẻ Cộc Tay Viền Tay",
    description: "Thời trang hiện đại  Nam và Nữ",
    image:
      "https://antonsstore.com/wp-content/uploads/2018/07/11b80b2e20bce5e2bcad-360x360.jpg",
    price: 300000,
  },
  {
    id: 4,
    name: "Áo Thun len Thom Browne nam",
    description: "Thời trang hiện đại  Nam và Nữ",
    image:
      "https://myastore.vn/Uploads/images/product/item/ao-thun-len-thom-browne-nam-size-m-433877/2acf7c8a-cb49-47a2-865b-fc0879b29ba2.jpg",
    price: 350000,
  },
  {
    id: 5,
    name: "Áo Polo Thome Browne cọc tay Cotton mịn",
    description: "Thời trang hiện đại  Nam và Nữ",
    image:
      "https://bizweb.dktcdn.net/100/490/101/products/e791804a6f94c0ca998518-1712221792378.jpg?v=1731374120040",
    price: 250000,
  },
  {
    id: 6,
    name: "THOM BROWNE Men Plain Weave Suiting Shorts",
    description: "Thời trang hiện đại  Nam",
    image:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/476/319/products/hervia-com-thom-browne-four-bar-plain-weave-low-rise-shorts-1579530612thom-1-1.png?v=1694157237223",
    price: 150000,
  },
];

function Navbar({ cartCount }) {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Howl's Shop</Link>
      </div>
      <div className="nav-icons">
        <Link to="/">
          <i className="fa fa-home" title="Trang chủ"></i>
        </Link>
        <Link to="/cart" className="cart-icon">
          <i className="fa fa-shopping-cart" title="Giỏ hàng"></i>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

function ProductList({ addToCart, handleBuyNow }) {
  return (
    <div>
      <main>
        <div className="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Giá: {product.price.toLocaleString()} VNĐ</p>
              <button onClick={() => addToCart(product)}>
                Thêm vào giỏ hàng
              </button>
              <button onClick={() => handleBuyNow(product)}>Mua ngay</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function ProductDetail({ addToCart, handleBuyNow }) {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  // Điều kiện để áp dụng lớp CSS thu nhỏ
  const isSmallImage = [1, 2, 3, 4, 5, 6].includes(product.id);

  return (
    <div className="product-detail">
      <header>
        <Link to="/" style={{ margin: "10px", textDecoration: "none" }}>
          Quay lại
        </Link>
      </header>
      <main>
        <div className="product-detail-info">
          <img
            src={product.image}
            alt={product.name}
            className={isSmallImage ? "small-image" : ""}
          />
          <div className="product-detail-text">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Giá: {product.price.toLocaleString()} VNĐ</p>
            <button onClick={() => addToCart(product)}>
              Thêm vào giỏ hàng
            </button>
            <button onClick={() => handleBuyNow(product)}>Mua ngay</button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Cart({ cart, removeFromCart, calculateTotal, handleCheckout }) {
  return (
    <div>
      <header>
        <h1>Giỏ Hàng</h1>
        <Link to="/" style={{ margin: "10px", textDecoration: "none" }}>
          Quay lại
        </Link>
      </header>
      <main>
        {cart.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    {item.name} - {item.price.toLocaleString()} VNĐ
                  </div>
                  <button onClick={() => removeFromCart(index)}>Xóa</button>
                </li>
              ))}
            </ul>
            <h3>Tổng tiền: {calculateTotal().toLocaleString()} VNĐ</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Tiến hành thanh toán
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleBuyNow = (product) => {
    if (!cart.includes(product)) {
      setCart((prevCart) => [...prevCart, product]);
    }
    navigate("/cart");
  };

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList addToCart={addToCart} handleBuyNow={handleBuyNow} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
              handleCheckout={() => alert("Thanh toán thành công!")}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail addToCart={addToCart} handleBuyNow={handleBuyNow} />
          }
        />
      </Routes>
    </>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
