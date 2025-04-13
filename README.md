# 📝 ToDo'S App

A React + Tailwind To-Do List Manager built with **Clerk** and **Supabase**, designed to help users create, manage, and organize tasks efficiently.

---

## 🚀 Features
- ✅ Add, view, update, and delete tasks
- 🔒 User-specific task retrieval using `userId`
- 🧹 Clear/reset all tasks (for dev/testing)
- 🔐 Ready for integration with authentication (e.g., Clerk.dev)
---

## 🧰 Tech Stack
- **Frontend**: React + tailwind 
- **Authentication**: Clerk
- **Database**: Supabase

---

## 📂 Project Structure

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/amit2647/todolist.git
cd todolist-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up your .env file**

- Create a .env file in the root directory with the following:

```bash
#CLERK ENV VARIABLES
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_Y3VyaW91cxxxxxxxxxxxxxxxxxxxx

#SUPABASE ENV VARIABLES
REACT_APP_SUPABASE_URL=https://nkszighzxxxxxxxx
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6Ikpxxxxxxxxxxxxxxxxxxxxxxxx
```

4. **Run the server**

```bash
npm start
```
