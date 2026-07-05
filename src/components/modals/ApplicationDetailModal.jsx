import { useState } from 'react'
import { motion } from 'framer-motion'
import useApplicationStore from '../../store/useApplicationStore'

function ApplicationDetailModal({ application, onClose }) {
  const updateApplication = useApplicationStore((state) => state.updateApplication)

  const [company, setCompany] = useState(application.company)
  const [role, setRole] = useState(application.role)
  const [appliedDate, setAppliedDate] = useState(application.appliedDate)
  const [notes, setNotes] = useState(application.notes || '')

  function handleSave(e) {
    e.preventDefault()

    if (!company || !role || !appliedDate) {
      alert('Please fill all required fields')
      return
    }

    updateApplication(application.id, { company, role, appliedDate, notes })
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
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl p-6 w-96 shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Application</h2>

        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Role / Position
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Applied Date
            </label>
            <input
              type="text"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Interview prep, recruiter contact, etc."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm flex-1 hover:bg-blue-700"
            >
              Save Changes
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

export default ApplicationDetailModal