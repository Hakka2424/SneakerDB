# 👟 **SneakerDB - Web Application for Sneaker Collection**

## 🌐 **Live App:**  
Once deployed, access at **https://thetzel.cs382.net**  
*(Reachable on campus or via NMSU VPN)*

Welcome to **SneakerDB**, a simple CRUD web app for managing your sneaker collection. Built with **Node.js**, **Express**, **EJS**, and **MongoDB** (via Mongoose), it lets you add, view, and search sneakers.

---

## ✨ **Features**
- ✅ **Add Sneakers** via an HTML form (`/form`)  
- ✅ **View Collection** on a dedicated page (`/collection`)  
- ✅ **AJAX Search** by max price (`/query`)  
- ✅ **REST API** endpoint returning JSON (`/sneakers?maxPrice=<n>`)  
- ✅ **Bootstrap UI** for responsive, clean design  
- ✅ **Containerized** with Podman/Docker‑Compose

---

## 🔧 **How to Use**

### 1. Add a Sneaker  
- Go to **/form**  
- Fill in **Name**, **Size**, **Price**, **Release Date**  
- Click **Submit**  

### 2. View Collection  
- Visit **/collection** to see all sneakers  

### 3. Search Sneakers  
- Open **/query**  
- Enter a **Max Price** and click **Search**  
- Results load dynamically  

### 4. REST API  
- **GET** `/sneakers` returns all sneakers in JSON  
- **GET** `/sneakers?maxPrice=200` filters by price ≤ 200  

```bash
curl "http://localhost:3000/sneakers?maxPrice=200"
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** v16+  
- **Git**  
- **Podman** (or Docker) & **podman‑compose** (or docker‑compose)  
- **MongoDB** (optional locally; will run in container by default)

---

### Local Development (without containers)
1. **Clone the repo**  
   ```bash
   git clone https://github.com/Hakka2424/SneakerDB.git
   cd SneakerDB
   ```
2. **Local Development (without containers)**
   1. **Clone the repo**
      ```bash
      git clone https://github.com/Hakka2424/SneakerDB.git
      cd SneakerDB
      ```
   2. **Install dependencies**
      ```bash
      npm install
      ```
   3. **Run the app**
      ```bash
      node index.js
      ```
   4. **Open in browser**
      - Add a sneaker:  `http://localhost:3000/form`  
      - View collection: `http://localhost:3000/collection`  
      - AJAX query:      `http://localhost:3000/query`  

3. **Containerized Deployment (Podman/Docker)**
   1. **Build & start containers**
      ```bash
      podman-compose up -d --build
      ```
   2. **Verify**
      ```bash
      podman ps
      podman-compose logs -f app
      ```
   3. **Access the app**
      - Locally:  `http://127.0.0.1:15880`  
      - Deployed: `https://thetzel.cs382.net`  

4. **Stopping & Cleanup**
   1. **Stop and remove containers**  
      ```bash
      podman-compose down
      ```
   2. **(Optional) Remove volumes**  
      ```bash
      podman-compose down -v
      ```
   3. **Restart the stack** (after code changes or cleanup)  
      ```bash
      podman-compose up -d --build
      ```
5. **Access the App**
   - **Locally:**  
     `http://127.0.0.1:15880`
   - **Deployed:**  
     `https://thetzel.cs382.net`
  
---

## 🏆 Credits & Acknowledgments
- **Developer:** Tyreke Hetzel  
- **Project:** SneakerDB – A Web Application for Managing a Sneaker Collection  
- **Course:** CS382/512 – Modern Web Technologies  
- **Instructor:** Bill Hamilton  
- **Year:** 2025  
- **License:** MIT License  
