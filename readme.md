 # User API Documentation

## Register User
Register a new user in the system.

### Endpoint
```http
POST /api/user/register
```

### Request Body
```json
{
    "fullname": {
        "firstName": "string", 
        "lastName": "string"   
    },
    "email": "string",        
    "password": "string",    
    "phoneNo": "string"      
}
```

### Response

#### Success Response (200 OK)
```json
{
    "user": {
        // user object with details
    },
    "token": "string",        // JWT token
    "userId": "string"        // MongoDB ObjectId
}
```

#### Error Responses

##### 400 Bad Request
When user already exists:
```json
{
    "message": "User already exist with this email"
}
```

When validation fails:
```json
{
    "message": "specific validation error message"
}
```

### Validation Rules
- firstName: 3-15 characters
- lastName: 3-15 characters
- email: Must be valid email format
- password: Minimum 8 characters
- phoneNo: Exactly 10 characters

### Authentication
No authentication required for this endpoint.

### Example Request
```bash
curl -X POST http://localhost:3000/api/user/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNo": "1234567890"
}'
``` 


## Login User
Authenticate an existing user and get access token.

### Endpoint
```http
POST /api/user/login
```

### Request Body
```json
{
    "email": "string",    // valid email format
    "password": "string"  // minimum 8 characters
}
```

### Response

#### Success Response (200 OK)
```json
{
    "user": {
        // user object with details
    },
    "token": "string",        // JWT token
    "userId": "string"        // MongoDB ObjectId
}
```

#### Error Responses

##### 400 Bad Request
When credentials are invalid:
```json
{
    "message": "Invalid credentials"
}
```

When password is incorrect:
```json
{
    "message": "Invalid email or password"
}
```

When validation fails:
```json
{
    "message": "specific validation error message"
}
```

### Validation Rules
- email: Must be valid email format
- password: Minimum 8 characters

### Authentication
No authentication required for this endpoint.

### Example Request
```bash
curl -X POST http://localhost:3000/api/user/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john.doe@example.com",
    "password": "password123"
}'
```



## Get User Profile
Get authenticated user's profile information.

### Endpoint
```http
GET /api/user/getProfile
```

### Headers
```
Authorization: Bearer <jwt_token>
```

### Response

#### Success Response (200 OK)
```json
{
    "user": {
        "fullname": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "phoneNo": "string",
        "_id": "string"
    }
}
```

#### Error Responses

##### 400 Bad Request
When token is missing:
```json
{
    "message": "Unauthorized"
}
```

When token is blacklisted:
```json
{
    "message": "Unauthorized User"
}
```

### Authentication
- Required
- Valid JWT token must be provided in Authorization header
- Token must not be blacklisted

### Example Request
```bash
curl -X GET http://localhost:3000/api/user \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
 


## Logout User
Invalidate the current user's token by blacklisting it.

### Endpoint
```http
GET /api/user/logout
```

### Headers
```
Authorization: Bearer <jwt_token>
```

### Response

#### Success Response (200 OK)
```json
{
    "message": "LoggedOut successfully!!"
}
```

#### Error Responses

##### 400 Bad Request
When token is missing:
```json
{
    "message": "Unauthorized"
}
```

When using already blacklisted token:
```json
{
    "message": "Unauthorized User"
}
```

### Authentication
- Required
- Valid JWT token must be provided in Authorization header
- Token must not be already blacklisted

### Notes
- The token will be added to a blacklist
- Blacklisted tokens expire after 24 hours
- Future requests with the blacklisted token will be rejected

### Example Request
```bash
curl -X GET http://localhost:3000/api/user/logout \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```