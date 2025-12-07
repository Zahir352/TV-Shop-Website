const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Allow JSON body & CORS
app.use(express.json());
app.use(cors());

/**
 * 1) Serve all static files from this folder
 *    This lets us open in browser:
 *      - /TV-shop.html
 *      - /cart.html
 *      - /payment.html
 *      - /product.html
 *      - /images/hero-tv.jpeg
 */
app.use(express.static(path.join(__dirname)));

// (Optional) explicit images route – safe to keep
app.use("/images", express.static(path.join(__dirname, "images")));

/**
 * 2) Default route -> TV-shop.html
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "TV-shop.html"));
});

/**
 * 3) Routes for Cart page
 *    Both /cart and /cart.html will work
 */
app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "cart.html"));
});

app.get("/cart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "cart.html"));
});

/**
 * 4) Routes for Payment page
 *    Both /payment and /payment.html will work
 */
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "payment.html"));
});

app.get("/payment.html", (req, res) => {
  res.sendFile(path.join(__dirname, "payment.html"));
});

/**
 * 5) Routes for Product detail page
 *    (if you are using product.html?id=1 etc.)
 */
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "product.html"));
});

app.get("/product.html", (req, res) => {
  res.sendFile(path.join(__dirname, "product.html"));
});

/**
 * 6) Example products API
 *    You can expand this or move it to a database later.
 */
const products = [
  {
    id: 1,
    name: 'Samsung 55" Crystal 4K UHD Smart TV',
    price: 54999,
    category: "4k smart",
  },
  {
    id: 2,
    name: 'LG 65" 4K OLED evo Smart TV',
    price: 129999,
    category: "4k smart oled",
  },
  // add more products here, matching your frontend IDs (3..8 etc.)
];

// GET -> list of products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET -> single product by id (for product details page)
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

/**
 * 7) POST -> fake checkout endpoint
 *    Expects: { customer: {...}, cart: { items, total, count } }
 */
app.post("/api/checkout", (req, res) => {
  const order = req.body;

  console.log("🧾 New checkout request received:");
  console.log("Customer:", order.customer);
  console.log("Cart:", order.cart);

  // In a real app you would:
  // 1) Validate data
  // 2) Save order to DB
  // 3) Start payment gateway session (Razorpay / Stripe etc.)

  res.json({
    success: true,
    message: "Order received on backend!",
    order,
  });
});

// 8) Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app; // optional, useful for testing later
