function ProductDetail({ productId }) {
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div className="product-detail">
      <header>
        <Link to="/" style={{ margin: "10px", textDecoration: "none" }}>
          Quay lại
        </Link>
      </header>
      <main>
        <div className="product-detail-info">
          <img src={product.image} alt={product.name} />
          <div className="product-detail-text">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Giá: {product.price.toLocaleString()} VNĐ</p>
            <button onClick={() => alert("Thêm vào giỏ hàng")}>
              Thêm vào giỏ hàng
            </button>
            <button onClick={() => alert("Mua ngay")}>Mua ngay</button>
          </div>
        </div>
      </main>
    </div>
  );
}
