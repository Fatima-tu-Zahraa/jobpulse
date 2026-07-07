import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Lightbulb } from 'lucide-react'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

function JDAnalyzer() {
  const [jobDescription, setJobDescription] = useState('')
  const [mySkills, setMySkills] = useState('')
  const [matchingSkills, setMatchingSkills] = useState([])
  const [missingSkills, setMissingSkills] = useState([])
  const [matchPercentage, setMatchPercentage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function parseResult(text) {
    const matchingMatch = text.match(/MATCHING SKILLS:\s*(.+)/i)
    const missingMatch = text.match(/MISSING SKILLS:\s*(.+)/i)
    const percentMatch = text.match(/MATCH PERCENTAGE:\s*(\d+)/i)

    if (!matchingMatch && !missingMatch && !percentMatch) {
      setError('Could not read the AI response. Please try again.')
      return false
    }

    const matching = matchingMatch
      ? matchingMatch[1].split(',').map((s) => s.trim()).filter(Boolean)
      : []
    const missing = missingMatch
      ? missingMatch[1].split(',').map((s) => s.trim()).filter(Boolean)
      : []
    const percent = percentMatch ? parseInt(percentMatch[1]) : null

    setMatchingSkills(matching)
    setMissingSkills(missing)
    setMatchPercentage(percent)
    return true
  }

  async function handleAnalyze() {
    if (!jobDescription.trim() || !mySkills.trim()) {
      setError('Please fill both fields')
      return
    }

    setError('')
    setIsLoading(true)
    setMatchingSkills([])
    setMissingSkills([])
    setMatchPercentage(null)

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.2,
        },
      })

      const prompt = `You are a career assistant. Compare the candidate's skills with the job description below.

Job Description:
${jobDescription}

Candidate's Skills:
${mySkills}

Respond in this exact format, with no extra text:
MATCHING SKILLS: (comma-separated list of skills from the candidate that match the job)
MISSING SKILLS: (comma-separated list of important skills in the job description that the candidate doesn't have)
MATCH PERCENTAGE: (a single number 0-100 estimating overall fit)`

      const response = await model.generateContent(prompt)
      const text = response.response.text()
      parseResult(text)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          AI Job Description Analyzer
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Paste a job description and your skills to see how well you match
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-48 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Skills
                </label>
                <textarea
                  value={mySkills}
                  onChange={(e) => setMySkills(e.target.value)}
                  placeholder="e.g. React, JavaScript, Tailwind CSS, Git..."
                  className="w-full h-48 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="mt-4 bg-blue-600 text-white text-sm rounded-lg px-5 py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Analyzing... (this may take 10-15 seconds)' : 'Analyze Match'}
            </button>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            {matchPercentage !== null && (
              <div className="bg-white rounded-xl p-6 mt-6 shadow-sm border border-gray-200">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Overall Match
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {matchPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${matchPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    ✅ Matching Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    ⚠️ Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 h-fit">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-800">
                Tips for Better Results
              </h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Paste the full job description, including requirements</li>
              <li>List your skills separated by commas</li>
              <li>Include both technical and soft skills</li>
              <li>Re-run the analysis after updating your skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JDAnalyzer