import React, { useState } from 'react'

function Customer_Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for reaching out. Customer support service is currently in development and under testing.')
    setFormData({ name: '', email: '', query: '' })
  }

  return (
    <div className="bg-purple-50 min-h-screen flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-10 text-[#4f3267]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Customer Support</h1>
        <p className="text-sm sm:text-base mb-6 text-center">
          Need help or have a question? Please fill out the form below and we’ll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Query</label>
            <textarea
              name="query"
              required
              rows="4"
              value={formData.query}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4f3267] text-white rounded-lg p-3 font-medium text-sm sm:text-base hover:bg-[#3d2750] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Customer_Support
