"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, Cpu, HardDrive, Wifi, Zap, TrendingUp } from "lucide-react"

interface SystemMetric {
  timestamp: string
  cpu: number
  memory: number
  latency: number
  throughput: number
}

export function SystemPerformance() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { timestamp: "14:25", cpu: 23, memory: 45, latency: 12, throughput: 847 },
    { timestamp: "14:26", cpu: 28, memory: 48, latency: 15, throughput: 823 },
    { timestamp: "14:27", cpu: 31, memory: 52, latency: 11, throughput: 891 },
    { timestamp: "14:28", cpu: 26, memory: 47, latency: 13, throughput: 856 },
    { timestamp: "14:29", cpu: 34, memory: 55, latency: 16, throughput: 798 },
    { timestamp: "14:30", cpu: 29, memory: 49, latency: 10, throughput: 912 },
    { timestamp: "14:31", cpu: 25, memory: 44, latency: 14, throughput: 834 },
    { timestamp: "14:32", cpu: 32, memory: 51, latency: 12, throughput: 867 },
  ])

  const [currentMetrics, setCurrentMetrics] = useState({
    cpuUsage: 29,
    memoryUsage: 51,
    diskUsage: 34,
    networkLatency: 12,
    throughput: 867,
    uptime: 99.7,
  })

  const [agentPerformance, setAgentPerformance] = useState([
    { name: "Typing Agent", cpu: 15, memory: 28, accuracy: 94.2, status: "optimal" },
    { name: "Touch Agent", cpu: 18, memory: 32, accuracy: 87.5, status: "optimal" },
    { name: "Usage Agent", cpu: 22, memory: 35, accuracy: 91.3, status: "good" },
    { name: "Movement Agent", cpu: 16, memory: 29, accuracy: 89.7, status: "optimal" },
    { name: "Fusion Agent", cpu: 25, memory: 42, accuracy: 96.1, status: "optimal" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Update system metrics
      setCurrentMetrics((prev) => ({
        cpuUsage: Math.max(15, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        diskUsage: Math.max(20, Math.min(70, prev.diskUsage + (Math.random() - 0.5) * 5)),
        networkLatency: Math.max(8, Math.min(25, prev.networkLatency + (Math.random() - 0.5) * 4)),
        throughput: Math.max(700, Math.min(1000, prev.throughput + (Math.random() - 0.5) * 50)),
        uptime: Math.max(99, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1)),
      }))

      // Add new data point to metrics
      setSystemMetrics((prev) => {
        const newTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
        const newPoint: SystemMetric = {
          timestamp: newTime,
          cpu: currentMetrics.cpuUsage,
          memory: currentMetrics.memoryUsage,
          latency: currentMetrics.networkLatency,
          throughput: currentMetrics.throughput,
        }
        return [...prev.slice(1), newPoint]
      })

      // Update agent performance
      setAgentPerformance((prev) =>
        prev.map((agent) => ({
          ...agent,
          cpu: Math.max(10, Math.min(40, agent.cpu + (Math.random() - 0.5) * 6)),
          memory: Math.max(20, Math.min(60, agent.memory + (Math.random() - 0.5) * 8)),
          accuracy: Math.max(85, Math.min(98, agent.accuracy + (Math.random() - 0.5) * 2)),
          status: agent.cpu < 30 && agent.memory < 50 ? "optimal" : agent.cpu < 40 ? "good" : "warning",
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [currentMetrics.cpuUsage, currentMetrics.memoryUsage, currentMetrics.networkLatency, currentMetrics.throughput])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-accent" />
          <span>System Performance</span>
        </CardTitle>
        <CardDescription>Real-time system resource monitoring and performance analytics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current System Status */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">CPU Usage</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.cpuUsage}%</span>
            </div>
            <Progress
              value={currentMetrics.cpuUsage}
              className={`h-2 ${currentMetrics.cpuUsage > 70 ? "[&>div]:bg-destructive" : currentMetrics.cpuUsage > 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Memory</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.memoryUsage}%</span>
            </div>
            <Progress
              value={currentMetrics.memoryUsage}
              className={`h-2 ${currentMetrics.memoryUsage > 80 ? "[&>div]:bg-destructive" : currentMetrics.memoryUsage > 60 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Latency</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.networkLatency}ms</span>
            </div>
            <Progress value={100 - (currentMetrics.networkLatency / 50) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Throughput</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.throughput} ops/s</span>
            </div>
            <Progress value={(currentMetrics.throughput / 1000) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Uptime</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.uptime.toFixed(1)}%</span>
            </div>
            <Progress value={currentMetrics.uptime} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Disk Usage</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.diskUsage}%</span>
            </div>
            <Progress value={currentMetrics.diskUsage} className="h-2" />
          </div>
        </div>

        {/* Performance Chart */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Performance Trends</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="timestamp" className="text-xs" />
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
                  dataKey="cpu"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 3 }}
                  name="CPU %"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
                  name="Memory %"
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

        {/* Agent Performance */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Agent Resource Usage</h4>
          <div className="space-y-2">
            {agentPerformance.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">{agent.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      agent.status === "optimal"
                        ? "text-green-600 border-green-600"
                        : agent.status === "good"
                          ? "text-accent border-accent"
                          : "text-yellow-600 border-yellow-600"
                    }`}
                  >
                    {agent.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="text-center">
                    <div className="font-medium">{agent.cpu}%</div>
                    <div className="text-muted-foreground">CPU</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{agent.memory}%</div>
                    <div className="text-muted-foreground">Memory</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{agent.accuracy.toFixed(1)}%</div>
                    <div className="text-muted-foreground">Accuracy</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
