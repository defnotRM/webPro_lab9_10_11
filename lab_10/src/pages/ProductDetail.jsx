import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProductById as getProductFromApi } from '../services/productApi'
import { getProductById as getFallbackProduct } from '../models/productModel'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [addedMessage, setAddedMessage] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      try {
        const data = await getProductFromApi(id)
        setProduct(data)
      } catch (err) {
        const fallback = getFallbackProduct(id)
        setProduct(fallback || null)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center p-16">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-red-100 p-8 sm:p-12 text-center shadow-xs">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-6">Product not found</h2>
        <p className="text-gray-500 text-sm mt-2">
          ขออภัย ไม่พบข้อมูลสินค้าสำหรับรหัสสินค้า <span className="font-mono font-semibold text-red-500">#{id}</span>
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>กลับไปหน้ารวมสินค้า (Back to Products)</span>
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    setAddedMessage(true)
    setTimeout(() => setAddedMessage(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <nav className="text-xs text-gray-400 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium truncate max-w-[150px]">{product.name}</span>
        </nav>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-center min-h-[320px]">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80'}
              alt={product.name}
              className="max-h-80 max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              {product.title && product.title !== product.name && (
                <p className="text-sm text-gray-500 mt-1">{product.title}</p>
              )}
            </div>

            <div className="flex items-baseline gap-4 pt-2 border-t border-gray-100">
              <span className="text-3xl font-black text-blue-600">
                {product.priceFormatted || `฿${Number(product.price).toLocaleString()}`}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span className="text-amber-500 font-bold flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>{product.rating.rate}</span>
                  </span>
                  <span>({product.rating.count} reviews)</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">รายละเอียดสินค้า</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pt-2">
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>สินค้าพร้อมส่งใน 24 ชม.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>รับประกันศูนย์ 1 ปี</span>
              </div>
            </div>

            {addedMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                เพิ่ม "{product.name}" ลงตะกร้าเรียบร้อยแล้ว!
              </div>
            )}

            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-xs"
                >
                  เพิ่มลงในตะกร้า
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl text-sm transition-colors border border-gray-200"
                >
                  Continue Shopping
                </button>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full text-center text-xs text-gray-500 hover:text-blue-600 py-1 transition-colors"
              >
                กลับสู่หน้าแรก (Home)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
