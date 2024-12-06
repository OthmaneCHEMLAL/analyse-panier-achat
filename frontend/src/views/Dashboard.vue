<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Welcome to the Dashboard</h1>
      <p>Your central hub for analytics and insights.</p>
    </header>

    <main class="dashboard-content">
     
      <section class="section trending-products">
        <header>
          <h2>Trending Products</h2>
          <button @click="getTrendingProducts">Load Trending Products</button>
        </header>

        <div class="table-container">
          <table v-if="trendingProducts.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Total Quantity</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in trendingProducts" :key="product._id">
                <td>{{ product.name }}</td>
                <td>{{ product.totalQuantity }}</td>
                <td>{{ product.totalSales.toFixed(2) }} DH</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No trending products loaded yet.</p>
        </div>
      </section>

     
      <section class="section all-products">
        <header>
          <h2>All Products</h2>
          <button @click="getProducts">Load Products</button>
        </header>

        <div class="table-container">
          <table v-if="products.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Total Sales</th>
                <th>Total Quantity Sold</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td>{{ product.product_name }}</td>
                <td>{{ product.total_sales.toFixed(2) }} DH</td>
                <td>{{ product.total_quantity_sold }}</td>
                <td>{{ product.price.toFixed(2) }} DH</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No products available.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../config";

export default {
  name: "DashboardView",
  data() {
    return {
      trendingProducts: [],
      products: [],
    };
  },
  methods: {
    async getTrendingProducts() {
      try {
        const response = await axios.get(API_BASE_URL + "/analytics/trending_products");
        this.trendingProducts = response.data.trendingProducts;
      } catch (error) {
        console.error("Error fetching trending products:", error);
        alert("Failed to fetch trending products. Check the console for details.");
      }
    },
    async getProducts() {
      try {
        const response = await axios.get(API_BASE_URL + "/analytics/products");
        this.products = response.data.products;
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Check the console for details.");
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  font-family: "Arial", sans-serif;
  color: #333;
  padding: 20px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.section header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section h2 {
  margin: 0;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.data-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.data-table tr:hover {
  background-color: #f1f1f1;
}

p {
  margin: 0;
  font-style: italic;
  color: #777;
}
</style>
