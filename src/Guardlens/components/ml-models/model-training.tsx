"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Brain, Cpu, TrendingUp, Activity, Zap, Target, Database, CheckCircle, AlertCircle } from "lucide-react"

interface ModelTrainingProps {
  isMonitoring: boolean
}

export default function ModelTraining({ isMonitoring }: ModelTrainingProps) {
  const [trainingProgress, setTrainingProgress] = useState({
    typing: 87,
    touch: 92,
    appUsage: 78,
    movement: 85,
    fusion: 94,
  })

  const [modelAccuracy, setModelAccuracy] = useState({
    typing: 96.2,
    touch: 94.8,
    appUsage: 91.5,
    movement: 93.7,
    fusion: 98.1,
  })

  const [trainingData, setTrainingData] = useState([
    { epoch: 1, loss: 0.45, accuracy: 85.2, validation: 83.1 },
    { epoch: 2, loss: 0.32, accuracy: 89.7, validation: 87.3 },
    { epoch: 3, loss: 0.28, accuracy: 92.1, validation: 90.8 },
    { epoch: 4, loss: 0.24, accuracy: 94.3, validation: 93.2 },
    { epoch: 5, loss: 0.21, accuracy: 95.8, validation: 94.9 },
    { epoch: 6, loss: 0.19, accuracy: 96.7, validation: 95.8 },
  ])

  const [adaptationMetrics, setAdaptationMetrics] = useState([
    { time: "00:00", baseline: 85, adapted: 85, improvement: 0 },
    { time: "04:00", baseline: 85, adapted: 87, improvement: 2.4 },
    { time: "08:00", baseline: 85, adapted: 91, improvement: 7.1 },
    { time: "12:00", baseline: 85, adapted: 94, improvement: 10.6 },
    { time: "16:00", baseline: 85, adapted: 96, improvement: 12.9 },
    { time: "20:00", baseline: 85, adapted: 98, improvement: 15.3 },
  ])

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setTrainingProgress((prev) => ({
          typing: Math.min(100, prev.typing + Math.random() * 0.5),
          touch: Math.min(100, prev.touch + Math.random() * 0.3),
          appUsage: Math.min(100, prev.appUsage + Math.random() * 0.7),
          movement: Math.min(100, prev.movement + Math.random() * 0.4),
          fusion: Math.min(100, prev.fusion + Math.random() * 0.2),
        }))

        setModelAccuracy((prev) => ({
          typing: Math.min(99.9, prev.typing + Math.random() * 0.1),
          touch: Math.min(99.9, prev.touch + Math.random() * 0.1),
          appUsage: Math.min(99.9, prev.appUsage + Math.random() * 0.15),
          movement: Math.min(99.9, prev.movement + Math.random() * 0.1),
          fusion: Math.min(99.9, prev.fusion + Math.random() * 0.05),
        }))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const models = [
    {
      name: "Typing Dynamics Model",
      type: "Neural Network",
      progress: trainingProgress.typing,
      accuracy: modelAccuracy.typing,
      status: isMonitoring ? "training" : "idle",
      icon: Activity,
      color: "from-indigo-500 to-purple-600",
      features: ["Keystroke timing", "Pressure patterns", "Rhythm analysis"],
    },
    {
      name: "Touch Pattern Model",
      type: "CNN",
      progress: trainingProgress.touch,
      accuracy: modelAccuracy.touch,
      status: isMonitoring ? "training" : "idle",
      icon: Target,
      color: "from-emerald-500 to-teal-600",
      features: ["Touch pressure", "Swipe velocity", "Gesture patterns"],
    },
    {
      name: "App Usage Model",
      type: "LSTM",
      progress: trainingProgress.appUsage,
      accuracy: modelAccuracy.appUsage,
      status: isMonitoring ? "training" : "idle",
      icon: Database,
      color: "from-amber-500 to-orange-600",
      features: ["Usage patterns", "Navigation flow", "Session duration"],
    },
    {
      name: "Movement Model",
      type: "RNN",
      progress: trainingProgress.movement,
      accuracy: modelAccuracy.movement,
      status: isMonitoring ? "training" : "idle",
      icon: TrendingUp,
      color: "from-red-500 to-pink-600",
      features: ["Device orientation", "Motion patterns", "Gait analysis"],
    },
    {
      name: "Behavioral Fusion",
      type: "Ensemble",
      progress: trainingProgress.fusion,
      accuracy: modelAccuracy.fusion,
      status: isMonitoring ? "training" : "idle",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      features: ["Multi-modal fusion", "Risk scoring", "Anomaly detection"],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Model Training Overview */}
      <Card className="border-0 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ML Model Training Status
            </span>
            <Badge
              variant="outline"
              className={`ml-auto ${
                isMonitoring
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                  : "bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0"
              }`}
            >
              {isMonitoring ? (
                <>
                  <Activity className="h-3 w-3 mr-1 animate-pulse" />
                  Training Active
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Training Paused
                </>
              )}
            </Badge>
          </CardTitle>
          <CardDescription>
            Continuous learning and adaptation of behavioral models for enhanced fraud detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Training Progress Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Training Progress
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="epoch" stroke="#64748b" />
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
                  <Line
                    type="monotone"
                    dataKey="validation"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Adaptation Metrics */}
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Model Adaptation
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={adaptationMetrics}>
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
                    dataKey="baseline"
                    stackId="1"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="adapted"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Model Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map((model, index) => {
          const IconComponent = model.icon
          return (
            <Card
              key={index}
              className={`border-0 bg-gradient-to-br ${model.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{model.name}</h3>
                      <p className="text-sm text-white/80">{model.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      model.status === "training"
                        ? "bg-green-500/20 text-green-100 border-green-300/30"
                        : "bg-gray-500/20 text-gray-100 border-gray-300/30"
                    }`}
                  >
                    {model.status === "training" ? (
                      <>
                        <Cpu className="h-3 w-3 mr-1 animate-pulse" />
                        Training
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Idle
                      </>
                    )}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/80">Training Progress</span>
                      <span className="text-sm font-bold text-white">{model.progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="h-2 bg-white rounded-full transition-all duration-500"
                        style={{ width: `${model.progress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/80">Model Accuracy</span>
                      <span className="text-sm font-bold text-white">{model.accuracy.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${model.accuracy}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {model.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-white/10 text-white border-white/20">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Learning Statistics */}
      <Card className="border-0 bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Continuous Learning Statistics
            </span>
          </CardTitle>
          <CardDescription>Real-time adaptation and improvement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {isMonitoring ? "1,247" : "0"}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Samples Processed</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {isMonitoring ? "15.3%" : "0%"}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Accuracy Improvement</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {isMonitoring ? "23" : "0"}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Pattern Updates</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {isMonitoring ? "98.7%" : "0%"}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Model Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
