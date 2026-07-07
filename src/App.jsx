import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { User, Code2, ExternalLink, Menu, X, Sparkles, LayoutGrid, BarChart3 } from 'lucide-react'
import KanbanBoard from './components/board/KanbanBoard'
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard'
import JDAnalyzer from './components/ai/JDAnalyzer'

function Navigation() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const menuRef = useRef(null)

  const navLinks = [
    { to: '/', label: 'Board', icon: LayoutGrid },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/analyzer', label: 'AI Analyzer', icon: Sparkles },
  ]

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-white border-b border-slate-200 px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">JobPulse</h1>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              const isAI = link.to === '/analyzer'
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? isAI
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon size={15} />
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-full text-white hover:from-indigo-700 hover:to-indigo-600 transition-all"
            >
              <User size={18} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-800">JobPulse</p>
                  <p className="text-xs text-slate-500">AI-Powered Job Tracker</p>
                </div>
                <a href="https://github.com/Fatima-tu-Zahraa/jobpulse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <Code2 size={16} />
                  View on GitHub
                </a>
                <a href="https://www.linkedin.com/in/fatimazahra0100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <ExternalLink size={16} />
                  Connect on LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden flex items-center justify-center w-9 h-9 text-slate-600"
        >
          {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileNavOpen && (
        <div className="lg:hidden border-t border-slate-100 py-3 px-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg mb-1 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            )
          })}
          <div className="border-t border-slate-100 mt-2 pt-2">
            <a href="https://github.com/Fatima-tu-Zahraa/jobpulse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
              <Code2 size={16} />
              View on GitHub
            </a>
            <a href="https://www.linkedin.com/in/fatimazahra0100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
              <ExternalLink size={16} />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/analyzer" element={<JDAnalyzer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App