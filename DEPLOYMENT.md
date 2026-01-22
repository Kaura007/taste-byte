# Deployment Guide for AI Recommendation System

This guide outlines the steps to deploy the three components of your application:
1. **Frontend** (React + Vite) -> **Vercel**
2. **Node.js Backend** (Express) -> **Vercel** (or Render)
3. **Python Microservice** (FastAPI) -> **Hugging Face Spaces** (Recommended for free GPU/CPU) or **Render**

---

## Prerequisities

1. **GitHub Account**: Push your code to a GitHub repository.
2. **Vercel Account**: For frontend and Node backend.
3. **Hugging Face Account**: For the Python AI microservice.
4. **MongoDB Atlas Account**: For the database.

---

## Part 1: Database Setup (MongoDB Atlas)

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (Free Tier).
3. Create a database user (username/password).
4. In **Network Access**, allow access from anywhere (`0.0.0.0/0`).
5. Get your connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/...`).
   - *Save this for Part 2.*

---

## Part 2: Deploying the Python Microservice

Since this service uses `sentence-transformers` and requires some RAM/CPU, **Hugging Face Spaces** is a great free option.

1. **Create a Space**:
   - Go to [Hugging Face Spaces](https://huggingface.co/spaces).
   - Click **Create new Space**.
   - Name: `ai-food-embeddings`.
   - SDK: **Docker**.
   - Template: **Blank**.

2. **Upload Code**:
   - You can push your `python_backend` folder contents to this Space's repo.
   - **Crucial Files**: Ensure `Dockerfile`, `requirements.txt`, and `embeddings.py` are in the root of the Space's repo.
   - *Note: If using this monorepo, you might need to use a subdirectory deployment or just manually upload the files from `python_backend` to the Space.*

3. **Get the URL**:
   - Once built, your API will be running at `https://<your-username>-ai-food-embeddings.hf.space`.
   - *Save this URL for Part 3.*

---

## Part 3: Deploying the Node.js Backend (Vercel)

1. **Push to GitHub**: Ensure your project is pushed to GitHub.
2. **Import Project in Vercel**:
   - Go to Vercel Dashboard -> Add New -> Project.
   - Select your repository.
   - **Root Directory**: Select `backend`. (Click Edit next to Root Directory).

3. **Configure Environment Variables**:
   Add the following variables in the Vercel definition:
   - `MONGO_URI`: Your MongoDB connection string from Part 1.
   - `PYTHON_API_URL`: The URL of your Python Microservice from Part 2 (e.g., `https://...hf.space/embed`).
   - `PORT`: `5000` (optional, Vercel handles this).

4. **Deploy**: Click Deploy.
5. **Get the URL**:
   - Once deployed, copy the domain (e.g., `https://your-backend.vercel.app`).

---

## Part 4: Deploying the Frontend (Vercel)

1. **Import Project in Vercel**:
   - Go to Vercel Dashboard -> Add New -> Project.
   - Select your repository.
   - **Project Name**: Give it a different name (e.g., `food-ordering-frontend`).
   - **Root Directory**: Select `frontend`.

2. **Configure Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed Node.js backend from Part 3 (e.g., `https://your-backend.vercel.app`).
   - *Note: No trailing slash at the end.*

3. **Deploy**: Click Deploy.

---

## Summary of Connections

- **Frontend** talks to **Node Backend** via `VITE_API_URL`.
- **Node Backend** talks to **MongoDB** via `MONGO_URI`.
- **Node Backend** talks to **Python Service** via `PYTHON_API_URL`.

## Troubleshooting

- **CORS Issues**: If the frontend cannot call the backend, ensure your backend's `cors` configuration allows the frontend domain.
  - In `backend/app.js`, you might need to update:
    ```javascript
    app.use(cors({
      origin: ["https://your-frontend.vercel.app"]
    }));
    ```
- **Cold Starts**: On free tiers (Render/Vercel/HF), services might "sleep". The first request might take 30-60 seconds.
