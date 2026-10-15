import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[55vh] flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto p-8 space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 text-blue-600 text-4xl font-black mb-2 shadow-inner">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา URL ที่คุณระบุอาจไม่ถูกต้อง หรือหน้านี้ถูกย้ายหรือลบไปแล้ว
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>กลับสู่หน้าแรก (Home)</span>
          </Link>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl text-sm transition-colors border border-gray-200"
          >
            ดูรายการสินค้า (Products)
          </button>
        </div>
      </div>
    </div>
  )
}
