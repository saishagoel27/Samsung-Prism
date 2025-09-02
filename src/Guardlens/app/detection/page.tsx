"use client"

import { RealTimeDetector } from "@/components/detection-engine/real-time-detector"
import { ModelPerformance } from "@/components/detection-engine/model-performance"
import { AnomalyThreshold } from "@/components/detection-engine/anomaly-threshold"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, Zap, Brain, Settings } from "lucide-react"
import Link from "next/link"

export default function DetectionEnginePage() {
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
                  <h1 className="text-2xl font-bold text-foreground">Detection Engine</h1>
                  <p className="text-sm text-muted-foreground">Real-time AI fraud detection system</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Zap className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <Badge variant="outline" className="text-accent border-accent">
                <Brain className="h-3 w-3 mr-1" />
                AI Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* System Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detection Engine Architecture</CardTitle>
            <CardDescription>
              Advanced multi-agent AI system processing behavioral data in real-time with adaptive learning and
              threshold management.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">847</div>
                <div className="text-sm text-muted-foreground">Operations/sec</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">12ms</div>
                <div className="text-sm text-muted-foreground">Avg Latency</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">96.1%</div>
                <div className="text-sm text-muted-foreground">Detection Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-foreground mb-2">2.1%</div>
                <div className="text-sm text-muted-foreground">False Positives</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detection Components */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <RealTimeDetector />
          </div>
          <div className="xl:col-span-1">
            <ModelPerformance />
          </div>
          <div className="xl:col-span-1">
            <AnomalyThreshold />
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-accent" />
                <span>Technical Implementation</span>
              </CardTitle>
              <CardDescription>Core technologies powering the detection engine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Machine Learning Stack</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>TensorFlow Lite for on-device inference</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>LSTM networks for sequence analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Ensemble methods for fusion</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Online learning algorithms</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Security Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Differential privacy protection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Secure multi-party computation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Homomorphic encryption</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Zero-knowledge proofs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
