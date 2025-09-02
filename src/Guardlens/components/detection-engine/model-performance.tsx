"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Brain, TrendingUp } from "lucide-react"

interface ModelMetrics {
  name: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  status: "training" | "active" | "updating"
}

export function ModelPerformance() {
  const [models, setModels] = useState<ModelMetrics[]>([
    { name: "Typing Classifier", accuracy: 94.2, precision: 92.8, recall: 95.1, f1Score: 93.9, status: "active" },
    { name: "Touch Analyzer", accuracy: 87.5, precision: 89.2, recall: 85.7, f1Score: 87.4, status: "active" },
    { name: "Usage Predictor", accuracy: 91.3, precision: 90.1, recall: 92.6, f1Score: 91.3, status: "updating" },
    { name: "Movement Detector", accuracy: 89.7, precision: 88.4, recall: 91.2, f1Score: 89.8, status: "active" },
    { name: "Fusion Network", accuracy: 96.1, precision: 95.8, recall: 96.4, f1Score: 96.1, status: "training" },
  ])

  const [performanceData, setPerformanceData] = useState([
    { time: "14:25", accuracy: 94, latency: 15 },
    { time: "14:26", accuracy: 95, latency: 12 },
    { time: "14:27", accuracy: 93, latency: 18 },
    { time: "14:28", accuracy: 96, latency: 11 },
    { time: "14:29", accuracy: 94, latency: 14 },
    { time: "14:30", accuracy: 97, latency: 9 },
    { time: "14:31", accuracy: 95, latency: 13 },
    { time: "14:32", accuracy: 96, latency: 10 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Update model metrics
      setModels((prev) =>
        prev.map((model) => ({
          ...model,
          accuracy: Math.max(85, Math.min(98, model.accuracy + (Math.random() - 0.5) * 2)),
          precision: Math.max(85, Math.min(98, model.precision + (Math.random() - 0.5) * 2)),
          recall: Math.max(85, Math.min(98, model.recall + (Math.random() - 0.5) * 2)),
          f1Score: Math.max(85, Math.min(98, model.f1Score + (Math.random() - 0.5) * 2)),
          status: Math.random() > 0.9 ? (Math.random() > 0.5 ? "training" : "updating") : "active",
        })),
      )

      // Update performance chart
      setPerformanceData((prev) => {
        const newTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
        const newPoint = {
          time: newTime,
          accuracy: Math.floor(Math.random() * 8) + 92,
          latency: Math.floor(Math.random() * 10) + 8,
        }
        return [...prev.slice(1), newPoint]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-accent" />
          <span>Model Performance Monitor</span>
        </CardTitle>
        <CardDescription>Real-time AI model metrics and performance tracking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Status Grid */}
        <div className="space-y-3">
          {models.map((model, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      model.status === "active"
                        ? "bg-green-500"
                        : model.status === "training"
                          ? "bg-accent animate-pulse"
                          : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="font-medium text-sm">{model.name}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    model.status === "active"
                      ? "text-green-600 border-green-600"
                      : model.status === "training"
                        ? "text-accent border-accent"
                        : "text-yellow-600 border-yellow-600"
                  }`}
                >
                  {model.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="text-center">
                  <div className="font-medium">{model.accuracy.toFixed(1)}%</div>
                  <div className="text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{model.f1Score.toFixed(1)}%</div>
                  <div className="text-muted-foreground">F1</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span>Real-time Performance</span>
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
                  name="Accuracy %"
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 3 }}
                  name="Latency (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-accent">94.8%</div>
              <div className="text-xs text-muted-foreground">Avg Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">11ms</div>
              <div className="text-xs text-muted-foreground">Avg Latency</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">5/5</div>
              <div className="text-xs text-muted-foreground">Models Online</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">99.2%</div>
              <div className="text-xs text-muted-foreground">Reliability</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
