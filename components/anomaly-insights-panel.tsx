"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, TrendingUp, AlertCircle } from "lucide-react"
import type { AnomalyInsight } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AnomalyInsightsPanelProps {
  insights: AnomalyInsight[]
}

export function AnomalyInsightsPanel({ insights }: AnomalyInsightsPanelProps) {
  const getSeverityColor = (severity: AnomalyInsight["severity"]) => {
    switch (severity) {
      case "high":
        return "border-chart-5 bg-chart-5/10"
      case "medium":
        return "border-chart-4 bg-chart-4/10"
      case "low":
        return "border-chart-3 bg-chart-3/10"
    }
  }

  const getSeverityBadgeColor = (severity: AnomalyInsight["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-chart-5 text-white"
      case "medium":
        return "bg-chart-4 text-white"
      case "low":
        return "bg-chart-3 text-white"
    }
  }

  const getTypeIcon = (type: AnomalyInsight["type"]) => {
    switch (type) {
      case "speed":
      case "behavior":
        return TrendingUp
      case "temperature":
      case "fuel":
        return AlertCircle
      default:
        return Brain
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-secondary p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">AI-Powered Insights</h3>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {insights.length} Insights
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-4 w-4 text-primary" />
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold text-foreground">Anomaly Detection Active</p>
              <p className="text-xs text-muted-foreground">
                Machine learning models analyzing telemetry patterns to provide contextual recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {insights.map((insight) => {
            const TypeIcon = getTypeIcon(insight.type)

            return (
              <div key={insight.id} className={cn("rounded-lg border-l-4 p-4", getSeverityColor(insight.severity))}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <div className="rounded-lg bg-secondary p-1.5">
                        <TypeIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs uppercase">
                            {insight.type}
                          </Badge>
                          <Badge className={cn("text-xs", getSeverityBadgeColor(insight.severity))}>
                            {insight.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-secondary/50 p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="mt-0.5 h-3 w-3 text-chart-2" />
                      <div className="flex-1 space-y-1">
                        <p className="text-xs font-semibold text-foreground">Recommendation</p>
                        <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-full max-w-[100px] overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-primary" style={{ width: `${insight.confidence * 100}%` }} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {(insight.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
