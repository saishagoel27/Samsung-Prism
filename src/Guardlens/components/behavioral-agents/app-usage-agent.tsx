"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, BarChart3, AlertCircle } from "lucide-react"

export function AppUsageAgent() {
  const [usageData, setUsageData] = useState({
    sessionDuration: 78,
    navigationPattern: 85,
    featureUsage: 92,
    timeDistribution: 67,
  })
  const [suspiciousActivity, setSuspiciousActivity] = useState(8)
  const [topApps, setTopApps] = useState([
    { name: "Banking", usage: 45, risk: "low" },
    { name: "Social", usage: 32, risk: "medium" },
    { name: "Email", usage: 28, risk: "low" },
    { name: "Shopping", usage: 15, risk: "high" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setUsageData((prev) => ({
        sessionDuration: Math.max(60, Math.min(100, prev.sessionDuration + (Math.random() - 0.5) * 10)),
        navigationPattern: Math.max(70, Math.min(100, prev.navigationPattern + (Math.random() - 0.5) * 8)),
        featureUsage: Math.max(80, Math.min(100, prev.featureUsage + (Math.random() - 0.5) * 6)),
        timeDistribution: Math.max(50, Math.min(90, prev.timeDistribution + (Math.random() - 0.5) * 12)),
      }))
      setSuspiciousActivity(Math.max(0, Math.min(100, suspiciousActivity + (Math.random() - 0.5) * 25)))

      // Update app usage
      setTopApps((prev) =>
        prev.map((app) => ({
          ...app,
          usage: Math.max(10, Math.min(60, app.usage + (Math.random() - 0.5) * 8)),
        })),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [suspiciousActivity])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-accent" />
            <span>App Usage Agent</span>
          </div>
          <Badge variant={suspiciousActivity > 20 ? "destructive" : "outline"} className="text-xs">
            {suspiciousActivity > 20 ? "Irregular" : "Normal"}
          </Badge>
        </CardTitle>
        <CardDescription>Tracking application usage patterns and navigation behavior</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Session Duration</span>
              <span className="text-sm font-medium">{usageData.sessionDuration.toFixed(0)}%</span>
            </div>
            <Progress value={usageData.sessionDuration} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Navigation Pattern</span>
              <span className="text-sm font-medium">{usageData.navigationPattern.toFixed(0)}%</span>
            </div>
            <Progress value={usageData.navigationPattern} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Feature Usage</span>
              <span className="text-sm font-medium">{usageData.featureUsage.toFixed(0)}%</span>
            </div>
            <Progress value={usageData.featureUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Time Distribution</span>
              <span className="text-sm font-medium">{usageData.timeDistribution.toFixed(0)}%</span>
            </div>
            <Progress value={usageData.timeDistribution} className="h-2" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">App Categories</h4>
          <div className="space-y-3">
            {topApps.map((app, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{app.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      app.risk === "high"
                        ? "text-destructive border-destructive"
                        : app.risk === "medium"
                          ? "text-accent border-accent"
                          : "text-green-600 border-green-600"
                    }`}
                  >
                    {app.risk}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={app.usage} className="w-16 h-2" />
                  <span className="text-xs text-muted-foreground w-8">{app.usage.toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Suspicious Activity</span>
            {suspiciousActivity > 20 && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Alert
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Progress
              value={suspiciousActivity}
              className={`flex-1 h-3 ${suspiciousActivity > 20 ? "[&>div]:bg-destructive" : "[&>div]:bg-green-500"}`}
            />
            <span className="text-sm font-medium w-12">{suspiciousActivity.toFixed(0)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>24/7</span>
          </div>
          <div className="flex items-center space-x-1">
            <BarChart3 className="h-3 w-3" />
            <span>91% Accuracy</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>Monitoring</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
