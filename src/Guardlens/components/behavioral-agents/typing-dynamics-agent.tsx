"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Target, TrendingUp } from "lucide-react"

export function TypingDynamicsAgent() {
  const [keystrokeData, setKeystrokeData] = useState({
    avgSpeed: 85,
    rhythm: 92,
    pressure: 78,
    dwellTime: 88,
  })
  const [anomalyScore, setAnomalyScore] = useState(5)
  const [isLearning, setIsLearning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setKeystrokeData((prev) => ({
        avgSpeed: Math.max(60, Math.min(120, prev.avgSpeed + (Math.random() - 0.5) * 8)),
        rhythm: Math.max(70, Math.min(100, prev.rhythm + (Math.random() - 0.5) * 6)),
        pressure: Math.max(60, Math.min(100, prev.pressure + (Math.random() - 0.5) * 10)),
        dwellTime: Math.max(70, Math.min(100, prev.dwellTime + (Math.random() - 0.5) * 7)),
      }))
      setAnomalyScore(Math.max(0, Math.min(100, anomalyScore + (Math.random() - 0.5) * 15)))
      setIsLearning(Math.random() > 0.7)
    }, 2000)

    return () => clearInterval(interval)
  }, [anomalyScore])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-accent" />
            <span>Typing Dynamics Agent</span>
          </div>
          <Badge variant={anomalyScore > 30 ? "destructive" : "outline"} className="text-xs">
            {anomalyScore > 30 ? "Anomaly" : "Normal"}
          </Badge>
        </CardTitle>
        <CardDescription>Analyzing keystroke patterns, timing, and pressure dynamics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Typing Speed</span>
              <span className="text-sm font-medium">{keystrokeData.avgSpeed.toFixed(0)} WPM</span>
            </div>
            <Progress value={(keystrokeData.avgSpeed / 120) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rhythm Score</span>
              <span className="text-sm font-medium">{keystrokeData.rhythm.toFixed(0)}%</span>
            </div>
            <Progress value={keystrokeData.rhythm} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Key Pressure</span>
              <span className="text-sm font-medium">{keystrokeData.pressure.toFixed(0)}%</span>
            </div>
            <Progress value={keystrokeData.pressure} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Dwell Time</span>
              <span className="text-sm font-medium">{keystrokeData.dwellTime.toFixed(0)}%</span>
            </div>
            <Progress value={keystrokeData.dwellTime} className="h-2" />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Anomaly Detection</span>
            {isLearning && (
              <Badge variant="outline" className="text-accent border-accent">
                <TrendingUp className="h-3 w-3 mr-1" />
                Learning
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Progress
              value={anomalyScore}
              className={`flex-1 h-3 ${anomalyScore > 30 ? "[&>div]:bg-destructive" : "[&>div]:bg-green-500"}`}
            />
            <span className="text-sm font-medium w-12">{anomalyScore.toFixed(0)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Real-time</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-3 w-3" />
            <span>94% Accuracy</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity className="h-3 w-3" />
            <span>Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
