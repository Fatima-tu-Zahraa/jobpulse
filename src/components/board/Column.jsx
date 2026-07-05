import { useDroppable } from '@dnd-kit/core'
import { AnimatePresence } from 'framer-motion'
import ApplicationCard from './ApplicationCard'

function Column({ id, title, applications }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl p-4 w-72 flex-shrink-0 transition-colors ${
        isOver ? 'bg-blue-100' : 'bg-gray-100'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
          {title}
        </h2>
        <span className="bg-gray-300 text-gray-600 text-xs px-2 py-1 rounded-full">
          {applications.length}
        </span>
      </div>

      <div>
        {applications.length === 0 ? (
          <p className="text-gray-400 text-xs text-center py-8">
            No applications here
          </p>
        ) : (
          <AnimatePresence>
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                id={app.id}
                company={app.company}
                role={app.role}
                appliedDate={app.appliedDate}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default Column