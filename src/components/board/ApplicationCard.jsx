import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import useApplicationStore from '../../store/useApplicationStore'
import ApplicationDetailModal from '../modals/ApplicationDetailModal'

function ApplicationCard({ id, company, role, appliedDate, notes }) {
  const deleteApplication = useApplicationStore((state) => state.deleteApplication)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  })

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined

  function handleDelete(e) {
    e.stopPropagation()
    e.preventDefault()
    deleteApplication(id)
  }

  function handleCardClick() {
    if (!isDragging) {
      setIsDetailOpen(true)
    }
  }

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={style}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200 hover:shadow-md transition-shadow relative group"
      >
        <div
          {...listeners}
          {...attributes}
          onClick={handleCardClick}
          className="cursor-grab active:cursor-grabbing"
        >
          <h3 className="font-semibold text-gray-800 text-sm pr-6">{company}</h3>
          <p className="text-gray-500 text-xs mt-1">{role}</p>
          <p className="text-gray-400 text-xs mt-2">Applied: {appliedDate}</p>
        </div>

        <button
          onClick={handleDelete}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 text-gray-400 sm:text-gray-300 sm:opacity-0 sm:group-hover:opacity-100 hover:text-red-500 transition-opacity z-10"
        >
          <Trash2 size={16} />
        </button>
      </motion.div>

      {isDetailOpen && (
        <ApplicationDetailModal
          application={{ id, company, role, appliedDate, notes }}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  )
}

export default ApplicationCard