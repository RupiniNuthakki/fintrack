# 💰 FinTrack - Your Personal Finance Companion

> Track your daily expenses, manage EMIs, and never miss a subscription payment - all in one beautiful dashboard.

 🐛 **[Report Bug](https://github.com/RupiniNuthakki/fintrack/issues)**

---

## ✨ What is FinTrack?

FinTrack is a simple, intuitive web app that helps you take control of your finances. Whether you're tracking your daily coffee runs, managing loan payments, or keeping tabs on your Netflix subscription, FinTrack makes it effortless.

**Built for everyday people who want to:**
- Know where their money goes
- Never miss an EMI payment
- Track all subscriptions in one place
- See their spending patterns at a glance

---

## 🎯 Key Features

### 📊 **Smart Dashboard**
Get a complete snapshot of your finances the moment you log in:
- Total spending and monthly breakdown
- Visual charts showing spending by category
- Upcoming payments and due dates
- Recent transactions at a glance

### 💵 **Expense Tracking**
Log your daily expenses in seconds:
- Quick add with amount, category, and date
- Organize by categories (Food, Shopping, Transport, etc.)
- Filter expenses by date range
- Edit or delete anytime

### 💳 **EMI Manager**
Never miss a loan payment:
- Track multiple EMIs (car loans, home loans, personal loans)
- See progress bars showing how much you've paid
- Know your next due date
- Calculate remaining months automatically

### 🔄 **Subscription Tracker**
Stop forgetting about recurring charges:
- Add monthly or yearly subscriptions
- Auto-calculate true monthly cost
- Set billing reminders
- See total monthly obligations

---

## 🚀 Quick Start

### For Users (Just Want to Use It)

**Option 1: Use the Live App** ⭐ (Recommended)
1. Visit: **[fintrack.yourapp.com](#)** (coming soon!)
2. Click "Register" and create your account
3. Start tracking your finances!

**Option 2: Run Locally**
```bash
# Prerequisites: Install Java, Node.js, and Docker

# 1. Clone the project
git clone https://github.com/RupiniNuthakki/fintrack.git
cd fintrack

# 2. Start the database
docker-compose up -d

# 3. Start backend (in one terminal)
cd backend/fintrack-backend
./mvnw spring-boot:run

# 4. Start frontend (in another terminal)
cd frontend
npm install
npm run dev

# 5. Open http://localhost:5173 in your browser
```

---

## 📱 How to Use FinTrack

### **First Time Setup**
1. **Register:** Create your account with email and password
2. **Login:** You'll be taken to your dashboard
3. **Start Adding Data:** Click any "Add" button to begin

### **Daily Usage**

#### Track an Expense
1. Click "Expenses" in navigation
2. Click "Add Expense" button
3. Enter: Amount ($50), Category (Food), Description (Lunch)
4. Pick the date → Save!

#### Add an EMI
1. Go to "EMIs" page
2. Click "Add EMI"
3. Enter: Name (Car Loan), Total ($20,000), Monthly ($500), Duration (48 months)
4. Set next due date → Save!
5. Watch the progress bar as you pay it off!

#### Manage Subscriptions
1. Go to "Subscriptions"
2. Click "Add Subscription"
3. Enter: Name (Netflix), Amount ($15.99), Billing (Monthly)
4. Set next billing date → Save!
5. See your total monthly subscription cost at the bottom

#### View Your Dashboard
- Click "Dashboard" anytime to see:
    - How much you've spent this month
    - Your spending by category (pie chart)
    - Upcoming EMI and subscription payments
    - Recent expenses

---

## 🎨 Screenshots

> Beautiful, modern interface designed for clarity and ease of use

### Dashboard Overview
*See all your finances at a glance with colorful cards and charts*

### Expense Tracking
*Clean table view with easy add/edit/delete options*

### EMI Progress
*Visual progress bars show exactly how far you've come*

### Subscription Cards
*All your recurring payments in one organized view*

---

## 🛠️ Technology Stack

**Backend (The Brain)**
- Java + Spring Boot - Handles all the logic
- PostgreSQL - Stores your data securely
- JWT Authentication - Keeps your account safe

**Frontend (The Face)**
- React - Fast, modern interface
- TailwindCSS - Beautiful, responsive design
- Vite - Lightning-fast performance

**Infrastructure**
- Docker - Easy database setup
- REST API - Frontend & backend communicate smoothly

---

## 🔐 Security & Privacy

Your financial data is important. Here's how we protect it:

✅ **Passwords are encrypted** - We use BCrypt hashing (industry standard)  
✅ **Secure login sessions** - JWT tokens with 24-hour expiry  
✅ **Your data is yours** - Each user can only see their own information  
✅ **Protected API** - All endpoints require authentication  
✅ **No sharing** - We never share or sell your data

---

## 📊 Why Use FinTrack?

### **It's Simple**
No complicated features. Just the essentials done right.

### **It's Free**
100% free and open-source. No hidden costs, no premium tiers.

### **It's Private**
Your data stays yours. No ads, no tracking, no data mining.

### **It's Flexible**
Use it on your phone, tablet, or computer. Works everywhere.

---

## 🎓 Perfect For

- 💼 **Young Professionals** tracking their first paychecks
- 👨‍👩‍👧‍👦 **Families** managing household expenses
- 🎓 **Students** on a tight budget
- 💡 **Freelancers** tracking business expenses
- 🏠 **Anyone** who wants to know where their money goes

---

## 🤝 Need Help?

**Found a bug?** Open an [issue](https://github.com/RupiniNuthakki/fintrack/issues)  
**Have a question?** Email: rupininuthakki@gmail.com  
**Want to contribute?** Pull requests are welcome!

---

## 📈 Roadmap

What's coming next:

- [ ] 📧 Email reminders for upcoming payments
- [ ] 📊 Downloadable expense reports (PDF/Excel)
- [ ] 📅 Budget planning and goals
- [ ] 📱 Mobile app version
- [ ] 🌍 Multi-currency support
- [ ] 🤝 Split expenses with friends
- [ ] 🔔 Push notifications

---

## 🌟 Support This Project

If FinTrack helps you manage your finances better:

⭐ **Star this repo** on GitHub  
📣 **Share it** with friends who need it  
💬 **Spread the word** on social media  
🐛 **Report bugs** to make it better

---

## 👨‍💻 Created By

**Rupini Nuthakki**

💼 Building practical solutions for everyday problems  
📧 rupininuthakki@gmail.com  
🔗 [LinkedIn](#) | [GitHub](https://github.com/RupiniNuthakki) | [Portfolio](#)

---

<div align="center">

**Built with ❤️ for better financial awareness**

[⬆ Back to Top](#-fintrack---your-personal-finance-companion)

</div>