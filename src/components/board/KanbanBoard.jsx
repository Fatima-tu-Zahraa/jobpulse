import { useState, useEffect } from 'react'
import { DndContext, closestCorners, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { Loader2 } from 'lucide-react'
import Column from './Column'
import AddApplicationModal from '../modals/AddApplicationModal'
import useApplicationStore from '../../store/useApplicationStore'

function KanbanBoard() {
  const applications = useApplicationStore((state) => state.applications)
  const moveApplication = useApplicationStore((state) => state.moveApplication)
  const fetchApplications = useApplicationStore((state) => state.fetchApplications)
  const columns = ['Applied', 'Interview', 'Offer', 'Rejected']

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const [activeId, setActiveId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      await fetchApplications()
      setIsLoading(false)
    }
    loadData()
  }, [])

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const draggedAppId = active.id
    const newStatus = over.id

    moveApplication(draggedAppId, newStatus)
    setActiveId(null)
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center px-6 pt-6">
              <p className="text-sm text-gray-500">
                Track and manage your job applications
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-blue-700"
              >
                + Add Application
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col justify-center items-center py-20 gap-3">
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                <p className="text-gray-400 text-sm">
                  Loading your applications...
                </p>
              </div>
            ) : (
              <div className="flex gap-4 p-6 overflow-x-auto">
                {columns.map((columnTitle) => {
                  const filteredApps = applications.filter(
                    (app) => app.status === columnTitle
                  )
                  return (
                    <Column
                      key={columnTitle}
                      id={columnTitle}
                      title={columnTitle}
                      applications={filteredApps}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </DndContext>

      {isModalOpen && (
        <AddApplicationModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

export default KanbanBoard