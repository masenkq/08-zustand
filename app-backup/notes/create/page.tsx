'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateNotePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    router.push('/notes/filter/All')
    setIsLoading(false)
  }

  return (
    <div>
      <h1>Create New Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" required />
        </div>
        <div>
          <label>Content</label>
          <textarea required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  )
}