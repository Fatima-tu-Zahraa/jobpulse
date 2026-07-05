import { create } from 'zustand'
import { db } from '../lib/firebase'
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
} from 'firebase/firestore'

const useApplicationStore = create((set) => ({
  applications: [],

  fetchApplications: async () => {
    const snapshot = await getDocs(collection(db, 'applications'))
    const apps = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }))
    set({ applications: apps })
  },

  moveApplication: async (id, newStatus) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      ),
    }))
    await updateDoc(doc(db, 'applications', id), { status: newStatus })
  },

  addApplication: async (newApp) => {
    const newId = Date.now().toString()
    const appWithId = { ...newApp, id: newId, status: 'Applied' }

    set((state) => ({
      applications: [...state.applications, appWithId],
    }))

    await setDoc(doc(db, 'applications', newId), {
      company: newApp.company,
      role: newApp.role,
      appliedDate: newApp.appliedDate,
      status: 'Applied',
    })
  },

  deleteApplication: async (id) => {
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== id),
    }))
    await deleteDoc(doc(db, 'applications', id))
  },

  updateApplication: async (id, updatedFields) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, ...updatedFields } : app
      ),
    }))
    await updateDoc(doc(db, 'applications', id), updatedFields)
  },
}))

export default useApplicationStore