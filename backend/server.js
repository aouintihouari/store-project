import express from "express";
import path from "path";
import { config } from "dotenv";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./config/db.js";

config();
const app = express();
app.use(express.json());

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}
const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
