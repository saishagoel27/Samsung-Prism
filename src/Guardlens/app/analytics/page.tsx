"use client"

import { FraudAnalytics } from "@/components/analytics/fraud-analytics"
import { SystemPerformance } from "@/components/analytics/system-performance"
import { ReportingDashboard } from "@/components/analytics/reporting-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, BarChart3, Activity, FileText } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
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
                  <h1 className="text-2xl font-bold text-foreground">Analytics & Reporting</h1>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive business intelligence and performance analytics
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-accent border-accent">
                <BarChart3 className="h-3 w-3 mr-1" />
                Real-time Analytics
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <FileText className="h-3 w-3 mr-1" />
                Auto Reports
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Analytics Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Business Intelligence Overview</CardTitle>
            <CardDescription>
              Advanced analytics platform providing comprehensive insights into fraud detection performance, system
              health, and business impact metrics with automated reporting capabilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">216</div>
                <div className="text-sm text-muted-foreground">Total Detections</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">94.2%</div>
                <div className="text-sm text-muted-foreground">Detection Accuracy</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">$2.4M</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-foreground mb-2">99.7%</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Components */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <FraudAnalytics />
          </div>
          <div className="xl:col-span-1">
            <SystemPerformance />
          </div>
          <div className="xl:col-span-1">
            <ReportingDashboard />
          </div>
        </div>

        {/* Business Impact */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-accent" />
                <span>Business Impact Analysis</span>
              </CardTitle>
              <CardDescription>Quantified business value and ROI from AI-powered fraud detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Financial Impact</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center justify-between">
                      <span>Fraud losses prevented</span>
                      <span className="font-medium text-green-600">$2.4M</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Operational cost reduction</span>
                      <span className="font-medium text-green-600">67%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>False positive reduction</span>
                      <span className="font-medium text-green-600">89%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Investigation time saved</span>
                      <span className="font-medium text-green-600">156 hours</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Operational Metrics</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center justify-between">
                      <span>Detection speed improvement</span>
                      <span className="font-medium text-accent">94x faster</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Customer satisfaction</span>
                      <span className="font-medium text-accent">98.5%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Compliance score</span>
                      <span className="font-medium text-accent">100%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Risk reduction</span>
                      <span className="font-medium text-accent">87%</span>
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
