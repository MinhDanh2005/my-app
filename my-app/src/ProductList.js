function ProductList({ addToCart, cartCount, handleBuyNow }) {
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
