# 💰 FinTrack - Personal Finance Manager

A full-stack web application for tracking expenses, EMIs, and subscriptions with beautiful visualizations and real-time analytics.

![FinTrack Dashboard](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4-green?style=for-the-badge&logo=springboot)

## 🌐 Live Demo

**[View Live App →](https://fintrack-pi-beige.vercel.app)**

Test it out! Register a new account to explore all features.

---

## ✨ Features

### 💵 Expense Tracking
- Add, edit, and delete expenses with ease
- Categorize by Food, Transport, Shopping, Bills, Entertainment, and more
- Filter expenses by custom date ranges
- Visual spending analytics with interactive charts

### 💳 EMI Management
- Track loan payments and installments
- Monitor remaining payments with progress indicators
- View detailed payment schedules
- Never miss an EMI payment

### 🔄 Subscription Tracking
- Manage monthly and yearly subscriptions
- Track renewal dates automatically
- Monitor recurring costs in one place
- Get overview of all active subscriptions

### 📊 Interactive Dashboard
- Real-time spending overview at a glance
- Beautiful charts and data visualizations
- Monthly spending summaries
- Category-wise expense breakdowns

### 🔐 Secure Authentication
- JWT-based authentication system
- Encrypted passwords using BCrypt
- Protected routes and API endpoints
- User-specific data isolation

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Context API** - State management

### Backend
- **Spring Boot 3.4** - Enterprise Java framework
- **Spring Security** - Authentication & authorization
- **JWT** - Stateless token-based auth
- **PostgreSQL** - Relational database
- **JPA/Hibernate** - Object-relational mapping
- **Maven** - Build automation

### Deployment & DevOps
- **Vercel** - Frontend hosting with auto-deployment
- **Railway** - Backend hosting & managed PostgreSQL
- **Docker** - Containerization for local development
- **GitHub Actions** - CI/CD pipeline

---

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Docker Desktop (for local database)
- Maven 3.8+

### Local Development Setup

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/RupiniNuthakki/fintrack.git
cd fintrack
```

#### 2️⃣ Start local database
```bash
docker-compose up -d
```

This starts PostgreSQL on `localhost:5432` and Redis on `localhost:6379`

#### 3️⃣ Run the backend
```bash
cd backend/fintrack-backend
mvn clean install
mvn spring-boot:run
```

Backend API runs on `http://localhost:8080`

#### 4️⃣ Run the frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

#### 5️⃣ Open your browser
Navigate to `http://localhost:5173` and start tracking your finances!

---

## 📸 Screenshots

*Coming soon! Screenshots will showcase the dashboard, expense tracking, EMI management, and subscription features.*

---

## 🏗️ Architecture
```
┌─────────────┐      HTTPS       ┌──────────────┐
│   Browser   │ ◄──────────────► │    Vercel    │
│  (React)    │                  │  (Frontend)  │
└─────────────┘                  └──────────────┘
                                        │
                                   REST API
                                        │
                                        ▼
                                 ┌──────────────┐
                                 │   Railway    │
                                 │  (Backend)   │
                                 └──────────────┘
                                        │
                                        ▼
                                 ┌──────────────┐
                                 │  PostgreSQL  │
                                 │  (Database)  │
                                 └──────────────┘
```

---

## 🎯 Key Learnings

Through building FinTrack, I gained hands-on experience with:

- **Full-stack Development**: Built complete application from database design to user interface
- **RESTful API Design**: Created scalable backend with proper HTTP methods and status codes
- **Authentication & Security**: Implemented JWT tokens and Spring Security for protected routes
- **Database Design**: Designed normalized schema with proper relationships and constraints
- **State Management**: Used React Context API for global authentication state
- **CORS Configuration**: Handled cross-origin requests between frontend and backend
- **Cloud Deployment**: Deployed frontend and backend to production using modern platforms
- **Responsive Design**: Built mobile-first UI that works seamlessly across devices

---

## 🔮 Future Enhancements

Planned features for upcoming releases:

- 📸 **AI-Powered Receipt Scanning** - Upload receipts and auto-extract expense details using OCR
- 🤖 **Virtual Chat Assistant** - Natural language queries like "How much did I spend on food?"
- 📊 **Advanced Analytics** - Spending trends, predictions, and budget recommendations
- 📧 **Email Notifications** - Reminders for EMI payments and subscription renewals
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📄 **Export Reports** - Download monthly statements as PDF or Excel
- 💰 **Budget Goals** - Set spending limits and track progress
- 🔄 **Recurring Expenses** - Automate monthly expense entries
- 📱 **Mobile App** - Native iOS and Android applications

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/RupiniNuthakki/fintrack/issues).

---

## 👨‍💻 Author

**Rupini Nuthakki**

- GitHub: [@RupiniNuthakki](https://github.com/RupiniNuthakki)
- Email: rupininuthakki@gmail.com
- LinkedIn: [Connect with me](https://www.linkedin.com/in/rupini-n-9a205417b/)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ using React and Spring Boot
- Deployed on Vercel and Railway
- UI inspiration from modern fintech applications
- Special thanks to the open-source community

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

**[Live Demo](https://fintrack-pi-beige.vercel.app)** • **[Report Bug](https://github.com/RupiniNuthakki/fintrack/issues)** • **[Request Feature](https://github.com/RupiniNuthakki/fintrack/issues)**

</div>