
# Knowledge Assistant

ระบบ AI Chat ที่พัฒนาด้วย Next.js และ Express.js โดยใช้ Google Gemini AI เพื่อให้สามารถพูดคุยและตอบโต้ตอบได้อย่างมีประสิทธิภาพ

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

[1-command setup, e.g.

docker compose up]

 

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
