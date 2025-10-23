import { Card } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { mockScenarios, mockVehicles } from "@/lib/mock-data"

export function StatsOverview() {
  const activeVehicles = mockVehicles.filter((v) => v.status === "active").length
  const ambiguousScenarios = mockScenarios.filter((s) => s.type === "ambiguous").length
  const avgResolutionTime = 8.4 // minutes
  const accuracyImprovement = 28 // percent

  const stats = [
    {
      label: "Active Vehicles",
      value: activeVehicles,
      total: mockVehicles.length,
      icon: Activity,
      color: "text-chart-1",
    },
    {
      label: "Requires Clarification",
      value: ambiguousScenarios,
      total: mockScenarios.length,
      icon: AlertTriangle,
      color: "text-chart-5",
    },
    {
      label: "Avg Resolution Time",
      value: `${avgResolutionTime}m`,
      subtext: "42% faster",
      icon: Clock,
      color: "text-chart-3",
    },
    {
      label: "Decision Accuracy",
      value: `+${accuracyImprovement}%`,
      subtext: "vs baseline",
      icon: CheckCircle2,
      color: "text-chart-2",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.total && <span className="text-sm text-muted-foreground">/ {stat.total}</span>}
              </div>
              {stat.subtext && <p className="text-xs text-muted-foreground">{stat.subtext}</p>}
            </div>
            <div className={cn("rounded-lg bg-secondary p-2", stat.color)}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
