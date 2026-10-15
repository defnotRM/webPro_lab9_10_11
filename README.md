# Web Programming Labs (Lab 9 - Lab 11)

โปรเจกต์ MiniShop พัฒนาด้วย React, Vite และ Tailwind CSS สำหรับการเรียนการสอนรายวิชา Web Programming

## ภาพรวมของแต่ละแล็บ

- lab_9: การใช้งาน React Router v6 สำหรับ Multi-Page Application, การแยก Component และการจัดการข้อมูลสินค้าผ่านโมเดล
- lab_10: การเชื่อมต่อ REST API ผ่าน JSON Server (GET, POST, PUT, DELETE) และจัดการข้อมูลสินค้า
- lab_11: การจัดทำระบบ Admin ด้วย DaisyUI, หน้า Dashboard สรุปข้อมูลสินค้า, การจัดการสินค้าด้วย Modal และระบบสลับธีม Light / Dark Mode

---

## วิธีการติดตั้งและรันโปรเจกต์

ก่อนเริ่มต้น ให้ติดตั้ง Node.js บนเครื่อง จากนั้นเลือกเข้าไปทำงานในโฟลเดอร์ของแล็บที่ต้องการ

### Lab 9: Routing & Component Architecture

1. เข้าโฟลเดอร์ lab_9 และติดตั้ง dependencies:
```bash
cd lab_9
npm install
```

2. รันแอปพลิเคชัน:
```bash
npm run dev
```

3. เข้าใช้งานผ่านเบราว์เซอร์: `http://localhost:5173`

---

### Lab 10: RESTful API Integration

แล็บนี้ต้องรันทั้ง Mock REST API (JSON Server) และ React Frontend:

1. เข้าโฟลเดอร์ lab_10 และติดตั้ง dependencies:
```bash
cd lab_10
npm install
```

2. เปิด Terminal ที่ 1 สำหรับรัน JSON Server (พอร์ต 3001):
```bash
npm run api
```

3. เปิด Terminal ที่ 2 สำหรับรัน React Frontend (พอร์ต 5173):
```bash
npm run dev
```

4. เข้าใช้งานผ่านเบราว์เซอร์:
- หน้าร้านค้า: `http://localhost:5173`
- หน้าจัดการสินค้า: `http://localhost:5173/admin/products`

---

### Lab 11: Advanced UI & Tailwind Components (DaisyUI)

แล็บนี้ต้องรันทั้ง Mock REST API (JSON Server) และ React Frontend:

1. เข้าโฟลเดอร์ lab_11 และติดตั้ง dependencies:
```bash
cd lab_11
npm install
```

2. เปิด Terminal ที่ 1 สำหรับรัน JSON Server (พอร์ต 3001):
```bash
npm run api
```

3. เปิด Terminal ที่ 2 สำหรับรัน React Frontend (พอร์ต 5173):
```bash
npm run dev
```

4. เข้าใช้งานผ่านเบราว์เซอร์:
- หน้าร้านค้า: `http://localhost:5173`
- หน้า Admin Dashboard: `http://localhost:5173/admin/dashboard`
- หน้า Admin จัดการสินค้า: `http://localhost:5173/admin/products`
