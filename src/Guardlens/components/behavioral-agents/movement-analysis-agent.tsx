"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Navigation, Compass, Wifi } from "lucide-react"

export function MovementAnalysisAgent() {
  const [movementData, setMovementData] = useState({
    walkingPattern: 89,
    deviceOrientation: 76,
    locationConsistency: 94,
    motionStability: 82,
  })
  const [mobilityScore, setMobilityScore] = useState(18)
  const [currentContext, setCurrentContext] = useState({
    environment: "Indoor",
    activity: "Stationary",
    confidence: 92,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMovementData((prev) => ({
        walkingPattern: Math.max(70, Math.min(100, prev.walkingPattern + (Math.random() - 0.5) * 8)),
        deviceOrientation: Math.max(60, Math.min(100, prev.deviceOrientation + (Math.random() - 0.5) * 12)),
        locationConsistency: Math.max(80, Math.min(100, prev.locationConsistency + (Math.random() - 0.5) * 6)),
        motionStability: Math.max(70, Math.min(100, prev.motionStability + (Math.random() - 0.5) * 10)),
      }))
      setMobilityScore(Math.max(0, Math.min(100, mobilityScore + (Math.random() - 0.5) * 30)))

      // Update context
      const environments = ["Indoor", "Outdoor", "Vehicle", "Transit"]
      const activities = ["Stationary", "Walking", "Running", "Sitting"]
      if (Math.random() > 0.7) {
        setCurrentContext({
          environment: environments[Math.floor(Math.random() * environments.length)],
          activity: activities[Math.floor(Math.random() * activities.length)],
          confidence: Math.floor(Math.random() * 20) + 80,
        })
      }
    }, 3500)

    return () => clearInterval(interval)
  }, [mobilityScore])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span>Movement Analysis Agent</span>
          </div>
          <Badge variant={mobilityScore > 30 ? "destructive" : "outline"} className="text-xs">
            {mobilityScore > 30 ? "Anomalous" : "Expected"}
          </Badge>
        </CardTitle>
        <CardDescription>Analyzing device movement, orientation, and mobility patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Walking Pattern</span>
              <span className="text-sm font-medium">{movementData.walkingPattern.toFixed(0)}%</span>
            </div>
            <Progress value={movementData.walkingPattern} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Device Orientation</span>
              <span className="text-sm font-medium">{movementData.deviceOrientation.toFixed(0)}%</span>
            </div>
            <Progress value={movementData.deviceOrientation} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Location Consistency</span>
              <span className="text-sm font-medium">{movementData.locationConsistency.toFixed(0)}%</span>
            </div>
            <Progress value={movementData.locationConsistency} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Motion Stability</span>
              <span className="text-sm font-medium">{movementData.motionStability.toFixed(0)}%</span>
            </div>
            <Progress value={movementData.motionStability} className="h-2" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Current Context</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Navigation className="h-4 w-4 text-accent" />
                <span className="text-sm">Environment</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{currentContext.environment}</span>
                <Badge variant="outline" className="text-xs">
                  {currentContext.confidence}%
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Compass className="h-4 w-4 text-accent" />
                <span className="text-sm">Activity</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{currentContext.activity}</span>
                <Badge variant="outline" className="text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Mobility Anomaly</span>
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Wifi className="h-3 w-3 mr-1" />
              Tracking
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Progress
              value={mobilityScore}
              className={`flex-1 h-3 ${mobilityScore > 30 ? "[&>div]:bg-destructive" : "[&>div]:bg-green-500"}`}
            />
            <span className="text-sm font-medium w-12">{mobilityScore.toFixed(0)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>Adaptive</span>
          </div>
          <div className="flex items-center space-x-1">
            <Navigation className="h-3 w-3" />
            <span>89% Match</span>
          </div>
          <div className="flex items-center space-x-1">
            <Compass className="h-3 w-3" />
            <span>GPS+IMU</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
