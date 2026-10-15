import { useState, useEffect } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productApi'

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    description: '',
    image: ''
  })

  const loadProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบว่าเปิด JSON Server พอร์ต 3001 อยู่หรือไม่')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formError) setFormError('')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'Electronics',
      description: '',
      image: ''
    })
    setEditingId(null)
    setFormError('')
  }

  const showNotification = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedName = formData.name.trim()
    const parsedPrice = Number(formData.price)

    if (!trimmedName) {
      setFormError('กรุณากรอกชื่อสินค้า (ชื่อสินค้าต้องไม่เป็นค่าว่าง)')
      return
    }

    if (!formData.price || isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError('ราคาสินค้าต้องเป็นตัวเลขที่มากกว่า 0 บาท')
      return
    }

    const payload = {
      name: trimmedName,
      price: parsedPrice,
      category: formData.category || 'General',
      description: formData.description.trim() || 'No description provided.',
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80'
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
        showNotification(`แก้ไขสินค้า "${payload.name}" เรียบร้อยแล้ว`)
      } else {
        await createProduct(payload)
        showNotification(`เพิ่มสินค้าใหม่ "${payload.name}" เรียบร้อยแล้ว`)
      }
      resetForm()
      await loadProducts()
    } catch (err) {
      setFormError('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง')
    }
  }

  const handleStartEdit = (product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name || '',
      price: product.price || '',
      category: product.category || 'Electronics',
      description: product.description || '',
      image: product.image || ''
    })
    setFormError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "${name}" (ID: ${id})?`)
    if (!confirmed) return

    try {
      await deleteProduct(id)
      showNotification(`ลบสินค้า "${name}" เรียบร้อยแล้ว`)
      if (editingId === id) resetForm()
      await loadProducts()
    } catch (err) {
      setError(`ไม่สามารถลบสินค้าได้: ${err.message}`)
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          การจัดการสินค้า (Product Management)
        </h1>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 shadow-xs">
          <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">{successMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {editingId ? `แก้ไขสินค้า (Editing ID: ${editingId})` : 'เพิ่มสินค้าใหม่ (Add Product)'}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              ยกเลิกการแก้ไข (Cancel Edit)
            </button>
          )}
        </div>

        {formError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-medium">{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                ชื่อสินค้า <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="เช่น Wireless Mouse"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-blue-600 focus:border-blue-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                ราคา (บาท) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="เช่น 450"
                min="1"
                step="any"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-blue-600 focus:border-blue-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                หมวดหมู่
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-blue-600 focus:border-blue-600 bg-white transition-colors"
              >
                <option value="Electronics">Electronics</option>
                <option value="Audio">Audio</option>
                <option value="Fashion">Fashion</option>
                <option value="Gadget">Gadget</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                รูปภาพ URL (Image Link)
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-blue-600 focus:border-blue-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                รายละเอียดสินค้า
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="คำอธิบายคุณสมบัติสินค้าโดยย่อ"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-blue-600 focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-xs"
            >
              {editingId ? 'บันทึกการแก้ไข (Save Changes)' : 'เพิ่มสินค้า (Add Product)'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors"
              >
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">รายการสินค้าในระบบ</h2>
          </div>
          <button
            onClick={loadProducts}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>รีเฟรชข้อมูล</span>
          </button>
        </div>

        {loading && (
          <div className="p-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-medium text-gray-500">กำลังโหลดข้อมูลสินค้า...</p>
          </div>
        )}

        {!loading && error && (
          <div className="p-10 text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-sm text-red-600 font-medium max-w-md mx-auto">{error}</p>
            <button
              onClick={loadProducts}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
            >
              ลองใหม่อีกครั้ง (Retry)
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-base font-bold text-gray-800">ยังไม่มีรายการสินค้าในระบบ (Empty State)</p>
            <p className="text-xs text-gray-500">คุณสามารถเริ่มต้นเพิ่มสินค้าแรกได้โดยกรอกแบบฟอร์มด้านบน</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-[11px] font-bold tracking-wider border-b border-gray-100">
                  <th className="py-3.5 px-6">ID</th>
                  <th className="py-3.5 px-6">สินค้า</th>
                  <th className="py-3.5 px-6">หมวดหมู่</th>
                  <th className="py-3.5 px-6">ราคา</th>
                  <th className="py-3.5 px-6 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-gray-400">
                      #{p.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&auto=format&fit=crop&q=80'}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded-lg bg-gray-50 border border-gray-100 p-1"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{p.name}</p>
                          {p.description && (
                            <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{p.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                        {p.category || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      ฿{Number(p.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไขสินค้า (Edit)"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบสินค้า (Delete)"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
