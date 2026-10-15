import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productApi'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลสินค้าได้')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const totalValue = products.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  )

  const categories = new Set(
    products.map(product => product.category)
  ).size

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
        <button
          className="btn btn-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      description: 'จำนวนสินค้าทั้งหมด'
    },
    {
      title: 'Product Value',
      value: `฿${totalValue.toLocaleString('en-US')}`,
      icon: (
        <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'ผลรวมราคาสินค้า'
    },
    {
      title: 'Categories',
      value: categories,
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      description: 'จำนวนหมวดหมู่'
    }
  ]

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Dashboard</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 opacity-70">
            Overview of your MiniShop products
          </p>
        </div>
        <Link to="/admin/products" className="btn btn-primary">
          Manage Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(stat => (
          <div key={stat.title} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between gap-3">
                <h2 className="card-title text-base">
                  {stat.title}
                </h2>
                <span>{stat.icon}</span>
              </div>
              <p className="mt-2 text-3xl font-bold">
                {stat.value}
              </p>
              <p className="text-sm opacity-60">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between gap-3">
            <h2 className="card-title">Recent Products</h2>
            <Link to="/admin/products" className="link link-primary">
              View All
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="alert mt-4">
              <span>ยังไม่มีสินค้าในระบบ</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&auto=format&fit=crop&q=80'}
                            alt={product.name}
                            className="w-9 h-9 object-contain rounded bg-base-200 p-1"
                          />
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-outline">
                          {product.category}
                        </span>
                      </td>
                      <td>
                        ฿{Number(product.price).toLocaleString('en-US')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
