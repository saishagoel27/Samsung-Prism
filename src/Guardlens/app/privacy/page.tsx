"use client"

import { PrivacyDashboard } from "@/components/privacy-security/privacy-dashboard"
import { SecurityMonitor } from "@/components/privacy-security/security-monitor"
import { FederatedLearning } from "@/components/privacy-security/federated-learning"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, Lock, Users, Globe } from "lucide-react"
import Link from "next/link"

export default function PrivacySecurityPage() {
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
                  <h1 className="text-2xl font-bold text-foreground">Privacy & Security</h1>
                  <p className="text-sm text-muted-foreground">Comprehensive data protection and security monitoring</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Lock className="h-3 w-3 mr-1" />
                Secure
              </Badge>
              <Badge variant="outline" className="text-accent border-accent">
                <Users className="h-3 w-3 mr-1" />
                Privacy-First
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Privacy & Security Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Privacy-Preserving AI Architecture</CardTitle>
            <CardDescription>
              Our fraud detection system is built with privacy-by-design principles, ensuring complete data protection
              while maintaining high detection accuracy through advanced cryptographic techniques.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-muted-foreground">On-Device Processing</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">256-bit</div>
                <div className="text-sm text-muted-foreground">AES Encryption</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">Zero</div>
                <div className="text-sm text-muted-foreground">Data Breaches</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">GDPR</div>
                <div className="text-sm text-muted-foreground">Compliant</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security Components */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <PrivacyDashboard />
          </div>
          <div className="xl:col-span-1">
            <SecurityMonitor />
          </div>
          <div className="xl:col-span-1">
            <FederatedLearning />
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-accent" />
                <span>Privacy-Preserving Technologies</span>
              </CardTitle>
              <CardDescription>Advanced cryptographic and privacy techniques ensuring data protection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Cryptographic Foundations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Homomorphic encryption for computation on encrypted data</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Secure multi-party computation protocols</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Zero-knowledge proofs for verification</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Differential privacy mechanisms</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Compliance & Standards</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>GDPR Article 25 - Privacy by Design</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>CCPA compliance for California residents</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>ISO 27001 information security management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>SOC 2 Type II security controls</span>
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
