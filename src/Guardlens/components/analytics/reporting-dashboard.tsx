"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Mail, Share, TrendingUp, AlertTriangle } from "lucide-react"

interface Report {
  id: string
  name: string
  type: "security" | "performance" | "compliance" | "executive"
  status: "ready" | "generating" | "scheduled"
  lastGenerated: string
  size: string
  format: "PDF" | "CSV" | "JSON"
}

interface ReportMetric {
  name: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
}

export function ReportingDashboard() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "Weekly Security Summary",
      type: "security",
      status: "ready",
      lastGenerated: "2024-01-21 09:00",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      id: "2",
      name: "Performance Analytics",
      type: "performance",
      status: "ready",
      lastGenerated: "2024-01-21 08:30",
      size: "1.8 MB",
      format: "PDF",
    },
    {
      id: "3",
      name: "Compliance Report",
      type: "compliance",
      status: "generating",
      lastGenerated: "2024-01-20 18:00",
      size: "3.2 MB",
      format: "PDF",
    },
    {
      id: "4",
      name: "Executive Dashboard",
      type: "executive",
      status: "ready",
      lastGenerated: "2024-01-21 07:00",
      size: "1.2 MB",
      format: "PDF",
    },
    {
      id: "5",
      name: "Fraud Detection Data",
      type: "security",
      status: "scheduled",
      lastGenerated: "2024-01-21 06:00",
      size: "5.1 MB",
      format: "CSV",
    },
  ])

  const [reportMetrics, setReportMetrics] = useState<ReportMetric[]>([
    { name: "Total Reports Generated", value: "1,247", change: 12, trend: "up" },
    { name: "Average Generation Time", value: "2.3 min", change: -8, trend: "down" },
    { name: "Report Accuracy", value: "99.7%", change: 0.2, trend: "up" },
    { name: "Automated Reports", value: "89%", change: 5, trend: "up" },
  ])

  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [generatingReport, setGeneratingReport] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Update report statuses
      setReports((prev) =>
        prev.map((report) => {
          if (report.status === "generating" && Math.random() > 0.7) {
            return {
              ...report,
              status: "ready",
              lastGenerated: new Date().toISOString().slice(0, 16).replace("T", " "),
            }
          }
          if (report.status === "scheduled" && Math.random() > 0.8) {
            return { ...report, status: "generating" }
          }
          return report
        }),
      )

      // Update metrics
      setReportMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          change: metric.change + (Math.random() - 0.5) * 2,
          trend: metric.change > 0 ? "up" : metric.change < 0 ? "down" : "stable",
        })),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const generateReport = (reportId: string) => {
    setGeneratingReport(reportId)
    setReports((prev) => prev.map((report) => (report.id === reportId ? { ...report, status: "generating" } : report)))

    setTimeout(() => {
      setGeneratingReport(null)
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? { ...report, status: "ready", lastGenerated: new Date().toISOString().slice(0, 16).replace("T", " ") }
            : report,
        ),
      )
    }, 3000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-accent" />
            <span>Reporting Dashboard</span>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Automated reporting and business intelligence analytics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reportMetrics.map((metric, index) => (
            <div key={index} className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-foreground">{metric.value}</div>
              <div className="text-xs text-muted-foreground mb-1">{metric.name}</div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp
                  className={`h-3 w-3 ${
                    metric.trend === "up"
                      ? "text-green-600"
                      : metric.trend === "down"
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-xs ${
                    metric.trend === "up"
                      ? "text-green-600"
                      : metric.trend === "down"
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }`}
                >
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Available Reports */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium">Available Reports</h4>
          <div className="space-y-2">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-accent" />
                  <div>
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Last generated: {report.lastGenerated} • {report.size} • {report.format}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      report.status === "ready"
                        ? "text-green-600 border-green-600"
                        : report.status === "generating"
                          ? "text-accent border-accent"
                          : "text-muted-foreground border-muted"
                    }`}
                  >
                    {report.status === "generating" && generatingReport === report.id && (
                      <div className="w-3 h-3 mr-1">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-accent"></div>
                      </div>
                    )}
                    {report.status}
                  </Badge>
                  {report.status === "ready" ? (
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
                        <Share className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-3 bg-transparent"
                      onClick={() => generateReport(report.id)}
                      disabled={report.status === "generating"}
                    >
                      Generate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Templates */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-medium">Quick Report Templates</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center space-y-1 bg-transparent"
            >
              <AlertTriangle className="h-4 w-4 text-accent" />
              <span className="text-xs">Security Incidents</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center space-y-1 bg-transparent"
            >
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs">Performance Trends</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center space-y-1 bg-transparent"
            >
              <FileText className="h-4 w-4 text-accent" />
              <span className="text-xs">Compliance Audit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center space-y-1 bg-transparent"
            >
              <Download className="h-4 w-4 text-accent" />
              <span className="text-xs">Data Export</span>
            </Button>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Scheduled Reports</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded text-xs">
              <span>Daily Security Summary</span>
              <Badge variant="outline" className="text-xs">
                Every day at 6:00 AM
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 border rounded text-xs">
              <span>Weekly Performance Report</span>
              <Badge variant="outline" className="text-xs">
                Every Monday at 9:00 AM
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 border rounded text-xs">
              <span>Monthly Executive Summary</span>
              <Badge variant="outline" className="text-xs">
                1st of every month
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
