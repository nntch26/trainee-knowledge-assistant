# AI Usage Journal

## Session 1: สร้างโปรเจกต์ Next.js
**Prompt:** "สร้างโปรเจกต์ Next.js TypeScript และ Tailwind CSS"

**AI Response:** แนะนำคำสั่ง create-next-app เพื่อติดตั้งโปรเจกต์พร้อม TypeScript และ Tailwind CSS

**My Adjustment:** หลังจากสร้างก็ทำการจัดโครงสร้างโฟลเดอร์เพิ่ม อย่างเช่น components Types และ lib

## Session 2: สร้าง Backend ด้วย Express.js
**Prompt:** "สร้าง Backend ด้วย Express.js"

**AI Response:** แนะนำการติดตั้ง Express กับ package ที่จำเป้นต้องใช้ และโค้ดตัวอย่างสำหรับเริ่มโปรเจกต์

**My Adjustment:** จัดโครงสร้างโฟลเดอร์เพิ่ม แยกเป็น routes, controllers และ middleware

## Session 3: การใช้งาน Prisma กับ PostgreSQL
**Prompt:** "ขั้นตอนใช้ Prisma กับ PostgreSQL ใน Express.js"

**AI Response:** อธิบายการติดตั้ง Prisma สร้าง schema และเชื่อมต่อฐานข้อมูล

**My Adjustment:** ออกแบบตาราง User, Chat, TokenUsage และ UploadedFile เพิ่ม

## Session 4: การใช้งาน Docker
**Prompt:** "สร้าง Dockerfile และ Docker Compose สำหรับ Next.js, Express.js และ PostgreSQL"

**AI Response:** แนะนำการสร้าง Dockerfile และ Docker Compose พร้อมโค้ดตัวอย่าง

## Session 5: การตรวจสอบข้อมูลด้วย Zod
**Prompt:** "ตรวจสอบข้อมูลใน Express.js ยังไง"

**AI Response:** แนะนำการสร้าง Schema ด้วย Zod เพื่อใช้ตรวจสอบข้อมูลที่ส่งเข้ามาจาก API พร้อมโค้ดตัวอย่าง

**My Adjustment:** สร้าง registerSchema และ loginSchema เพิ่ม และเอาไปใช้ตรวจสอบข้อมูลก่อนเข้าสู่ Controller

## Session 6: การออกแบบหน้าเว็บ chat ai
**Prompt:** "ออกแบบหน้าเว็บ chat ai ที่มี Login Page Chat Page คุยกับ AI สามารถ upload เอกสาร (PDF/TXT) แล้วถามคำถามเกี่ยวกับเอกสารได้ และแสดง token ที่ใช้ในแต่ละข้อความ ใช้ next js ขอดีไซน์โทนสีขาว ฟ้า"

**AI Response:** โค้ด next js ที่เป็นหน้า AI Chat โทนสีขาว

**My Adjustment:** ปรับดีไซน์เพิ่ม เปลี่ยนสี และแยก component หรือลบบาง component ที่ไม่ใช้

## Session 7: เลือกใช้ AI สำหรับ Chat
**Prompt:** "จะสร้าง web application  ที่มี Chat Page คุยกับ AI ให้คุยโต้ตอบได้เหมือน chatgpt และ upload เอกสาร (PDF/TXT) แล้วถามคำถามเกี่ยวกับเอกสารได้ จะใช้ ai api ตัวไหนดีที่ฟรี"

**AI Response:** แนะนำ AI API (Free Tier) ที่ตอบโจทย์ที่สุด เนื่องจากคุณต้องการฟีเจอร์การคุยและอ่านเอกสาร (RAG) แนะนำให้พิจารณาสองตัวนี้ Google Gemini API (แนะนำที่สุด) กับ  Groq Cloud API

**My Adjustment:** เลือกเป็น Google Gemini API ให้โควตาฟรีค่อนข้างเยอะ สำหรับทดลอง

## Session 8: การเชื่อมต่อ Google Gemini AI
**Prompt:** "เชื่อมต่อ Google Gemini API กับ Express.js ยังไง"

**AI Response:** ขั้นตอนการเชื่อมต่อ Google Gemini API พร้อมโค้ดตัวอย่าง

**My Adjustment:** ปรับโค้ดส่วนไฟล์ Service ให้บันทึกข้อมูลแชท ข้อความ และศึกษาเพิ่มเติมจาก ([Gemini API quickstart](https://ai.google.dev/gemini-api/docs/quickstart))


## Session 9: การแสดงผลข้อความแบบ Markdown
**Prompt:** "วิธีแสดงผลข้อความ Markdown ใน Next.js"

**AI Response:** แนะนำการใช้ react-markdown เพื่อแสดงผลข้อความจาก AI เช่น หัวข้อ รายการ และรองรับ Syntax Highlight สำหรับโค้ดบล็อก 

## Session 10: การทำ Rate Limiting
**Prompt:** "ทำ Rate Limiting คือไร และทำยังไงใน Express.js"

**AI Response:** แนะนำการใช้ express-rate-limit เพื่อป้องกันการส่งคำขอจำนวนมากเกินไป พร้อมโค้ดตัวอย่าง

**My Adjustment:** นำโค้ด api rate limit ไปเพิ่มใน route 

## Session 11: การทำ Rate Limiting สำหรับ AI Chat 
**Prompt:** "ทำ Rate Limiting สำหรับ AI Chat"

**AI Response:** โค้ดตัวอย่างการทำ Rate Limiting สำหรับ AI Chat

**My Adjustment:** นำโค้ด rate limit ไปเพิ่มใน route ที่เป็นส่งข้อความหา ai

## Session 12: การเพิ่ม Docker Healthcheck
**Prompt:** "Healthcheck ใน Docker Compose"

**AI Response:** แนะนำการใช้ healthcheck เพื่อตรวจสอบว่า Backend และ Database พร้อมใช้งานหรือไม่ พร้อมโค้ดตัวอย่าง

**My Adjustment:** เพิ่ม Healthcheck ในไฟล์ docker compose ทุก service

## Session 13: การแก้ปัญหา Docker Networking
**Prompt:** "ทำไม Frontend เชื่อมต่อ Backend ใน Docker ไม่ได้"

**AI Response:** อธิบายการใช้ Service Name เช่น backend และ postgres แทน localhost

**My Adjustment:** เปลี่ยนค่าใน env ให้ frontend เชื่อมต่อภายใน Container โดยใช้ชื่อ Service


