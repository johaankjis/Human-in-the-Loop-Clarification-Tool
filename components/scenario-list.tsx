"use client"

import { mockScenarios, mockVehicles } from "@/lib/mock-data"
import type { Scenario } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScenarioListProps {
  selectedScenarioId?: string
  onSelectScenario: (scenario: Scenario) => void
}

export function ScenarioList({ selectedScenarioId, onSelectScenario }: ScenarioListProps) {
  const getSeverityColor = (severity: Scenario["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-chart-5 text-white"
      case "medium":
        return "bg-chart-4 text-white"
      case "low":
        return "bg-chart-3 text-white"
    }
  }

  const getStatusColor = (type: Scenario["type"]) => {
    switch (type) {
      case "ambiguous":
        return "border-chart-5"
      case "pending":
        return "border-chart-4"
      case "resolved":
        return "border-chart-3"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Active Scenarios</h2>
        <Badge variant="secondary" className="font-mono text-xs">
          {mockScenarios.length}
        </Badge>
      </div>

      <div className="space-y-2">
        {mockScenarios.map((scenario) => {
          const vehicle = mockVehicles.find((v) => v.id === scenario.vehicleId)
          const isSelected = selectedScenarioId === scenario.id

          return (
            <Card
              key={scenario.id}
              className={cn(
                "cursor-pointer border-l-4 p-4 transition-all hover:bg-secondary/50",
                getStatusColor(scenario.type),
                isSelected && "bg-secondary ring-2 ring-primary",
              )}
              onClick={() => onSelectScenario(scenario)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-chart-5" />
                      <h3 className="text-sm font-semibold text-foreground">{scenario.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{scenario.description}</p>
                  </div>
                  <Badge className={cn("text-xs", getSeverityColor(scenario.severity))}>
                    {scenario.severity.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="font-mono">{vehicle?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-mono">{(scenario.anomalyScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(scenario.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
