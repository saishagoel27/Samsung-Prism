"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, Settings, Target, TrendingDown } from "lucide-react"

interface ThresholdConfig {
  name: string
  current: number
  recommended: number
  sensitivity: "low" | "medium" | "high"
  detections: number
  falsePositives: number
}

export function AnomalyThreshold() {
  const [thresholds, setThresholds] = useState<ThresholdConfig[]>([
    { name: "Typing Anomaly", current: 75, recommended: 78, sensitivity: "medium", detections: 12, falsePositives: 2 },
    { name: "Touch Deviation", current: 65, recommended: 70, sensitivity: "high", detections: 8, falsePositives: 1 },
    { name: "Usage Pattern", current: 80, recommended: 82, sensitivity: "low", detections: 5, falsePositives: 0 },
    { name: "Movement Alert", current: 70, recommended: 68, sensitivity: "medium", detections: 15, falsePositives: 3 },
    { name: "Fusion Score", current: 85, recommended: 87, sensitivity: "low", detections: 3, falsePositives: 0 },
  ])

  const [globalSensitivity, setGlobalSensitivity] = useState([75])
  const [adaptiveMode, setAdaptiveMode] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (adaptiveMode) {
        setThresholds((prev) =>
          prev.map((threshold) => ({
            ...threshold,
            recommended: Math.max(50, Math.min(95, threshold.recommended + (Math.random() - 0.5) * 4)),
            detections: Math.max(0, threshold.detections + (Math.random() > 0.7 ? 1 : 0)),
            falsePositives: Math.max(0, threshold.falsePositives + (Math.random() > 0.9 ? 1 : 0)),
          })),
        )
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [adaptiveMode])

  const updateThreshold = (index: number, newValue: number) => {
    setThresholds((prev) =>
      prev.map((threshold, i) =>
        i === index
          ? {
              ...threshold,
              current: newValue,
              sensitivity: newValue < 60 ? "high" : newValue < 80 ? "medium" : "low",
            }
          : threshold,
      ),
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-accent" />
            <span>Anomaly Thresholds</span>
          </div>
          <Badge variant={adaptiveMode ? "default" : "outline"} className="text-xs">
            {adaptiveMode ? "Adaptive" : "Manual"}
          </Badge>
        </CardTitle>
        <CardDescription>Configure detection sensitivity and threshold management</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Global Sensitivity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Global Sensitivity</span>
            <span className="text-sm text-muted-foreground">{globalSensitivity[0]}%</span>
          </div>
          <Slider
            value={globalSensitivity}
            onValueChange={setGlobalSensitivity}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>

        {/* Individual Thresholds */}
        <div className="border-t pt-4 space-y-4">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Target className="h-4 w-4 text-accent" />
            <span>Detection Thresholds</span>
          </h4>
          {thresholds.map((threshold, index) => (
            <div key={index} className="space-y-3 p-3 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{threshold.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      threshold.sensitivity === "high"
                        ? "text-destructive border-destructive"
                        : threshold.sensitivity === "medium"
                          ? "text-accent border-accent"
                          : "text-green-600 border-green-600"
                    }`}
                  >
                    {threshold.sensitivity}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="text-center">
                    <div className="font-medium">{threshold.detections}</div>
                    <div className="text-muted-foreground">Detections</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-destructive">{threshold.falsePositives}</div>
                    <div className="text-muted-foreground">False+</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Current: {threshold.current}%</span>
                  <span className="text-muted-foreground">Recommended: {threshold.recommended}%</span>
                </div>
                <Slider
                  value={[threshold.current]}
                  onValueChange={(value) => updateThreshold(index, value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <Progress value={threshold.current} className="flex-1 h-2 mr-2" />
                  {Math.abs(threshold.current - threshold.recommended) > 5 && (
                    <Badge variant="outline" className="text-xs text-accent border-accent">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Adjust
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Threshold Impact */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <span>Impact Analysis</span>
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Detection Rate</span>
                <span className="text-sm font-medium">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">False Positive Rate</span>
                <span className="text-sm font-medium">2.1%</span>
              </div>
              <Progress value={2.1} className="h-2 [&>div]:bg-destructive" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <button
              onClick={() => setAdaptiveMode(!adaptiveMode)}
              className="p-2 text-xs border rounded hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {adaptiveMode ? "Disable" : "Enable"} Adaptive
            </button>
            <button className="p-2 text-xs border rounded hover:bg-accent hover:text-accent-foreground transition-colors">
              Reset to Default
            </button>
            <button className="p-2 text-xs border rounded hover:bg-accent hover:text-accent-foreground transition-colors">
              Apply Recommended
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
