# 📝 Todo Application

A full-stack MERN (MongoDB, Express, React, Node.js) todo application with user authentication, deadline management, and task tracking capabilities.

## ✨ Features

### Current Features
- **User Authentication**
  - Secure signup and login with JWT tokens
  - Password hashing with bcrypt
  - Protected routes and API endpoints
  
- **Todo Management**
  - Create, read, update, and delete todos
  - Add titles, descriptions, and deadlines
  - Mark tasks as completed
  - User-specific todo lists

- **Responsive UI**
  - Clean and modern interface
  - Mobile-friendly design
  - Real-time updates

## 🚀 Upcoming Features

- **Session Management** - Enhanced session handling and token refresh
- **Advanced Dashboard Views**
  - Completed tasks section
  - Deadline missed tasks tracker
  - Upcoming tasks view
  - Task statistics and analytics
- **Smart Notifications**
  - Real-time alerts for tasks due today
  - Push notifications for uncompleted tasks
  - Deadline reminders
- **Enhanced Deadline System**
  - Date and time picker for precise deadlines
  - Recurring tasks support
  - Time zone support
- **OAuth Integration**
  - Google Sign-In support
  - Gmail integration for task reminders
- **UI/UX Improvements**
  - Dark mode support
  - Drag-and-drop task reordering
  - Task categories and labels
  - Advanced filtering and sorting
  - Improved animations and transitions

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Update the API base URL in `src/services/api.js` if needed.

Start the frontend development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
todo-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── CreateTodo.jsx
|   |   |   |__ ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Todos (Protected)
- `GET /api/todos` - Get all todos for logged-in user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Your Name
- GitHub: VyshnavReddyPinreddy (https://github.com/VyshnavReddyPinreddy)

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by modern task management applications

---

⭐ Star this repo if you find it helpful!
