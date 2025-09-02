"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Target, CheckCircle, Clock } from "lucide-react"

interface DetectionEvent {
  id: string
  timestamp: string
  type: "anomaly" | "fraud" | "normal"
  confidence: number
  source: string
  description: string
  riskScore: number
}

export function RealTimeDetector() {
  const [isProcessing, setIsProcessing] = useState(true)
  const [processingSpeed, setProcessingSpeed] = useState(847)
  const [detectionLatency, setDetectionLatency] = useState(12)
  const [recentEvents, setRecentEvents] = useState<DetectionEvent[]>([
    {
      id: "1",
      timestamp: "14:32:15",
      type: "normal",
      confidence: 94,
      source: "Typing Agent",
      description: "Normal keystroke pattern",
      riskScore: 5,
    },
    {
      id: "2",
      timestamp: "14:32:12",
      type: "anomaly",
      confidence: 78,
      source: "Touch Agent",
      description: "Unusual swipe velocity",
      riskScore: 35,
    },
    {
      id: "3",
      timestamp: "14:32:08",
      type: "fraud",
      confidence: 92,
      source: "Fusion Agent",
      description: "Potential account takeover",
      riskScore: 87,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingSpeed(Math.floor(Math.random() * 200) + 750)
      setDetectionLatency(Math.floor(Math.random() * 8) + 8)
      setIsProcessing(Math.random() > 0.3)

      // Add new detection event occasionally
      if (Math.random() > 0.7) {
        const eventTypes: ("anomaly" | "fraud" | "normal")[] = ["normal", "normal", "normal", "anomaly", "fraud"]
        const sources = ["Typing Agent", "Touch Agent", "Usage Agent", "Movement Agent", "Fusion Agent"]
        const descriptions = {
          normal: ["Normal behavior pattern", "Expected user activity", "Baseline interaction"],
          anomaly: ["Unusual pattern detected", "Behavioral deviation", "Irregular activity"],
          fraud: ["Potential fraud attempt", "High-risk behavior", "Suspicious activity"],
        }

        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const newEvent: DetectionEvent = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          type,
          confidence: Math.floor(Math.random() * 30) + (type === "fraud" ? 70 : type === "anomaly" ? 60 : 80),
          source: sources[Math.floor(Math.random() * sources.length)],
          description: descriptions[type][Math.floor(Math.random() * descriptions[type].length)],
          riskScore:
            type === "fraud"
              ? Math.floor(Math.random() * 30) + 70
              : type === "anomaly"
                ? Math.floor(Math.random() * 40) + 30
                : Math.floor(Math.random() * 20) + 5,
        }

        setRecentEvents((prev) => [newEvent, ...prev.slice(0, 4)])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-accent" />
            <span>Real-time Detection Engine</span>
          </div>
          <Badge variant={isProcessing ? "default" : "outline"} className="text-xs">
            {isProcessing ? (
              <>
                <Brain className="h-3 w-3 mr-1 animate-pulse" />
                Processing
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Idle
              </>
            )}
          </Badge>
        </CardTitle>
        <CardDescription>AI-powered behavioral analysis with sub-second response times</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Processing Speed</span>
              <span className="text-sm font-medium">{processingSpeed} ops/sec</span>
            </div>
            <Progress value={(processingSpeed / 1000) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Detection Latency</span>
              <span className="text-sm font-medium">{detectionLatency}ms</span>
            </div>
            <Progress value={100 - (detectionLatency / 50) * 100} className="h-2" />
          </div>
        </div>

        {/* Recent Detection Events */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 flex items-center space-x-2">
            <Target className="h-4 w-4 text-accent" />
            <span>Live Detection Stream</span>
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border text-xs ${
                  event.type === "fraud"
                    ? "border-destructive bg-destructive/5"
                    : event.type === "anomaly"
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        event.type === "fraud"
                          ? "bg-destructive"
                          : event.type === "anomaly"
                            ? "bg-accent"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <span className="font-medium">{event.source}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        event.type === "fraud"
                          ? "text-destructive border-destructive"
                          : event.type === "anomaly"
                            ? "text-accent border-accent"
                            : "text-green-600 border-green-600"
                      }`}
                    >
                      {event.confidence}%
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{event.timestamp}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-1">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Risk Score:</span>
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={event.riskScore}
                      className={`w-16 h-1 ${
                        event.riskScore > 70
                          ? "[&>div]:bg-destructive"
                          : event.riskScore > 30
                            ? "[&>div]:bg-accent"
                            : "[&>div]:bg-green-500"
                      }`}
                    />
                    <span className="font-medium">{event.riskScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">99.7%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">5</div>
              <div className="text-xs text-muted-foreground">Active Models</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">Real-time</div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
