import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          About Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          เกี่ยวกับร้าน <span className="text-blue-600">MiniShop</span>
        </h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto">
          เราคือร้านค้าออนไลน์ยุคใหม่ที่มุ่งเน้นการมอบประสบการณ์ช้อปปิ้งที่เรียบง่าย รวดเร็ว และไว้ใจได้ที่สุด
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-8 sm:p-10 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">
            ความเป็นมาของ MiniShop
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
            MiniShop ก่อตั้งขึ้นเพื่อเป็นต้นแบบของเว็บแอปพลิเคชันอีคอมเมิร์ซแบบหลายหน้า (Multi-Page Application) 
            ที่พัฒนาด้วย React และ React Router v6 โดยจัดระเบียบโครงสร้างแบบ Component Architecture และ MVC Thinking 
            เพื่อให้การดูแลรักษาและการต่อยอดระบบเป็นไปได้อย่างมีประสิทธิภาพสูงสุด
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">
            วัตถุประสงค์ของร้าน (Store Mission & Objectives)
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
              <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                คัดสรรสินค้าคุณภาพสูง
              </h3>
              <p className="text-xs text-blue-700/80 mt-2 leading-relaxed">
                คัดเลือกเฉพาะอุปกรณ์และแกดเจ็ตที่ผ่านการตรวจสอบมาตรฐาน เพื่อให้ผู้ซื้อได้รับสินค้าที่คุ้มค่ากับราคา
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                ประสบการณ์การใช้งานที่ราบรื่น
              </h3>
              <p className="text-xs text-indigo-700/80 mt-2 leading-relaxed">
                โหลดหน้าเว็บได้อย่างรวดเร็วด้วย Client-side Routing สลับหน้ารวดเร็วโดยไม่ต้องรีเฟรชหน้าเบราว์เซอร์
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
              <h3 className="font-bold text-purple-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs">3</span>
                ความโปร่งใสและตรงไปตรงมา
              </h3>
              <p className="text-xs text-purple-700/80 mt-2 leading-relaxed">
                แสดงข้อมูลสินค้า รายละเอียด สเปก ราคา และการรีวิวอย่างชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">4</span>
                การบริการและการสนับสนุน
              </h3>
              <p className="text-xs text-emerald-700/80 mt-2 leading-relaxed">
                พร้อมให้คำปรึกษาและแก้ไขปัญหาแก่ลูกค้าอย่างรวดเร็วและเป็นมิตรตลอด 24 ชั่วโมง
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-500">
            พร้อมที่จะเลือกชมสินค้าของเราหรือยัง?
          </span>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-xs"
          >
            เลือกซื้อสินค้าตอนนี้
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
