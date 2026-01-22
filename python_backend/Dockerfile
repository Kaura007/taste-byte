FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port (Hugging Face Spaces expects 7860)
EXPOSE 7860

# Run the application
CMD ["uvicorn", "embeddings:app", "--host", "0.0.0.0", "--port", "7860"]
