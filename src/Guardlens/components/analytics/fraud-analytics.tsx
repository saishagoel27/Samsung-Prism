"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, Target, BarChart3, Calendar, Download } from "lucide-react"

interface FraudTrend {
  date: string
  detections: number
  falsePositives: number
  accuracy: number
  severity: number
}

interface ThreatCategory {
  name: string
  count: number
  percentage: number
  color: string
}

export function FraudAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")
  const [fraudTrends, setFraudTrends] = useState<FraudTrend[]>([
    { date: "2024-01-15", detections: 23, falsePositives: 2, accuracy: 91.3, severity: 35 },
    { date: "2024-01-16", detections: 31, falsePositives: 1, accuracy: 96.8, severity: 42 },
    { date: "2024-01-17", detections: 18, falsePositives: 3, accuracy: 83.3, severity: 28 },
    { date: "2024-01-18", detections: 45, falsePositives: 2, accuracy: 95.6, severity: 67 },
    { date: "2024-01-19", detections: 27, falsePositives: 1, accuracy: 96.3, severity: 38 },
    { date: "2024-01-20", detections: 39, falsePositives: 4, accuracy: 89.7, severity: 55 },
    { date: "2024-01-21", detections: 33, falsePositives: 2, accuracy: 93.9, severity: 48 },
  ])

  const [threatCategories, setThreatCategories] = useState<ThreatCategory[]>([
    { name: "Account Takeover", count: 45, percentage: 32, color: "#8b5cf6" },
    { name: "Bot Activity", count: 38, percentage: 27, color: "#ef4444" },
    { name: "Identity Theft", count: 29, percentage: 21, color: "#f97316" },
    { name: "Payment Fraud", count: 18, percentage: 13, color: "#eab308" },
    { name: "Social Engineering", count: 10, percentage: 7, color: "#22c55e" },
  ])

  const [performanceMetrics, setPerformanceMetrics] = useState({
    totalDetections: 216,
    accuracyRate: 94.2,
    falsePositiveRate: 2.1,
    averageResponseTime: 12,
    riskReduction: 87,
    costSavings: 2.4,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Update fraud trends with new data point
      setFraudTrends((prev) => {
        const newDate = new Date()
        newDate.setDate(newDate.getDate())
        const newPoint: FraudTrend = {
          date: newDate.toISOString().split("T")[0],
          detections: Math.floor(Math.random() * 30) + 15,
          falsePositives: Math.floor(Math.random() * 4),
          accuracy: Math.floor(Math.random() * 15) + 85,
          severity: Math.floor(Math.random() * 40) + 20,
        }
        return [...prev.slice(1), newPoint]
      })

      // Update threat categories
      setThreatCategories((prev) =>
        prev.map((category) => ({
          ...category,
          count: Math.max(5, category.count + Math.floor((Math.random() - 0.5) * 6)),
        })),
      )

      // Update performance metrics
      setPerformanceMetrics((prev) => ({
        ...prev,
        totalDetections: prev.totalDetections + (Math.random() > 0.7 ? 1 : 0),
        accuracyRate: Math.max(90, Math.min(98, prev.accuracyRate + (Math.random() - 0.5) * 2)),
        falsePositiveRate: Math.max(1, Math.min(5, prev.falsePositiveRate + (Math.random() - 0.5) * 0.5)),
        averageResponseTime: Math.max(8, Math.min(20, prev.averageResponseTime + (Math.random() - 0.5) * 3)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            <span>Fraud Analytics</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Last {timeRange}
            </Badge>
            <Badge variant="outline" className="text-accent border-accent cursor-pointer">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>Comprehensive fraud detection analytics and trend analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{performanceMetrics.totalDetections}</div>
                <div className="text-xs text-muted-foreground">Total Detections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{performanceMetrics.accuracyRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">
                  {performanceMetrics.falsePositiveRate.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">False Positives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{performanceMetrics.averageResponseTime}ms</div>
                <div className="text-xs text-muted-foreground">Avg Response</div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fraudTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="detections"
                    stackId="1"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.6}
                    name="Detections"
                  />
                  <Area
                    type="monotone"
                    dataKey="falsePositives"
                    stackId="2"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.6}
                    name="False Positives"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={threatCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {threatCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Threat Breakdown</h4>
                {threatCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{category.count}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium flex items-center space-x-2">
                  <Target className="h-4 w-4 text-accent" />
                  <span>Key Performance Indicators</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Risk Reduction</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{performanceMetrics.riskReduction}%</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Cost Savings</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">${performanceMetrics.costSavings}M</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Detection Rate</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">96.8%</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fraudTrends.slice(-5)}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="accuracy" fill="hsl(var(--accent))" name="Accuracy %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
