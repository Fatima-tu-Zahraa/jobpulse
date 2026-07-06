import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { User, Code2, ExternalLink, Menu, X } from 'lucide-react'
import KanbanBoard from './components/board/KanbanBoard'
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard'
import JDAnalyzer from './components/ai/JDAnalyzer'

function Navigation() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Board' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/analyzer', label: 'AI Analyzer' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 px-4 md:px-6">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800">JobPulse</h1>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.to
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-full text-white hover:bg-blue-700"
            >
              <User size={18} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">JobPulse</p>
                  <p className="text-xs text-gray-500">AI-Powered Job Tracker</p>
                </div>
                <a href="https://github.com/Fatima-tu-Zahraa/jobpulse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Code2 size={16} />
                  View on GitHub
                </a>
                <a href="https://www.linkedin.com/in/fatimazahra0100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <ExternalLink size={16} />
                  Connect on LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden flex items-center justify-center w-9 h-9 text-gray-600"
        >
          {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileNavOpen && (
        <div className="lg:hidden border-t border-gray-100 py-3 px-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileNavOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg mb-1 ${
                location.pathname === link.to
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2">
            <a href="https://github.com/Fatima-tu-Zahraa/jobpulse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              <Code2 size={16} />
              View on GitHub
            </a>
            <a href="https://www.linkedin.com/in/fatimazahra0100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
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