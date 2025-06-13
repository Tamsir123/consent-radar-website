"use client"

import { useState } from "react"

export default function TestPage() {
  const [message, setMessage] = useState("")

  const testFunction = () => {
    console.log("test")
  }

  return (
    <main className="min-h-screen">
      <div>Test content</div>
    </main>
  )
}
