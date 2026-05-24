import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [activePage, setActivePage] = useState("home");

  const [darkMode, setDarkMode] = useState(false);

  const [cart, setCart] = useState([]);

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Smart Watch",
      price: 120,
      category: "Electronics",
      stock: "In Stock",
      rating: "4.8",
      description:
        "Modern smart watch with fitness tracking and stylish design.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },

    {
      id: 2,
      name: "Nike Air Max",
      price: 200,
      category: "Shoes",
      stock: "In Stock",
      rating: "4.9",
      description: "Comfortable and stylish sports shoes for daily use.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },

    {
      id: 3,
      name: "Gaming Headphones",
      price: 90,
      category: "Accessories",
      stock: "Limited",
      rating: "4.7",
      description: "High quality sound headphones for gaming and music.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },

    {
      id: 4,
      name: "Laptop Backpack",
      price: 60,
      category: "Bags",
      stock: "In Stock",
      rating: "4.6",
      description: "Premium backpack with modern and durable design.",
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
    },
  ];

  const theme = {
    background: darkMode ? "#111827" : "#F3F4F6",
    card: darkMode ? "#1F2937" : "#FFFFFF",
    text: darkMode ? "white" : "black",
  };

  const handleLogin = () => {
    if (email.includes("@") && password.length >= 6) {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);

    setEmail("");

    setPassword("");
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    setOrders([...orders, ...cart]);

    setCart([]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!loggedIn) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <h1 style={styles.loginHeading}>E-Commerce Login</h1>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button style={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: theme.background,
        minHeight: "100vh",
        color: theme.text,
      }}
    >
      {/* NAVBAR */}

      <div
        style={{
          background: darkMode ? "#000" : "#111827",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <h2>E-Commerce Store</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={styles.navButton}
            onClick={() => setActivePage("home")}
          >
            🏠 Home
          </button>

          <button
            style={styles.navButton}
            onClick={() => setActivePage("products")}
          >
            🛍 Products
          </button>

          <button
            style={styles.navButton}
            onClick={() => setActivePage("cart")}
          >
            🛒 Cart ({cart.length})
          </button>

          <button
            style={styles.navButton}
            onClick={() => setActivePage("orders")}
          >
            📦 Orders
          </button>

          <button
            style={styles.navButton}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* HOME */}

      {activePage === "home" && (
        <div style={{ padding: "30px" }}>
          <div
            style={{
              ...styles.heroSection,
              background: theme.card,
              color: theme.text,
            }}
          >
            <div>
              <h1>Modern Shopping Experience</h1>

              <p>
                Discover premium products with modern usability and responsive
                design.
              </p>

              <button
                style={styles.shopButton}
                onClick={() => setActivePage("products")}
              >
                Shop Now
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="watch"
              style={styles.heroImage}
            />
          </div>
        </div>
      )}

      {/* PRODUCTS */}

      {activePage === "products" && (
        <div style={{ padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Products</h1>

          <div style={{ textAlign: "center" }}>
            <input
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.search}
            />
          </div>

          <div style={styles.grid}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  ...styles.card,
                  background: theme.card,
                  color: theme.text,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.image}
                />

                <h2>{product.name}</h2>

                <p>{product.category}</p>

                <p>⭐ {product.rating}</p>

                <h3>${product.price}</h3>

                <div style={styles.buttonRow}>
                  <button
                    style={styles.detailsButton}
                    onClick={() => setSelectedProduct(product)}
                  >
                    Details
                  </button>

                  <button
                    style={styles.cartButton}
                    onClick={() => addToCart(product)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PRODUCT DETAILS */}

          {selectedProduct && (
            <div
              style={{
                ...styles.detailsBox,
                background: theme.card,
                color: theme.text,
              }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={styles.detailsImage}
              />

              <div>
                <h1>{selectedProduct.name}</h1>

                <p>{selectedProduct.description}</p>

                <p>Category: {selectedProduct.category}</p>

                <p>Rating: ⭐ {selectedProduct.rating}</p>

                <p>Status: {selectedProduct.stock}</p>

                <h2>${selectedProduct.price}</h2>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CART */}

      {activePage === "cart" && (
        <div style={{ padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Shopping Cart</h1>

          {cart.length === 0 ? (
            <p style={{ textAlign: "center" }}>Cart is Empty</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.cartCard,
                  background: theme.card,
                  color: theme.text,
                }}
              >
                <div>
                  <h3>{item.name}</h3>

                  <p>${item.price}</p>
                </div>

                <button
                  style={styles.removeButton}
                  onClick={() => {
                    const updated = [...cart];

                    updated.splice(index, 1);

                    setCart(updated);
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div
              style={{
                ...styles.checkoutBox,
                background: theme.card,
                color: theme.text,
              }}
            >
              <h2>Checkout</h2>

              <input type="text" placeholder="Full Name" style={styles.input} />

              <input
                type="text"
                placeholder="Phone Number"
                style={styles.input}
              />

              <input type="text" placeholder="Address" style={styles.input} />

              <select style={styles.input}>
                <option>Pakistan</option>
                <option>India</option>
                <option>UAE</option>
                <option>USA</option>
                <option>UK</option>
              </select>

              <button style={styles.orderButton} onClick={placeOrder}>
                Place Order
              </button>
            </div>
          )}
        </div>
      )}

      {/* ORDERS */}

      {activePage === "orders" && (
        <div style={{ padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Orders</h1>

          {orders.length === 0 ? (
            <p style={{ textAlign: "center" }}>No Orders Yet</p>
          ) : (
            orders.map((order, index) => (
              <div
                key={index}
                style={{
                  ...styles.orderCard,
                  background: theme.card,
                  color: theme.text,
                }}
              >
                <h2>{order.name}</h2>

                <p>${order.price}</p>

                <p>Status: Confirmed ✅</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  loginPage: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#E5E7EB",
  },

  loginCard: {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },

  loginHeading: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid gray",
  },

  loginButton: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    border: "none",
    borderRadius: "8px",
    background: "#2563EB",
    color: "white",
    cursor: "pointer",
  },

  navButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#374151",
    color: "white",
    cursor: "pointer",
  },

  logoutButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "red",
    color: "white",
    cursor: "pointer",
  },

  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px",
    borderRadius: "20px",
    flexWrap: "wrap",
    gap: "20px",
  },

  heroImage: {
    width: "350px",
    borderRadius: "20px",
  },

  shopButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#2563EB",
    color: "white",
    cursor: "pointer",
    marginTop: "15px",
  },

  search: {
    width: "300px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid gray",
    marginTop: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  detailsButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#6366F1",
    color: "white",
    cursor: "pointer",
  },

  cartButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#10B981",
    color: "white",
    cursor: "pointer",
  },

  detailsBox: {
    marginTop: "40px",
    padding: "25px",
    borderRadius: "20px",
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  detailsImage: {
    width: "300px",
    borderRadius: "15px",
  },

  cartCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    margin: "15px auto",
    width: "80%",
    borderRadius: "10px",
  },

  removeButton: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    background: "red",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
  },

  checkoutBox: {
    width: "80%",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "15px",
  },

  orderButton: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    border: "none",
    borderRadius: "8px",
    background: "#2563EB",
    color: "white",
    cursor: "pointer",
  },

  orderCard: {
    width: "80%",
    margin: "15px auto",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default App;
