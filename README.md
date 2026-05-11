
# Knowledge Assistant

ระบบ AI Chat ที่พัฒนาด้วย Next.js และ Express.js โดยใช้ Google Gemini AI เพื่อให้สามารถพูดคุยและค้นหาข้อมูลที่ต้องการได้อย่างรวดเร็วและมีประสิทธิภาพ

## Tech Stack

#### Frontend

-   [Next.js](https://nextjs.org/) - React Framework สำหรับการสร้างเว็บแอปพลิเคชัน
-   [TypeScript](https://www.typescriptlang.org/) - ใช้เพื่อเพิ่ม Type Safety ให้กับโปรเจกต์ ช่วยลดข้อผิดพลาดและจัดการโครงสร้างข้อมูล
-   [TailwindCSS](https://tailwindcss.com/) - สำหรับการจัดการ Style

#### Backend

-   [Node.js](https://nodejs.org/) - JavaScript Runtime
-   [Express](https://expressjs.com/) - Web Framework สำหรับ Node.js
-   [JWT](https://jwt.io/) - สำหรับการยืนยันตัวตนผู้ใช้

#### Database

-   [PostgreSQL](https://www.postgresql.org/) - สำหรับเก็บข้อมูลผู้ใช้และประวัติการแชท 
- [Prisma ORM](https://www.prisma.io/) - เครื่องมือจัดการฐานข้อมูลแบบ Type-safe ช่วยให้เขียน Query ง่ายและจัดการ Migration ได้

#### AI Engine

- [Google Gemini API (Generative AI)](https://ai.google.dev/) - ใช้โมเดลภาษาขนาดใหญ่ที่ฉลาดและรองรับภาษาไทยได้ดีเยี่ยม
 

## Setup & Run
ขั้นตอนรันโปรเจกต์
    
1. การเตรียมความพร้อมก่อนรัน
 - ติดตั้ง Node.js (แนะนำ v18.x ขึ้นไป)
 - ติดตั้ง Docker และ Docker Compose
 - มี Google Gemini API Key (รับได้ที่ [Google AI Studio](https://ai.google.dev/))

2. การตั้งค่า **Environment Variables**
สร้างไฟล์ `.env` จาก `.env.example` ไว้ในโฟลเดอร์หลัก (Root) โดยตั้งค่าตัวแปรดังนี้

#### ฝั่ง Backend
```
# -------------- Backend --------------
NODE_ENV=development
BACKEND_PORT=8000

FRONTEND_URL=your_frontend_url 
# http://localhost:3000

# database
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name

DATABASE_URL=postgresql://your_postgres_user:your_postgres_password@postgres:5432/your_database_name
# postgresql://postgres:password@postgres:5432/mydb

JWT_SECRET="ตั้งรหัสลับสำหรับ_JWT"

# Gemini API key
GEMINI_API_KEY="ใส่_API_KEY_ของคุณที่นี่"
```

#### ฝั่ง Frontend
```
# -------------- Frontend --------------
NEXT_PUBLIC_API_URL=your_backend_url # http://localhost:8000/api
API_BASE_URL=http://backend:8000/api # backend API endpoint

FRONTEND_PORT=3000
```

3. เริ่มต้นใช้งานด้วย Docker
วิธีนี้จะสามารถรันได้ทั้ง Database, Backend และ Frontend ให้พร้อมกันในคำสั่งเดียว

``` 
docker compose up --build
```

*เข้าใช้งานหน้าเว็บผ่าน Browser ที่ http://localhost:3000 และ Backend http://localhost:8000*

## Features Done

- [x] Login + Protected Routes ระบบสมาชิกและการป้องกันเส้นทางสำหรับผู้ใช้ที่ล็อกอินเท่านั้น

- [x] Chat with AI (basic)

- [ ] RAG with Vector DB ระบบค้นหาคำตอบจากไฟล์ที่อัปโหลด ดึงข้อมูลจากฐานข้อมูล Vector มาตอบคำถาม **(ไม่ได้พัฒนา)**

- [ ] File Upload รองรับการอัปโหลดไฟล์เอกสาร (PDF, Text) เพื่อเตรียมนำไปประมวลผล **(ไม่ได้พัฒนา)**

- [x] Token Usage Counter แสดง token ที่ใช้ในแต่ละข้อความ

 

## Architecture

[brief architecture

description]

 

## Known Issues

[things you know are not great

yet]
