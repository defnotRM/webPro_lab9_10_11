import { useState, useEffect } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productApi'

const emptyForm = {
  name: '',
  price: '',
  category: 'Computer',
  description: '',
  image: ''
}

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const loadProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับ REST API ได้ กรุณาตรวจสอบว่ารัน JSON Server อยู่ที่พอร์ต 3001')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const openAddModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
    setIsModalOpen(true)
  }

  const startEdit = (product) => {
    setEditingId(product.id)
    setForm({
      name: product.name || '',
      price: String(product.price || ''),
      category: product.category || 'Computer',
      description: product.description || '',
      image: product.image || ''
    })
    setFormError('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (formError) setFormError('')
  }

  const showNotification = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedName = form.name.trim()
    const parsedPrice = Number(form.price)

    if (!trimmedName) {
      setFormError('กรุณากรอกชื่อสินค้า')
      return
    }

    if (!form.price || isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError('ราคาสินค้าต้องมากกว่า 0')
      return
    }

    const payload = {
      name: trimmedName,
      price: parsedPrice,
      category: form.category || 'Computer',
      description: form.description.trim() || 'No description provided.',
      image: form.image.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80'
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
        showNotification(`แก้ไขสินค้า "${payload.name}" เรียบร้อยแล้ว`)
      } else {
        await createProduct(payload)
        showNotification(`เพิ่มสินค้าใหม่ "${payload.name}" เรียบร้อยแล้ว`)
      }
      closeModal()
      await loadProducts()
    } catch (err) {
      setFormError('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง')
    }
  }

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "${name}"?`)
    if (!confirmed) return

    try {
      await deleteProduct(id)
      showNotification(`ลบสินค้า "${name}" เรียบร้อยแล้ว`)
      await loadProducts()
    } catch (err) {
      setError(`ไม่สามารถลบสินค้าได้: ${err.message}`)
    }
  }

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Products</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="mt-2 opacity-70">
            Manage your MiniShop product catalog
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn btn-primary"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {successMessage && (
        <div role="alert" className="alert alert-success">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div role="alert" className="alert alert-error">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
          <button
            onClick={loadProducts}
            className="btn btn-sm"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="alert mt-4">
          <svg className="w-6 h-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <div>
            <h3 className="font-bold">ยังไม่มีสินค้าในระบบ</h3>
            <div className="text-xs">กดปุ่ม Add Product ด้านบนเพื่อเพิ่มสินค้าแรกของคุณ</div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box bg-base-100 shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&auto=format&fit=crop&q=80'}
                        alt={product.name}
                        className="w-10 h-10 object-contain rounded bg-base-200 p-1"
                      />
                      <div>
                        <div className="font-bold">{product.name}</div>
                        {product.description && (
                          <div className="text-xs opacity-60 line-clamp-1 max-w-xs">{product.description}</div>
                        )}
                      </div>
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
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        className="btn btn-info btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-h-[90vh] max-w-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-base-200">
              <h3 className="font-bold text-lg">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {formError && (
              <div role="alert" className="alert alert-error mt-4 text-sm py-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Product Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Price (THB) *</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0.01"
                    step="any"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="Computer">Computer</option>
                    <option value="Audio">Audio</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Gadget">Gadget</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Image URL</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/product.jpg"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product description"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>

              <div className="modal-action pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </section>
  )
}
