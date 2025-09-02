"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, ArrowLeft, Zap, CheckCircle } from "lucide-react"
import ModelTraining from "@/components/ml-models/model-training"

export default function ModelsPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)

  useEffect(() => {
    // Simulate monitoring state from parent
    const interval = setInterval(() => {
      setIsMonitoring((prev) => !prev)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <header className="border-b bg-gradient-to-r from-white/90 via-blue-50/90 to-indigo-50/90 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-indigo-900/90 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:shadow-md transition-all duration-300 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                  <Brain className="h-12 w-12 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text relative z-10" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    ML Models
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    Continuous Learning & Behavioral Adaptation
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                On-Device Training
              </Badge>
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-md"
              >
                <Zap className="h-3 w-3 mr-1" />
                Real-time Adaptation
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <ModelTraining isMonitoring={isMonitoring} />
      </div>
    </div>
  )
}
