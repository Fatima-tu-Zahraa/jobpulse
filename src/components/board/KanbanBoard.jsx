import { useState, useEffect } from 'react'
import { DndContext, closestCorners, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core'
import { Loader2, AlertCircle } from 'lucide-react'
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
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  )

  const [activeId, setActiveId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadData() {
      setLoadError(false)
      try {
        await fetchApplications()
      } catch (err) {
        console.error('Failed to fetch applications:', err)
        setLoadError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return
    moveApplication(active.id, over.id)
    setActiveId(null)
  }

  function handleRetry() {
    setIsLoading(true)
    fetchApplications()
      .catch((err) => {
        console.error('Failed to fetch applications:', err)
        setLoadError(true)
      })
      .finally(() => setIsLoading(false))
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
            <div className="flex justify-between items-center px-4 md:px-6 pt-4 md:pt-6">
              <p className="text-xs md:text-sm text-gray-500">
                Track and manage your job applications
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white text-xs md:text-sm rounded-lg px-3 md:px-4 py-2 hover:bg-indigo-700 whitespace-nowrap"
              >
                + Add Application
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col justify-center items-center py-20 gap-3">
                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                <p className="text-gray-400 text-sm">Loading your applications...</p>
              </div>
            ) : loadError ? (
              <div className="flex flex-col justify-center items-center py-20 gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <p className="text-gray-500 text-sm">Couldn't load your applications.</p>
                <button
                  onClick={handleRetry}
                  className="text-indigo-600 text-sm font-medium hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-4 md:p-6">
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