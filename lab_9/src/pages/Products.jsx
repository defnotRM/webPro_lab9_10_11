import { Link } from 'react-router-dom'
import { getAllProducts } from '../models/productModel'

export default function Products() {
  const products = getAllProducts()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          รายการสินค้าทั้งหมด (All Products)
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          มีสินค้าทั้งหมด {products.length} รายการให้คุณเลือกสรร
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col justify-between p-5"
          >
            <div>
              <div className="h-44 bg-slate-50 rounded-xl flex items-center justify-center p-4 overflow-hidden">
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
                <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-1" title={product.name}>
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-extrabold text-blue-600">
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

            <div className="mt-5 space-y-2">
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
    </div>
  )
}
