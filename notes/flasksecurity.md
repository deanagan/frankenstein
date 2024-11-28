Here’s a **complete guide** where the `/generate-token` endpoint now requires both a `client_id` and `client_secret` for token generation. This assumes that the `client_id` and `client_secret` are predefined for API clients and stored securely.

---

## Guide for Token-Based Authentication in a Pure Web API in Flask

### Overview
1. Use a **single secret key** for signing both access and refresh tokens.
2. Validate `client_id` and `client_secret` before issuing tokens.
3. Implement endpoints for token validation, token refreshing, and access control.
4. Store environment variables securely and Dockerize the application.

---

### 1. **Generate a Secure Secret Key**

#### Using Python:
```python
import secrets
print(secrets.token_urlsafe(32))
```

Use the generated key for `JWT_SECRET_KEY` in the `.env` file.

---

### 2. **Set Up the `.env` File**

Create a `.env` file in the root directory and include the secret key and the API client credentials:

#### `.env`
```env
JWT_SECRET_KEY=KzOXe7PvR7X-v4ChD0E3fnbXQmTx_A7t_M3l7Nk5Z9o
API_CLIENT_ID=your-client-id
API_CLIENT_SECRET=your-client-secret
```

Add `.env` to `.gitignore` to prevent committing it:

#### `.gitignore`
```gitignore
.env
```

---

### 3. **Configure Flask to Use Environment Variables**

Install `python-dotenv`:
```bash
pip install python-dotenv
```

Load environment variables in a `config.py` file:

#### `config.py`
```python
from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()

class Config:
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")  # Key for signing tokens
    API_CLIENT_ID = os.getenv("API_CLIENT_ID")  # Predefined client ID
    API_CLIENT_SECRET = os.getenv("API_CLIENT_SECRET")  # Predefined client secret
    JWT_ACCESS_TOKEN_EXPIRES = 300  # Access token expiration (5 minutes)
    JWT_REFRESH_TOKEN_EXPIRES = 86400  # Refresh token expiration (1 day)
```

---

### 4. **Set Up Flask App and JWT**

Install Flask and Flask-JWT-Extended:
```bash
pip install Flask flask-jwt-extended
```

Initialize the Flask app with JWT:

#### `app.py`
```python
from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Initialize JWT Manager
jwt = JWTManager(app)
```

---

### 5. **Add Token-Based Authentication Endpoints**

#### a. **Generate Tokens for API Clients**

The `/generate-token` endpoint validates the `client_id` and `client_secret` from the request before issuing tokens.

```python
@app.route("/generate-token", methods=["POST"])
def generate_token():
    data = request.json

    # Validate client_id and client_secret
    if not data or data.get("client_id") != Config.API_CLIENT_ID or data.get("client_secret") != Config.API_CLIENT_SECRET:
        return jsonify({"msg": "Invalid client credentials"}), 401

    # Generate tokens
    access_token = create_access_token(identity=data["client_id"])
    refresh_token = create_refresh_token(identity=data["client_id"])

    return jsonify({"access_token": access_token, "refresh_token": refresh_token})
```

---

#### b. **Protected Endpoint**

This endpoint requires a valid access token for accessing protected resources.

```python
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"msg": f"Access granted for client {current_user}"})
```

---

#### c. **Refresh Token Endpoint**

This endpoint generates a new access token using a valid refresh token.

```python
@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": new_access_token})
```

---

### 6. **Dockerize the Flask Application**

#### Dockerfile
Create a `Dockerfile` to containerize the application:

```dockerfile
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy application code and .env file
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Expose Flask port
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
```

---

#### docker-compose.yml
Create a `docker-compose.yml` file to handle environment variables and networking:

```yaml
version: '3.8'

services:
  flask-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    env_file:
      - .env
```

---

### 7. **How the API Works**

#### a. Token Issuance

To get access and refresh tokens, make a POST request to `/generate-token` with `client_id` and `client_secret`:

**Request:**
```json
POST /generate-token
{
  "client_id": "your-client-id",
  "client_secret": "your-client-secret"
}
```

**Response:**
```json
{
  "access_token": "JWT_ACCESS_TOKEN",
  "refresh_token": "JWT_REFRESH_TOKEN"
}
```

---

#### b. Access Protected Resource

Include the access token in the `Authorization` header to access protected endpoints:

**Request:**
```json
GET /protected
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

**Response:**
```json
{
  "msg": "Access granted for client your-client-id"
}
```

---

#### c. Refresh Token

Use the refresh token to get a new access token:

**Request:**
```json
POST /refresh
Authorization: Bearer <JWT_REFRESH_TOKEN>
```

**Response:**
```json
{
  "access_token": "NEW_JWT_ACCESS_TOKEN"
}
```

---

### 8. **Build and Run the Dockerized Application**

#### Step 1: Build the Docker Image
```bash
docker build -t flask-api .
```

#### Step 2: Run the Docker Container
```bash
docker run --env-file .env -p 5000:5000 flask-api
```

#### Step 3: Or Use Docker Compose
```bash
docker-compose up
```

---

### 9. **Best Practices**

1. **Secure Secrets**:
   - Use secret managers like AWS Secrets Manager or Azure Key Vault in production.
   - Never include `.env` in production Docker images.

2. **Token Expiration**:
   - Set appropriate expiration times for access and refresh tokens.

3. **Rate Limiting**:
   - Implement rate limiting to prevent abuse of token generation and refresh endpoints.

4. **Use HTTPS**:
   - Always deploy with HTTPS to secure communication between clients and the API.

---

This guide ensures the API requires both `client_id` and `client_secret` for issuing tokens, while maintaining secure practices for token handling and deployment. 
