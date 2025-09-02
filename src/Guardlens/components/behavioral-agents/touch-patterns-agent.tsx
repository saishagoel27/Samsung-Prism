"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Smartphone, MapPin, Zap, Shield } from "lucide-react"

export function TouchPatternsAgent() {
  const [touchData, setTouchData] = useState({
    swipeVelocity: 76,
    tapPressure: 82,
    gestureAccuracy: 91,
    touchArea: 68,
  })
  const [threatLevel, setThreatLevel] = useState(12)
  const [recentGestures, setRecentGestures] = useState([
    { type: "swipe", confidence: 95, timestamp: "now" },
    { type: "tap", confidence: 88, timestamp: "2s ago" },
    { type: "pinch", confidence: 92, timestamp: "5s ago" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTouchData((prev) => ({
        swipeVelocity: Math.max(50, Math.min(100, prev.swipeVelocity + (Math.random() - 0.5) * 12)),
        tapPressure: Math.max(60, Math.min(100, prev.tapPressure + (Math.random() - 0.5) * 8)),
        gestureAccuracy: Math.max(80, Math.min(100, prev.gestureAccuracy + (Math.random() - 0.5) * 5)),
        touchArea: Math.max(50, Math.min(90, prev.touchArea + (Math.random() - 0.5) * 10)),
      }))
      setThreatLevel(Math.max(0, Math.min(100, threatLevel + (Math.random() - 0.5) * 20)))

      // Update recent gestures
      if (Math.random() > 0.6) {
        const gestures = ["swipe", "tap", "pinch", "scroll", "long-press"]
        const newGesture = {
          type: gestures[Math.floor(Math.random() * gestures.length)],
          confidence: Math.floor(Math.random() * 20) + 80,
          timestamp: "now",
        }
        setRecentGestures((prev) => [newGesture, ...prev.slice(0, 2)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [threatLevel])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-accent" />
            <span>Touch Patterns Agent</span>
          </div>
          <Badge variant={threatLevel > 25 ? "destructive" : "outline"} className="text-xs">
            {threatLevel > 25 ? "Suspicious" : "Verified"}
          </Badge>
        </CardTitle>
        <CardDescription>Monitoring touch gestures, pressure, and interaction patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Swipe Velocity</span>
              <span className="text-sm font-medium">{touchData.swipeVelocity.toFixed(0)}%</span>
            </div>
            <Progress value={touchData.swipeVelocity} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tap Pressure</span>
              <span className="text-sm font-medium">{touchData.tapPressure.toFixed(0)}%</span>
            </div>
            <Progress value={touchData.tapPressure} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gesture Accuracy</span>
              <span className="text-sm font-medium">{touchData.gestureAccuracy.toFixed(0)}%</span>
            </div>
            <Progress value={touchData.gestureAccuracy} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Touch Area</span>
              <span className="text-sm font-medium">{touchData.touchArea.toFixed(0)}%</span>
            </div>
            <Progress value={touchData.touchArea} className="h-2" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Recent Gestures</h4>
          <div className="space-y-2">
            {recentGestures.map((gesture, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="capitalize">{gesture.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{gesture.confidence}%</span>
                  <span className="text-muted-foreground">{gesture.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Threat Assessment</span>
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Shield className="h-3 w-3 mr-1" />
              Protected
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Progress
              value={threatLevel}
              className={`flex-1 h-3 ${threatLevel > 25 ? "[&>div]:bg-destructive" : "[&>div]:bg-green-500"}`}
            />
            <span className="text-sm font-medium w-12">{threatLevel.toFixed(0)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>Live</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>87% Match</span>
          </div>
          <div className="flex items-center space-x-1">
            <Smartphone className="h-3 w-3" />
            <span>Mobile</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
