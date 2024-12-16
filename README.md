# **Book Shop B4A2V1**

`Book Shop` is a simple server-application created using **express.js**, featuring CRUD operations for products(books) and ordering .

### **Features**
- **CRUD Operations for Books**: Create, read, update, and delete books.
- **Order Management**: Create orders for books, and calculate total revenue.
- **Database Integration**: Integrated MongoDB as the database

### **Prerequisites**
1. **Node.js** (v20.x or later)
2. **npm** or **yarn (recommended and tested)**
3. **MongoDB** (Compass or Atlas instance)

## **Installation and Setup**
Follow these steps to setup the project locally,

1. **Clone the repository**
```
git clone https://github.com/Uzzal-Bhowmik/l2-assignment-2-book-store.git

cd l2-assignment-2-book-store
```
2. **Install Dependencies**
```
npm install
```
3. **Setup `.env` file**
```
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.4d6tm.mongodb.net/assignment-2-book-store?retryWrites=true&
w=majority&appName=Cluster0
PORT=5000
```
4. **Run the server**
```yarn start:dev``` or ```npm run start:dev```

The application will run on `http://localhost:5000` by default.


## **API Endpoints**

### **Book Routes**

- GET  `/api/products`: Fetch all books.

- POST `/api/products`: Create a new book.

- GET `/api/products/:id:` Fetch a specific book by ID.

- PATCH `/api/products/:id`: Update a book by ID.

- DELETE `/api/products/:id`: Delete a book by ID.

### **Order Routes**

- POST `/api/orders`: Create a new order.

- GET `/api/orders/revenue`: Calculate total revenue from all orders.

### **Contact**

For any questions or support, please contact:

- Name: Uzzal Bhowmik

- Email: **uzzalbhowmik21@gmail.com**

- GitHub: https://github.com/Uzzal-Bhowmik
