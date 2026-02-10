import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css";

import oldPaper from "../assets/old-paper-texture.png";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];
    if (search) {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") {
      updated = updated.filter((p) => p.category === category);
    }
    setFilteredProducts(updated);
  }, [search, category, products]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const handleBuyNow = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <div
        className="hero-section text-center text-white"
        style={{
          backgroundImage: `url(${oldPaper})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <h1 className="display-4 fw-bold">VINTAGE TREASURES</h1>
        <p className="sub-heading">
          Relive the past, own the classics, and cherish timeless finds.
        </p>

        <div className="d-flex justify-content-center mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control w-50"
          />
        </div>
      </div>

      <div className="category-bar">
        <label className="me-2 fw-bold">Category by:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select w-auto"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="products-bg">
        <div className="container">
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card product-card h-100 shadow-sm">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="card-img-top product-img"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted small">
                      {product.description}
                    </p>
                    <p className="fw-bold text-danger">₹{product.price}</p>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => handleBuyNow(product)}
                    >
                      Grab It 
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center text-muted py-5">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
