FROM python:3.9

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Start flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]