"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Target, Network } from "lucide-react"

export function BehavioralFusionAgent() {
  const [fusionData, setFusionData] = useState({
    overallConfidence: 96,
    crossValidation: 89,
    consensusScore: 94,
    adaptationRate: 78,
  })
  const [riskAssessment, setRiskAssessment] = useState(7)
  const [agentInputs, setAgentInputs] = useState([
    { name: "Typing", weight: 0.25, score: 94, status: "active" },
    { name: "Touch", weight: 0.22, score: 87, status: "active" },
    { name: "Usage", weight: 0.28, score: 91, status: "active" },
    { name: "Movement", weight: 0.25, score: 89, status: "active" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setFusionData((prev) => ({
        overallConfidence: Math.max(85, Math.min(100, prev.overallConfidence + (Math.random() - 0.5) * 4)),
        crossValidation: Math.max(80, Math.min(100, prev.crossValidation + (Math.random() - 0.5) * 6)),
        consensusScore: Math.max(85, Math.min(100, prev.consensusScore + (Math.random() - 0.5) * 5)),
        adaptationRate: Math.max(70, Math.min(90, prev.adaptationRate + (Math.random() - 0.5) * 8)),
      }))
      setRiskAssessment(Math.max(0, Math.min(100, riskAssessment + (Math.random() - 0.5) * 20)))

      // Update agent inputs
      setAgentInputs((prev) =>
        prev.map((agent) => ({
          ...agent,
          score: Math.max(80, Math.min(100, agent.score + (Math.random() - 0.5) * 6)),
          weight: Math.max(0.15, Math.min(0.35, agent.weight + (Math.random() - 0.5) * 0.05)),
        })),
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [riskAssessment])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-accent" />
            <span>Behavioral Fusion Agent</span>
          </div>
          <Badge variant={riskAssessment > 25 ? "destructive" : "outline"} className="text-xs">
            {riskAssessment > 25 ? "High Risk" : "Secure"}
          </Badge>
        </CardTitle>
        <CardDescription>Combining multi-modal behavioral signals for unified threat assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Confidence</span>
              <span className="text-sm font-medium">{fusionData.overallConfidence.toFixed(0)}%</span>
            </div>
            <Progress value={fusionData.overallConfidence} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cross Validation</span>
              <span className="text-sm font-medium">{fusionData.crossValidation.toFixed(0)}%</span>
            </div>
            <Progress value={fusionData.crossValidation} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Consensus Score</span>
              <span className="text-sm font-medium">{fusionData.consensusScore.toFixed(0)}%</span>
            </div>
            <Progress value={fusionData.consensusScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Adaptation Rate</span>
              <span className="text-sm font-medium">{fusionData.adaptationRate.toFixed(0)}%</span>
            </div>
            <Progress value={fusionData.adaptationRate} className="h-2" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Agent Contributions</h4>
          <div className="space-y-3">
            {agentInputs.map((agent, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">{agent.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {(agent.weight * 100).toFixed(0)}%
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={agent.score} className="w-16 h-2" />
                  <span className="text-xs text-muted-foreground w-8">{agent.score.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Risk Assessment</span>
            <Badge variant="outline" className="text-accent border-accent">
              <Network className="h-3 w-3 mr-1" />
              Fusion AI
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Progress
              value={riskAssessment}
              className={`flex-1 h-3 ${riskAssessment > 25 ? "[&>div]:bg-destructive" : "[&>div]:bg-green-500"}`}
            />
            <span className="text-sm font-medium w-12">{riskAssessment.toFixed(0)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>Real-time</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-3 w-3" />
            <span>96% Accuracy</span>
          </div>
          <div className="flex items-center space-x-1">
            <Brain className="h-3 w-3" />
            <span>AI Fusion</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
