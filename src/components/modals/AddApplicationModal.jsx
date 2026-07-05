import { useState } from 'react'
import { motion } from 'framer-motion'
import useApplicationStore from '../../store/useApplicationStore'

function AddApplicationModal({ onClose }) {
  const addApplication = useApplicationStore((state) => state.addApplication)

  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [appliedDate, setAppliedDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!company || !role || !appliedDate) {
      alert('Please fill all fields')
      return
    }

    addApplication({ company, role, appliedDate })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 w-96 shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Application</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Role / Position"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Applied date (e.g. 27 Jun)"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm flex-1 hover:bg-blue-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm flex-1 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default AddApplicationModal