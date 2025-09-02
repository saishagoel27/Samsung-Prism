"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Network, Globe, Shield, TrendingUp } from "lucide-react"

interface FederatedNode {
  id: string
  region: string
  participants: number
  modelAccuracy: number
  dataContribution: number
  status: "active" | "syncing" | "offline"
}

export function FederatedLearning() {
  const [federatedEnabled, setFederatedEnabled] = useState(true)
  const [globalModelAccuracy, setGlobalModelAccuracy] = useState(97.2)
  const [totalParticipants, setTotalParticipants] = useState(1247)
  const [syncProgress, setSyncProgress] = useState(78)

  const [federatedNodes, setFederatedNodes] = useState<FederatedNode[]>([
    {
      id: "1",
      region: "North America",
      participants: 423,
      modelAccuracy: 96.8,
      dataContribution: 34,
      status: "active",
    },
    { id: "2", region: "Europe", participants: 387, modelAccuracy: 97.1, dataContribution: 31, status: "syncing" },
    { id: "3", region: "Asia Pacific", participants: 298, modelAccuracy: 97.5, dataContribution: 24, status: "active" },
    { id: "4", region: "South America", participants: 89, modelAccuracy: 96.2, dataContribution: 7, status: "active" },
    { id: "5", region: "Africa", participants: 50, modelAccuracy: 95.9, dataContribution: 4, status: "offline" },
  ])

  const [learningMetrics, setLearningMetrics] = useState({
    modelUpdates: 156,
    privacyBudget: 85,
    convergenceRate: 92,
    communicationEfficiency: 88,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (federatedEnabled) {
        // Update global metrics
        setGlobalModelAccuracy((prev) => Math.max(95, Math.min(99, prev + (Math.random() - 0.5) * 0.5)))
        setTotalParticipants((prev) => Math.max(1000, prev + Math.floor((Math.random() - 0.5) * 20)))
        setSyncProgress((prev) => (prev >= 100 ? 0 : prev + Math.floor(Math.random() * 15) + 5))

        // Update federated nodes
        setFederatedNodes((prev) =>
          prev.map((node) => ({
            ...node,
            participants: Math.max(20, node.participants + Math.floor((Math.random() - 0.5) * 10)),
            modelAccuracy: Math.max(94, Math.min(99, node.modelAccuracy + (Math.random() - 0.5) * 0.8)),
            dataContribution: Math.max(1, Math.min(50, node.dataContribution + (Math.random() - 0.5) * 3)),
            status: Math.random() > 0.9 ? (Math.random() > 0.5 ? "syncing" : "offline") : "active",
          })),
        )

        // Update learning metrics
        setLearningMetrics((prev) => ({
          modelUpdates: prev.modelUpdates + (Math.random() > 0.7 ? 1 : 0),
          privacyBudget: Math.max(70, Math.min(100, prev.privacyBudget + (Math.random() - 0.5) * 5)),
          convergenceRate: Math.max(80, Math.min(100, prev.convergenceRate + (Math.random() - 0.5) * 4)),
          communicationEfficiency: Math.max(
            75,
            Math.min(100, prev.communicationEfficiency + (Math.random() - 0.5) * 6),
          ),
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [federatedEnabled])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-accent" />
            <span>Federated Learning</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={federatedEnabled} onCheckedChange={setFederatedEnabled} />
            <Badge variant={federatedEnabled ? "default" : "outline"} className="text-xs">
              {federatedEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>Collaborative AI training while preserving privacy across distributed nodes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Global Overview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">{globalModelAccuracy.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Global Accuracy</div>
            <Progress value={globalModelAccuracy} className="mt-1 h-1" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{totalParticipants.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Participants</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{syncProgress}%</div>
            <div className="text-xs text-muted-foreground">Sync Progress</div>
            <Progress value={syncProgress} className="mt-1 h-1" />
          </div>
        </div>

        {/* Regional Nodes */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Globe className="h-4 w-4 text-accent" />
            <span>Regional Nodes</span>
          </h4>
          <div className="space-y-2">
            {federatedNodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      node.status === "active"
                        ? "bg-green-500"
                        : node.status === "syncing"
                          ? "bg-accent animate-pulse"
                          : "bg-gray-400"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-sm">{node.region}</p>
                    <p className="text-xs text-muted-foreground">{node.participants} participants</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="text-center">
                    <div className="font-medium">{node.modelAccuracy.toFixed(1)}%</div>
                    <div className="text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{node.dataContribution}%</div>
                    <div className="text-muted-foreground">Contribution</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      node.status === "active"
                        ? "text-green-600 border-green-600"
                        : node.status === "syncing"
                          ? "text-accent border-accent"
                          : "text-gray-500 border-gray-500"
                    }`}
                  >
                    {node.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Metrics */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span>Learning Performance</span>
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Model Updates</span>
                <span className="text-xs font-medium">{learningMetrics.modelUpdates}</span>
              </div>
              <div className="text-xs text-muted-foreground">Total rounds completed</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Privacy Budget</span>
                <span className="text-xs font-medium">{learningMetrics.privacyBudget}%</span>
              </div>
              <Progress value={learningMetrics.privacyBudget} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Convergence Rate</span>
                <span className="text-xs font-medium">{learningMetrics.convergenceRate}%</span>
              </div>
              <Progress value={learningMetrics.convergenceRate} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Communication Efficiency</span>
                <span className="text-xs font-medium">{learningMetrics.communicationEfficiency}%</span>
              </div>
              <Progress value={learningMetrics.communicationEfficiency} className="h-1" />
            </div>
          </div>
        </div>

        {/* Privacy Guarantees */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Shield className="h-4 w-4 text-accent" />
            <span>Privacy Guarantees</span>
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2 p-2 border rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Differential Privacy</span>
            </div>
            <div className="flex items-center space-x-2 p-2 border rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure Aggregation</span>
            </div>
            <div className="flex items-center space-x-2 p-2 border rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Homomorphic Encryption</span>
            </div>
            <div className="flex items-center space-x-2 p-2 border rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Zero-Knowledge Proofs</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
