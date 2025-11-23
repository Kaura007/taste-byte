# AI-Powered Recommendation Engine & Semantic Search

A full-stack application that utilizes Vector Embeddings and Cosine Similarity to provide intelligent food recommendations and semantic search capabilities.

This project integrates a **React** frontend, an **Express/Node.js** backend, and a **Python (FastAPI)** microservice that utilizes Hugging Face models (`jinaai-v2-embeddings`) to generate 768-dimensional vector embeddings for menu items and order history.

---

## 🚀 Features

* **Semantic Search:** Search for food items using natural language (e.g., "spicy dinner options") rather than exact keyword matching.
* **Smart Recommendations:** Suggests food items based on past order combinations and user preferences.
* **Hybrid Architecture:** Combines the speed of Node.js with the AI capabilities of Python.
* **Vector Database:** Uses MongoDB Atlas Vector Search (KNN algorithm) to filter embeddings.

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Express.js, Node.js
* **AI Microservice:** Python 3.10, FastAPI, Uvicorn, PyTorch, Transformers (Hugging Face)
* **Database:** MongoDB Atlas (with Vector Search)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher recommended)
* [Python](https://www.python.org/) (v3.10)
* [MongoDB Atlas Account](https://www.mongodb.com/atlas/database) (Required for Vector Search)

---

## ⚙️ Installation & Setup

Clone the repository to get started:

```bash
git clone [https://github.com/Its-keshav-arora/Recommendation_Engine.git](https://github.com/Its-keshav-arora/Recommendation_Engine.git)
cd Recommendation_Engine
```

### 1. Frontend Setup (React)

Navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```
*The frontend server will start at `http://localhost:8080` (or the port specified in your vite/webpack config).*

### 2. Backend Setup (Node/Express)

Navigate to the backend directory:

```bash
cd backend
npm install
```

**Environment Configuration:**
Create a `.env` file in the `backend` root directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Start the server:
```bash
node app.js
```
*The backend server will run at `http://localhost:5000`.*

### 3. AI Service Setup (Python)

Navigate to the python directory:

```bash
cd python_backend  # (Or whatever your python folder is named)
```

**Create and Activate Virtual Environment:**

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

**Install Dependencies:**

```bash
pip install torch transformers sentence-transformers fastapi uvicorn
```

**Run the AI Server:**

```bash
# First run to cache the model
python embeddings.py 

# Start the FastAPI Server
uvicorn embeddings:app --host 127.0.0.1 --port 8000
```

*The Python server will run at `http://127.0.0.1:8000`. It creates 768-dimensional embeddings using the `jinaai-v2-embeddings` model.*

---

## 💾 Database & Vector Search Configuration

This project uses **MongoDB Atlas Vector Search**. You must configure the search indexes for the semantic search to work.

### Step 1: Upload Data (Seeding)
Once all servers are running, trigger the seed route to upload initial data and generate embeddings.

* **Method:** `POST`
* **URL:** `http://localhost:5000/api/data/upload-menu`
* **Body:** (Empty)

This will push your menu data to MongoDB and automatically generate vector embeddings via the Python service.

### Step 2: Create Search Indexes
1.  Go to your **MongoDB Atlas Dashboard**.
2.  Navigate to **Atlas Search** (or "Search & Vector Search" in the sidebar).
3.  Click **Create Search Index**.

#### Index 1: Food Items
* **Index Name:** `vector_index`
* **Collection:** `food_items`
* **Configuration:** JSON Editor

Paste the following configuration:
```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "embedding": {
        "dimensions": 768,
        "similarity": "cosine",
        "type": "knnVector"
      }
    }
  }
}
```

#### Index 2: Order History
* **Index Name:** `order_vector_index`
* **Collection:** `orderEmbeddings`
* **Configuration:** JSON Editor

Paste the **same configuration** as above.

---

## 🔌 API Endpoints

### 🟢 Node Backend Routes

| Route | Method | Description |
| :--- | :--- | :--- |
| `/api/data/upload-menu` | POST | Uploads initial data and generates embeddings. |
| `/api/food/search` | GET/POST | **Semantic Search:** Finds food based on natural language queries. |
| `/api/food/recommend` | GET | **Recommendation:** Suggests items based on user history. |
| `/api/order/train` | POST | Trains the model on combo orders for better suggestions. |

### 🐍 Python Service Routes

| Route | Method | Description |
| :--- | :--- | :--- |
| `/embed` | POST | Returns a 768-dim vector for a given text string. |

**Testing Python Embeddings:**
You can test the Python service directly:
* **URL:** `http://127.0.0.1:8000/embed`
* **Body:** `{"text": "hello world"}`
* **Headers:** `Content-Type: application/json`

---

## 🧪 Usage Flow

1.  **Seed the Database:** Run the upload-menu endpoint first.
2.  **Place Orders:** Use the frontend to place dummy orders. This populates the `orderEmbeddings` collection.
3.  **Get Recommendations:** Add items to your cart. The system will use the `order_vector_index` to suggest relevant combos based on your session and past trends.
4.  **Search:** Use the search bar to type phrases like "healthy breakfast" or "spicy chicken" to see Semantic Search in action.

---

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.