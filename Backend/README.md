# 📘 **README — Diet Analyzer Backend (FastAPI + Groq LLM + MongoDB + JWT)**

## 📌 **Project Overview**
The **Diet Analyzer Backend** is a production-grade backend API built using **FastAPI**, **MongoDB**, **JWT Authentication**, and **Groq LLM models**.

It enables users to:
- Sign up and log in  
- Upload their diet chart  
- Automatically analyze diet using AI  
- Retrieve structured insights  
- Run custom prompts (chat-like)

---

## 📂 **Folder Structure**
```
app/
├── core/
│   ├── config.py
│   └── security.py
├── models/
│   ├── analysis_result.py
│   └── user_model.py
├── routers/
│   ├── auth_router.py
│   └── diet.py
├── schemas/
│   ├── user_schema.py
│   └── diet_schema.py
├── services/
│   ├── ml_service.py
│   └── user_service.py
├── utils/
│   ├── jwt_handler.py
│   ├── validators.py
│── database.py
└── main.py
```

---

## 🛠 **Tech Stack**
- FastAPI (Python)
- MongoDB + Motor
- Groq LLM (`llama-3.3-70b-versatile`)
- JWT Authentication
- Passlib (bcrypt)
- Python-JOSE
- Pydantic v2 + pydantic-settings

---

## 🔐 **Environment Variables (.env)**

```
MONGO_URI=mongodb://localhost:27017
DB_NAME=Diet_Analyzer
JWT_SECRET=your_jwt_secret_here
GROQ_API_KEY=your_groq_api_key_here
MODEL_NAME=llama-3.3-70b-versatile
```

---

## ⚙️ **Setup Instructions**

### 1️⃣ Create Virtual Environment
```
python -m venv venv
```
Activate:

Windows:
```
venv\Scripts\activate
```

Mac/Linux:
```
source venv/bin/activate
```

---

### 2️⃣ Install Dependencies
```
pip install -r requirements.txt
```

---

### 3️⃣ Run FastAPI Server
```
uvicorn app.main:app --reload
```

---

## 🧠 **How It Works (Flow)**

1️⃣ **User Signup →** password hashed → saved  
2️⃣ **Login →** verify password → JWT returned  
3️⃣ **Analyze →** raw input saved → Groq model returns AI analysis → saved in DB  
4️⃣ **Custom Prompt →** model returns result (no DB save)

---

## 🔒 **Security**
- Bcrypt password hashing  
- JWT token-based auth  
- Secrets stored in `.env`  
- Token validation for protected routes  

---

## 🎯 **Conclusion**
This backend is modular, secure, and production-ready.  
It follows a clean architecture and integrates Groq LLM seamlessly for diet analysis.

