# Amazon Clone Backend – Spring Boot

This project is an **Amazon-like e-commerce backend** application developed using **Spring Boot**. It provides core functionalities for user management, product catalog, cart, and order processing, serving as the backend for a full-featured Amazon clone.

## Features

- **User Authentication & Registration**
  - Secure user registration and login
  - Password encryption using BCrypt
  - Role-based access control with Spring Security

- **Product Management**
  - CRUD operations for products
  - Product catalog retrieval

- **Order Management**
  - Add products to cart and place orders
  - View order history and order details

- **RESTful API Endpoints**
  - Well-structured API for frontend integration
  - JSON-based communication

- **Frontend Integration**
  - Ready to connect with frontend via AJAX/JavaScript
  - Supports real-time updates for cart and product search

## Technologies Used

- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA
- **Database:** (JPA-ready; configure your own database)
- **Frontend:** JavaScript (AJAX), HTML, CSS (for integration/demo)
- **Build:** Maven/Gradle

## Project Structure

```
src/
  main/
    java/com/loginandregistration/
      ControllerClass.java      // API request handling
      ServiceClass.java         // Business logic and user details service
      RepositoryClass.java      // JPA repositories for users, products, orders
    resources/
      static/                   // JavaScript for frontend interaction
      templates/                // HTML templates for demo/preview
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone https://github.com/saiteja70136/amazonclone-backend-springboot.git
   ```

2. **Configure Database:**
   - Update `application.properties` with your database details.

3. **Build and Run:**
   ```
   ./mvnw spring-boot:run
   ```
   or use your IDE to launch `LoginAndRegistrationApplication`.

4. **Access Endpoints:**
   - User Registration: `/registeruserform`
   - Login: `/loginpage`
   - Dashboard: `/dashbordpage`
   - API examples: `/getstoredproductinfo`, `/storedataintodb`, etc.

## API Endpoints Overview

- `POST /storedataintodb` – Register a new user
- `GET /getuserdata` – Retrieve current user data
- `POST /storeproductinfo` – Add new products (admin)
- `GET /getstoredproductinfo` – List all products
- `POST /storeproductintodb` – Place an order
- `GET /getorderedproducts/{id}` – Get orders for a user

## Security

- Implements user authentication and authorization with Spring Security
- Secures endpoints and encrypts passwords with BCrypt

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

---

**Author:** [saiteja70136](https://github.com/saiteja70136)
