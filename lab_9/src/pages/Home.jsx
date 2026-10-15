import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../models/productModel'

export default function Home() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            Official Store 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            ยินดีต้อนรับสู่ <span className="text-blue-200">MiniShop</span>
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            แหล่งรวมอุปกรณ์ไอที แกดเจ็ต และสินค้าแฟชั่นคุณภาพเยี่ยม คัดสรรมาเพื่อตอบโจทย์ทุกไลฟ์สไตล์ของคนรุ่นใหม่
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all text-sm"
            >
              ดูสินค้าทั้งหมด
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm border border-white/20"
            >
              เกี่ยวกับร้านเรา
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">สินค้าแนะนำ (Featured Products)</h2>
            <p className="text-sm text-gray-500 mt-1">สินค้าขายดีและได้รับความนิยมสูงสุดในสัปดาห์นี้</p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            <span>ดูทั้งหมด</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col justify-between p-5"
            >
              <div>
                <div className="h-48 bg-slate-50 rounded-xl flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4">
                  <span className="inline-block text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full capitalize mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-gray-800 text-lg leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xl font-extrabold text-blue-600">
                      {product.priceFormatted || `฿${product.price.toLocaleString()}`}
                    </p>
                    {product.rating && (
                      <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>{product.rating.rate}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  to={`/products/${product.id}`}
                  className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-xs"
                >
                  ดูรายละเอียดสินค้า
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
