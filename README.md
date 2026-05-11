
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

- [Google Gemini API (Generative AI)](https://ai.google.dev/) - ใช้โมเดลภาษาขนาดใหญ่ที่ฉลาด สำหรับตอบคำถามและค้นหาข้อมูล และรองรับภาษาไทยได้
 

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

- [x] Login + Protected Routes 

- [x] Chat with AI (basic)

- [ ] Chat with Uploaded File Context **(ไม่ได้พัฒนา)**

- [ ] File Upload **(ไม่ได้พัฒนา)**

- [x] Token Usage Counter แสดง token ที่ใช้ในแต่ละข้อความ

 

## Architecture

โปรเจกต์นี้แบ่งการทำงานออกเป็น 3 ส่วนหลัก ได้แก่ Frontend, Backend และ Database ซึ่งทำงานร่วมกันเพื่อให้ผู้ใช้สามารถสนทนากับ AI 

#### Frontend (Next.js)

ทำหน้าที่เป็นส่วนติดต่อผู้ใช้ (User Interface) สำหรับแสดงหน้าแชท ประวัติการสนทนา แสดงการใช้งาน Token และตรวจสอบสิทธิ์ผู้ใช้ในฝั่ง Client

#### Backend (Express.js)

ทำหน้าที่เป็น API Layer สำหรับจัดการ Business Logic ตรวจสอบความปลอดภัย และเชื่อมต่อกับ Google Gemini API
เพื่อส่งข้อความไปให้ AI ประมวลผล

#### Database (PostgreSQL+ Prisma ORM)

ใช้จัดเก็บข้อมูล เช่น ข้อมูลผู้ใช้ ประวัติการสนทนา

 

## Known Issues
- ปัจจุบันระบบยังคงเป็นระบบแชทพูดคุย ค้นหาข้อมูล ยังใช้ความรู้ทั่วไปจากโมเดล Gemini อยู่ ยังไม่ได้ดึงข้อมูลจากไฟล์ที่อัปโหลดมาตอบโดยตรง
- Token Limit – ในเวอร์ชันฟรีของ Google Gemini API
 มีข้อจำกัดด้าน Rate Limit ซึ่งอาจทำให้ไม่สามารถส่งคำขอได้ต่อเนื่อง
- File Upload – ระบบอัปโหลดไฟล์ (PDF, TXT) และการดึงข้อมูลในไฟล์มาตอบคำถาม (RAG) ซึ่งได้ศึกษาไว้แล้ว แต่ยังไม่ได้มีการพัฒนา
