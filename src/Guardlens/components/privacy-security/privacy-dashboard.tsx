"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Lock, Shield, Database, Key } from "lucide-react"

interface PrivacyMetric {
  name: string
  status: "active" | "inactive" | "partial"
  description: string
  compliance: number
}

export function PrivacyDashboard() {
  const [privacyMetrics, setPrivacyMetrics] = useState<PrivacyMetric[]>([
    {
      name: "Data Minimization",
      status: "active",
      description: "Only essential behavioral data collected",
      compliance: 100,
    },
    {
      name: "Purpose Limitation",
      status: "active",
      description: "Data used only for fraud detection",
      compliance: 100,
    },
    {
      name: "Storage Limitation",
      status: "active",
      description: "Data retained for minimum required time",
      compliance: 95,
    },
    {
      name: "Accuracy Principle",
      status: "active",
      description: "Continuous model accuracy validation",
      compliance: 98,
    },
    {
      name: "Security Measures",
      status: "active",
      description: "End-to-end encryption and secure processing",
      compliance: 100,
    },
    { name: "Transparency", status: "active", description: "Clear data processing explanations", compliance: 92 },
  ])

  const [dataControls, setDataControls] = useState({
    dataCollection: true,
    modelTraining: true,
    anomalyLogging: true,
    performanceMetrics: true,
    federatedLearning: false,
  })

  const [encryptionStatus, setEncryptionStatus] = useState({
    dataAtRest: 100,
    dataInTransit: 100,
    modelParameters: 100,
    communicationChannels: 100,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time privacy monitoring
      setPrivacyMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          compliance: Math.max(90, Math.min(100, metric.compliance + (Math.random() - 0.5) * 2)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleDataControl = (control: keyof typeof dataControls) => {
    setDataControls((prev) => ({
      ...prev,
      [control]: !prev[control],
    }))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-accent" />
          <span>Privacy Dashboard</span>
        </CardTitle>
        <CardDescription>Comprehensive privacy protection and data governance controls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Privacy Principles Compliance */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Shield className="h-4 w-4 text-accent" />
            <span>Privacy Principles</span>
          </h4>
          {privacyMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    metric.status === "active"
                      ? "bg-green-500"
                      : metric.status === "partial"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-sm">{metric.name}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={metric.compliance} className="w-16 h-2" />
                <span className="text-xs font-medium w-8">{metric.compliance.toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Data Controls */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Database className="h-4 w-4 text-accent" />
            <span>Data Processing Controls</span>
          </h4>
          <div className="space-y-3">
            {Object.entries(dataControls).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                  <p className="text-xs text-muted-foreground">
                    {key === "dataCollection" && "Allow behavioral data collection"}
                    {key === "modelTraining" && "Enable on-device model updates"}
                    {key === "anomalyLogging" && "Log anomaly detection events"}
                    {key === "performanceMetrics" && "Collect system performance data"}
                    {key === "federatedLearning" && "Participate in federated learning"}
                  </p>
                </div>
                <Switch checked={value} onCheckedChange={() => toggleDataControl(key as keyof typeof dataControls)} />
              </div>
            ))}
          </div>
        </div>

        {/* Encryption Status */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Key className="h-4 w-4 text-accent" />
            <span>Encryption Status</span>
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(encryptionStatus).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-xs font-medium">{value}%</span>
                </div>
                <Progress value={value} className="h-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Summary */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">GDPR</div>
              <div className="text-xs text-muted-foreground">Compliant</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">CCPA</div>
              <div className="text-xs text-muted-foreground">Compliant</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">SOC 2</div>
              <div className="text-xs text-muted-foreground">Type II</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
