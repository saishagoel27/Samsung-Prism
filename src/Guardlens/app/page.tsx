"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import Link from "next/link"
import {
  Shield,
  Activity,
  Brain,
  Eye,
  Smartphone,
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Lock,
  Zap,
  Database,
  BarChart3,
  Cpu,
  Network,
  Timer,
  Target,
  Sparkles,
  Play,
  Pause,
  Square,
  RefreshCw,
} from "lucide-react"

export default function FraudDetectionDashboard() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [monitoringDuration, setMonitoringDuration] = useState(0)
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null)
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "complete">("idle")

  const [threatLevel, setThreatLevel] = useState(15)
  const [activeAgents, setActiveAgents] = useState(5)
  const [detectedAnomalies, setDetectedAnomalies] = useState(3)
  const [systemLoad, setSystemLoad] = useState(67)
  const [processingSpeed, setProcessingSpeed] = useState(245)
  const [accuracyRate, setAccuracyRate] = useState(98.7)

  useEffect(() => {
    let monitoringInterval: NodeJS.Timeout

    if (isMonitoring) {
      monitoringInterval = setInterval(() => {
        setMonitoringDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (monitoringInterval) {
        clearInterval(monitoringInterval)
      }
    }
  }, [isMonitoring])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMonitoring) {
        setThreatLevel((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)))
        setDetectedAnomalies((prev) => Math.max(0, prev + (Math.random() > 0.85 ? 1 : 0)))
        setSystemLoad((prev) => Math.max(20, Math.min(90, prev + (Math.random() - 0.5) * 15)))
        setProcessingSpeed((prev) => Math.max(180, Math.min(300, prev + (Math.random() - 0.5) * 20)))
        setAccuracyRate((prev) => Math.max(95, Math.min(99.9, prev + (Math.random() - 0.5) * 0.5)))
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const startMonitoring = () => {
    setIsMonitoring(true)
    setScanStatus("scanning")
    setLastScanTime(new Date())
    setMonitoringDuration(0)
  }

  const pauseMonitoring = () => {
    setIsMonitoring(false)
    setScanStatus("idle")
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    setScanStatus("complete")
    setMonitoringDuration(0)
  }

  const resetMonitoring = () => {
    setIsMonitoring(false)
    setScanStatus("idle")
    setMonitoringDuration(0)
    setDetectedAnomalies(0)
    setThreatLevel(15)
    setLastScanTime(null)
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const threatTrendData = [
    { time: "00:00", threats: 12, blocked: 11, severity: 8 },
    { time: "04:00", threats: 8, blocked: 8, severity: 5 },
    { time: "08:00", threats: 23, blocked: 22, severity: 18 },
    { time: "12:00", threats: 18, blocked: 17, severity: 12 },
    { time: "16:00", threats: 31, blocked: 29, severity: 25 },
    { time: "20:00", threats: 15, blocked: 15, severity: 10 },
  ]

  const agentPerformanceData = [
    { name: "Typing", value: 94, color: "#6366f1", gradient: "from-indigo-400 to-indigo-600" },
    { name: "Touch", value: 87, color: "#10b981", gradient: "from-emerald-400 to-emerald-600" },
    { name: "App Usage", value: 91, color: "#f59e0b", gradient: "from-amber-400 to-amber-600" },
    { name: "Movement", value: 89, color: "#ef4444", gradient: "from-red-400 to-red-600" },
    { name: "Fusion", value: 96, color: "#8b5cf6", gradient: "from-violet-400 to-violet-600" },
  ]

  const performanceMetrics = [
    { name: "Jan", accuracy: 96.2, speed: 180, threats: 45 },
    { name: "Feb", accuracy: 97.1, speed: 165, threats: 38 },
    { name: "Mar", accuracy: 98.3, speed: 142, threats: 52 },
    { name: "Apr", accuracy: 98.7, speed: 138, threats: 41 },
    { name: "May", accuracy: 98.9, speed: 125, threats: 29 },
    { name: "Jun", accuracy: 99.1, speed: 118, threats: 33 },
  ]

  const systemMetricsData = [
    { metric: "CPU", value: systemLoad, max: 100, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { metric: "Memory", value: 45, max: 100, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { metric: "Network", value: 23, max: 100, color: "bg-gradient-to-r from-purple-500 to-violet-500" },
    { metric: "Storage", value: 12, max: 100, color: "bg-gradient-to-r from-orange-500 to-red-500" },
  ]

  const agents = [
    {
      name: "Typing Dynamics",
      status: isMonitoring ? "active" : "standby",
      confidence: 94,
      icon: Activity,
      trend: "+2.3%",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "Touch Patterns",
      status: isMonitoring ? "active" : "standby",
      confidence: 87,
      icon: Smartphone,
      trend: "+1.8%",
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "App Usage",
      status: isMonitoring ? "active" : "standby",
      confidence: 91,
      icon: Eye,
      trend: "+3.1%",
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Movement Analysis",
      status: isMonitoring ? "active" : "standby",
      confidence: 89,
      icon: TrendingUp,
      trend: "+0.9%",
      color: "from-red-500 to-pink-600",
    },
    {
      name: "Behavioral Fusion",
      status: isMonitoring ? "active" : "standby",
      confidence: 96,
      icon: Brain,
      trend: "+4.2%",
      color: "from-violet-500 to-purple-600",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "anomaly",
      message: "Unusual typing pattern detected",
      severity: "medium",
      time: "2 min ago",
      location: "Mobile App",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      type: "fraud",
      message: "Potential account takeover attempt",
      severity: "high",
      time: "5 min ago",
      location: "Web Portal",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 3,
      type: "info",
      message: "Model adaptation completed",
      severity: "low",
      time: "12 min ago",
      location: "System",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      type: "blocked",
      message: "Suspicious login blocked",
      severity: "medium",
      time: "18 min ago",
      location: "API",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <header className="border-b bg-gradient-to-r from-white/90 via-blue-50/90 to-indigo-50/90 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-indigo-900/90 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                  <Shield className="h-12 w-12 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text relative z-10" />
                  <div
                    className={`absolute -top-1 -right-1 h-4 w-4 rounded-full animate-pulse shadow-lg ${
                      isMonitoring
                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                        : "bg-gradient-to-r from-gray-400 to-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    SecureAI
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    Multi-Agent Fraud Detection System
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 mr-4">
                {!isMonitoring && scanStatus !== "scanning" && (
                  <Button
                    onClick={startMonitoring}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Monitoring
                  </Button>
                )}

                {isMonitoring && (
                  <>
                    <Button
                      onClick={pauseMonitoring}
                      variant="outline"
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button
                      onClick={stopMonitoring}
                      variant="outline"
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  </>
                )}

                <Button
                  onClick={resetMonitoring}
                  variant="outline"
                  className="bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              <Link href="/agents">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:shadow-lg cursor-pointer transition-all duration-300"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  Agents
                </Badge>
              </Link>
              <Link href="/detection">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 hover:shadow-lg cursor-pointer transition-all duration-300"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Detection
                </Badge>
              </Link>
              <Link href="/privacy">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 hover:shadow-lg cursor-pointer transition-all duration-300"
                >
                  <Lock className="h-3 w-3 mr-1" />
                  Privacy
                </Badge>
              </Link>
              <Link href="/analytics">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics
                </Badge>
              </Link>
              <Link href="/models">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white border-0 hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  ML Models
                </Badge>
              </Link>
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md"
              >
                <Lock className="h-3 w-3 mr-1" />
                On-Device
              </Badge>
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-md"
              >
                <Zap className="h-3 w-3 mr-1" />
                Real-time
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card className="mb-8 border-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 rounded-full ${
                    isMonitoring
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"
                      : scanStatus === "complete"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-gray-500 to-slate-500"
                  }`}
                >
                  {isMonitoring ? (
                    <Activity className="h-6 w-6 text-white animate-pulse" />
                  ) : scanStatus === "complete" ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Pause className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {isMonitoring
                      ? "Active Monitoring"
                      : scanStatus === "complete"
                        ? "Monitoring Complete"
                        : "Monitoring Standby"}
                  </h2>
                  <p className="text-white/80">
                    {isMonitoring
                      ? "Real-time behavioral analysis in progress"
                      : scanStatus === "complete"
                        ? "Scan completed successfully"
                        : "System ready to begin monitoring"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{formatDuration(monitoringDuration)}</div>
                <div className="text-sm text-white/80">
                  {lastScanTime ? `Last scan: ${lastScanTime.toLocaleTimeString()}` : "No recent scans"}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{isMonitoring ? activeAgents : 0}/5</div>
                <div className="text-sm text-white/80">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {isMonitoring ? processingSpeed.toFixed(0) : 0}ms
                </div>
                <div className="text-sm text-white/80">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{isMonitoring ? accuracyRate.toFixed(1) : 0}%</div>
                <div className="text-sm text-white/80">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{detectedAnomalies}</div>
                <div className="text-sm text-white/80">Anomalies Detected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Threat Level</CardTitle>
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {threatLevel.toFixed(0)}%
              </div>
              <Progress value={threatLevel} className="mt-3 h-2" />
              <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                {threatLevel < 30 ? "🟢 Low risk" : threatLevel < 70 ? "🟡 Medium risk" : "🔴 High risk"}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Active Agents</CardTitle>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                <Brain className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {activeAgents}/5
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Anomalies</CardTitle>
              <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {detectedAnomalies}
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-medium">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Privacy Status</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <Database className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">Data stays on-device</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">System Load</CardTitle>
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                <Cpu className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                {systemLoad}%
              </div>
              <Progress value={systemLoad} className="mt-3 h-2" />
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-medium">Optimal performance</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-900/20 dark:to-teal-900/20 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Processing Speed</CardTitle>
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full">
                <Timer className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                {processingSpeed.toFixed(0)}ms
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">Sub-second response</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Threat Trends
                </span>
              </CardTitle>
              <CardDescription>24-hour detection statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={threatTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="threats"
                    stackId="1"
                    stroke="#ef4444"
                    fill="url(#threatGradient)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="blocked"
                    stackId="2"
                    stroke="#10b981"
                    fill="url(#blockedGradient)"
                    fillOpacity={0.8}
                  />
                  <defs>
                    <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  Agent Performance
                </span>
              </CardTitle>
              <CardDescription>Real-time confidence levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={agentPerformanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {agentPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Performance Metrics
                </span>
              </CardTitle>
              <CardDescription>Monthly accuracy trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Behavioral Agents
                  </span>
                  <Badge
                    variant="outline"
                    className="ml-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    All Active
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Real-time monitoring of user behavioral patterns with performance trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent, index) => {
                    const IconComponent = agent.icon
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-6 border-0 rounded-xl bg-gradient-to-r ${agent.color} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse shadow-lg" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-lg">{agent.name}</p>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm text-white/80">Confidence: {agent.confidence}%</p>
                              <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                                {agent.trend}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-white/20 rounded-full h-2">
                            <div
                              className="h-2 bg-white rounded-full transition-all duration-500"
                              style={{ width: `${agent.confidence}%` }}
                            />
                          </div>
                          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Security Events
                  </span>
                  <Badge
                    variant="outline"
                    className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription>Latest security events and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <Alert
                      key={alert.id}
                      className={`transition-all duration-300 hover:shadow-md border-0 bg-gradient-to-r ${alert.color} text-white`}
                    >
                      <div className="p-2 bg-white/20 rounded-full w-fit">
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                      <AlertTitle className="text-sm flex items-center justify-between text-white">
                        <span>
                          {alert.type === "fraud"
                            ? "🚨 Fraud Alert"
                            : alert.type === "anomaly"
                              ? "⚠️ Anomaly Detected"
                              : alert.type === "blocked"
                                ? "🛡️ Threat Blocked"
                                : "ℹ️ System Info"}
                        </span>
                        <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                          {alert.location}
                        </Badge>
                      </AlertTitle>
                      <AlertDescription className="text-xs text-white/90">
                        {alert.message}
                        <span className="block text-white/70 mt-1 font-medium">{alert.time}</span>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-cyan-50 dark:from-slate-800 dark:to-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                    <Network className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    System Metrics
                  </span>
                </CardTitle>
                <CardDescription>Real-time resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemMetricsData.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600"
                    >
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{metric.metric}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${metric.color}`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 w-10">
                          {metric.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card className="border-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-indigo-900 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                System Capabilities
              </CardTitle>
              <CardDescription className="text-lg">Advanced AI-powered fraud detection features</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="privacy" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
                  <TabsTrigger
                    value="privacy"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                  >
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger
                    value="realtime"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
                  >
                    Real-time
                  </TabsTrigger>
                  <TabsTrigger
                    value="adaptive"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white"
                  >
                    Adaptive
                  </TabsTrigger>
                  <TabsTrigger
                    value="federated"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
                  >
                    Federated
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="privacy" className="space-y-4 mt-6">
                  <div className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        On-Device Processing
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        All behavioral analysis happens locally on your device. No sensitive data ever leaves your
                        device, ensuring complete privacy and compliance with data protection regulations.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="realtime" className="space-y-4 mt-6">
                  <div className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Instant Detection
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        Multi-agent system provides real-time fraud detection with sub-second response times. Behavioral
                        anomalies are detected and flagged immediately as they occur.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="adaptive" className="space-y-4 mt-6">
                  <div className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                        Self-Learning Models
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        AI agents continuously adapt to your unique behavioral patterns, improving accuracy over time
                        while maintaining robust detection against sophisticated fraud attempts.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="federated" className="space-y-4 mt-6">
                  <div className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Collaborative Intelligence
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        Federated learning enables devices to share threat intelligence without compromising privacy,
                        creating a collective defense network against emerging fraud patterns.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
