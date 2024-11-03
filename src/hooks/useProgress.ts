import { useState, useEffect } from 'react'

interface Progress {
  activeApplications: number
  interviewsScheduled: number
  resumeViews: number
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({
    activeApplications: 0,
    interviewsScheduled: 0,
    resumeViews: 0
  })

  useEffect(() => {
    // Fetch progress from API
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress')
        const data = await response.json()
        setProgress(data)
      } catch (error) {
        console.error('Failed to fetch progress:', error)
      }
    }

    fetchProgress()
  }, [])

  return progress
} 