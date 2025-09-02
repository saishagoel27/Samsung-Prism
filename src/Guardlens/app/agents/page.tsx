"use client"

import { TypingDynamicsAgent } from "@/components/behavioral-agents/typing-dynamics-agent"
import { TouchPatternsAgent } from "@/components/behavioral-agents/touch-patterns-agent"
import { AppUsageAgent } from "@/components/behavioral-agents/app-usage-agent"
import { MovementAnalysisAgent } from "@/components/behavioral-agents/movement-analysis-agent"
import { BehavioralFusionAgent } from "@/components/behavioral-agents/behavioral-fusion-agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-accent" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Behavioral Agents</h1>
                  <p className="text-sm text-muted-foreground">Multi-modal AI fraud detection system</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-accent border-accent">
              5 Agents Active
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agent Architecture Overview</CardTitle>
            <CardDescription>
              Each specialized agent analyzes a specific behavioral modality, contributing to a unified threat
              assessment through the Behavioral Fusion Agent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Typing Accuracy</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">87%</div>
                <div className="text-sm text-muted-foreground">Touch Confidence</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">91%</div>
                <div className="text-sm text-muted-foreground">Usage Pattern</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">89%</div>
                <div className="text-sm text-muted-foreground">Movement Match</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">96%</div>
                <div className="text-sm text-muted-foreground">Fusion Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <TypingDynamicsAgent />
          <TouchPatternsAgent />
          <AppUsageAgent />
          <MovementAnalysisAgent />
          <div className="lg:col-span-2 xl:col-span-1">
            <BehavioralFusionAgent />
          </div>
        </div>
      </div>
    </div>
  )
}
