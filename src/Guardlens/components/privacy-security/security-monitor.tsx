"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, Lock, Eye, Zap } from "lucide-react"

interface SecurityEvent {
  id: string
  timestamp: string
  type: "threat" | "vulnerability" | "access" | "system"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  status: "active" | "resolved" | "investigating"
}

export function SecurityMonitor() {
  const [securityScore, setSecurityScore] = useState(94)
  const [threatLevel, setThreatLevel] = useState("Low")
  const [activeThreats, setActiveThreats] = useState(0)
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      timestamp: "14:30:15",
      type: "system",
      severity: "low",
      description: "Routine security scan completed",
      status: "resolved",
    },
    {
      id: "2",
      timestamp: "14:25:32",
      type: "access",
      severity: "medium",
      description: "Unusual access pattern detected",
      status: "investigating",
    },
    {
      id: "3",
      timestamp: "14:20:08",
      type: "threat",
      severity: "high",
      description: "Potential model poisoning attempt blocked",
      status: "resolved",
    },
  ])

  const [securityMetrics, setSecurityMetrics] = useState({
    firewall: 100,
    intrusion: 98,
    malware: 100,
    dataLeak: 96,
    modelSecurity: 99,
    networkSecurity: 97,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Update security metrics
      setSecurityScore(Math.max(85, Math.min(100, securityScore + (Math.random() - 0.5) * 3)))
      setActiveThreats(Math.max(0, Math.min(5, activeThreats + (Math.random() > 0.8 ? 1 : -1))))

      // Update threat level based on score
      if (securityScore > 95) setThreatLevel("Low")
      else if (securityScore > 85) setThreatLevel("Medium")
      else setThreatLevel("High")

      // Add new security events occasionally
      if (Math.random() > 0.8) {
        const eventTypes: ("threat" | "vulnerability" | "access" | "system")[] = [
          "system",
          "access",
          "threat",
          "vulnerability",
        ]
        const severities: ("low" | "medium" | "high" | "critical")[] = ["low", "low", "medium", "high"]
        const descriptions = {
          system: ["Security scan completed", "System update applied", "Backup completed"],
          access: ["Unusual access pattern", "Failed authentication attempt", "New device detected"],
          threat: ["Suspicious activity blocked", "Malware attempt prevented", "Model attack detected"],
          vulnerability: ["Security patch available", "Configuration issue found", "Weak encryption detected"],
        }

        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const newEvent: SecurityEvent = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          type,
          severity: severities[Math.floor(Math.random() * severities.length)],
          description: descriptions[type][Math.floor(Math.random() * descriptions[type].length)],
          status: Math.random() > 0.7 ? "resolved" : "investigating",
        }

        setSecurityEvents((prev) => [newEvent, ...prev.slice(0, 4)])
      }

      // Update security metrics
      setSecurityMetrics((prev) => ({
        firewall: Math.max(95, Math.min(100, prev.firewall + (Math.random() - 0.5) * 2)),
        intrusion: Math.max(90, Math.min(100, prev.intrusion + (Math.random() - 0.5) * 3)),
        malware: Math.max(95, Math.min(100, prev.malware + (Math.random() - 0.5) * 2)),
        dataLeak: Math.max(90, Math.min(100, prev.dataLeak + (Math.random() - 0.5) * 4)),
        modelSecurity: Math.max(95, Math.min(100, prev.modelSecurity + (Math.random() - 0.5) * 2)),
        networkSecurity: Math.max(90, Math.min(100, prev.networkSecurity + (Math.random() - 0.5) * 3)),
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [securityScore, activeThreats])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-accent" />
            <span>Security Monitor</span>
          </div>
          <Badge
            variant={threatLevel === "Low" ? "outline" : threatLevel === "Medium" ? "default" : "destructive"}
            className="text-xs"
          >
            {threatLevel === "Low" && <CheckCircle className="h-3 w-3 mr-1" />}
            {threatLevel === "Medium" && <Eye className="h-3 w-3 mr-1" />}
            {threatLevel === "High" && <AlertTriangle className="h-3 w-3 mr-1" />}
            {threatLevel} Risk
          </Badge>
        </CardTitle>
        <CardDescription>Real-time security monitoring and threat intelligence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Overview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">{securityScore}</div>
            <div className="text-xs text-muted-foreground">Security Score</div>
            <Progress value={securityScore} className="mt-1 h-1" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{activeThreats}</div>
            <div className="text-xs text-muted-foreground">Active Threats</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">24/7</div>
            <div className="text-xs text-muted-foreground">Monitoring</div>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Lock className="h-4 w-4 text-accent" />
            <span>Security Components</span>
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(securityMetrics).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-xs font-medium">{value.toFixed(0)}%</span>
                </div>
                <Progress
                  value={value}
                  className={`h-2 ${value < 95 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Security Events */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Zap className="h-4 w-4 text-accent" />
            <span>Recent Events</span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {securityEvents.map((event) => (
              <Alert
                key={event.id}
                className={`text-xs ${
                  event.severity === "critical" || event.severity === "high"
                    ? "border-destructive"
                    : event.severity === "medium"
                      ? "border-accent"
                      : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        event.severity === "critical"
                          ? "bg-red-600"
                          : event.severity === "high"
                            ? "bg-destructive"
                            : event.severity === "medium"
                              ? "bg-accent"
                              : "bg-green-500"
                      }`}
                    ></div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        event.status === "resolved"
                          ? "text-green-600 border-green-600"
                          : event.status === "investigating"
                            ? "text-accent border-accent"
                            : "text-destructive border-destructive"
                      }`}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground">{event.timestamp}</span>
                </div>
                <AlertDescription className="text-xs">{event.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        </div>

        {/* Security Certifications */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 border rounded">
              <div className="text-xs font-bold text-green-600">ISO 27001</div>
              <div className="text-xs text-muted-foreground">Certified</div>
            </div>
            <div className="p-2 border rounded">
              <div className="text-xs font-bold text-green-600">PCI DSS</div>
              <div className="text-xs text-muted-foreground">Level 1</div>
            </div>
            <div className="p-2 border rounded">
              <div className="text-xs font-bold text-green-600">FIPS 140-2</div>
              <div className="text-xs text-muted-foreground">Level 3</div>
            </div>
            <div className="p-2 border rounded">
              <div className="text-xs font-bold text-green-600">Common Criteria</div>
              <div className="text-xs text-muted-foreground">EAL4+</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
