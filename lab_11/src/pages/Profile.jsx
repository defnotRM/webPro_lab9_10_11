import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Alex Student',
    email: 'alex@email.com',
    studentId: '6501234567',
    major: 'Computer Science',
    faculty: 'Science and Technology'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ ...profile })

  const handleSave = (e) => {
    e.preventDefault()
    setProfile({ ...editForm })
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          โปรไฟล์ผู้ใช้งาน (User Profile)
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          จัดการข้อมูลส่วนตัวและตรวจสอบประวัติการใช้งานระบบ MiniShop
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-xs p-8 text-center">
          <div className="w-28 h-28 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center shadow-inner">
            <svg className="w-14 h-14 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-5">{profile.name}</h2>
          <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mt-1">
            Student Account
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-600 text-left border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">อีเมล:</span>
              <span className="font-medium text-gray-800">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">รหัสนักศึกษา:</span>
              <span className="font-mono font-medium text-gray-800">{profile.studentId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">สาขาวิชา:</span>
              <span className="font-medium text-gray-800">{profile.major}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setEditForm({ ...profile })
              setIsEditing(!isEditing)
            }}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-xs"
          >
            {isEditing ? 'ยกเลิกการแก้ไข' : 'แก้ไขโปรไฟล์ (Edit Profile)'}
          </button>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {isEditing ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">แก้ไขข้อมูลส่วนตัว</h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">อีเมล</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">รหัสนักศึกษา</label>
                  <input
                    type="text"
                    value={editForm.studentId}
                    onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">สาขาวิชา</label>
                  <input
                    type="text"
                    value={editForm.major}
                    onChange={(e) => setEditForm({ ...editForm, major: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-xs"
                  >
                    บันทึกข้อมูล
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-8 space-y-6">
              <h3 className="text-lg font-bold text-gray-900">สรุปข้อมูลบัญชี (Account Summary)</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-semibold">รายการสั่งซื้อทั้งหมด</p>
                  <p className="text-2xl font-black text-blue-900 mt-1">12 รายการ</p>
                </div>
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-semibold">ยอดสั่งซื้อรวม</p>
                  <p className="text-2xl font-black text-emerald-900 mt-1">฿34,500</p>
                </div>
                <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
                  <p className="text-xs text-purple-600 font-semibold">คะแนนสะสม</p>
                  <p className="text-2xl font-black text-purple-900 mt-1">450 แต้ม</p>
                </div>
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
                  <p className="text-xs text-amber-600 font-semibold">สินค้าที่บันทึกไว้</p>
                  <p className="text-2xl font-black text-amber-900 mt-1">5 ชิ้น</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">ต้องการสำรวจสินค้าเพิ่ม?</span>
                <Link
                  to="/products"
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>ไปที่หน้าสินค้าทั้งหมด</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
