from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

app = FastAPI()

print("Loading Jina Embedding Model...")
model = SentenceTransformer(
    "jinaai/jina-embeddings-v2-base-en",
    trust_remote_code=True
)

# This line is used to avoid the RAM crash for PC with RAM < 16GB
model.max_seq_length = 1024

print("Model loaded successfully!")

class RequestText(BaseModel):
    text: str

@app.post("/embed")
async def embed_text(data: RequestText):
    embedding = model.encode(
        data.text,
        normalize_embeddings=True
    )
    return {"embedding": embedding.tolist()}
