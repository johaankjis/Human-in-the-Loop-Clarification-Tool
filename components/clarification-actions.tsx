"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, MessageSquare, Clock, User } from "lucide-react"
import type { Scenario } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ClarificationActionsProps {
  scenario: Scenario
  onResolve: (resolution: string, notes: string) => void
}

export function ClarificationActions({ scenario, onResolve }: ClarificationActionsProps) {
  const [notes, setNotes] = useState("")
  const [selectedResolution, setSelectedResolution] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resolutionOptions = [
    {
      id: "legitimate",
      label: "Legitimate Action",
      description: "Scenario is normal and requires no intervention",
      icon: CheckCircle2,
      color: "text-chart-3",
    },
    {
      id: "requires-attention",
      label: "Requires Attention",
      description: "Escalate to supervisor or dispatch team",
      icon: MessageSquare,
      color: "text-chart-4",
    },
    {
      id: "false-positive",
      label: "False Positive",
      description: "Anomaly detection error, no action needed",
      icon: XCircle,
      color: "text-muted-foreground",
    },
  ]

  const handleSubmit = async () => {
    if (!selectedResolution) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onResolve(selectedResolution, notes)
    setIsSubmitting(false)
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-secondary p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Clarification Workflow</h3>
          </div>
          {scenario.requiresClarification && (
            <Badge variant="outline" className="animate-pulse border-chart-5 text-chart-5">
              Action Required
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-background p-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs font-semibold text-foreground">Scenario Details</p>
                <p className="text-sm text-foreground">{scenario.title}</p>
                <p className="text-xs text-muted-foreground">{scenario.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Select Resolution
            </label>
            <div className="space-y-2">
              {resolutionOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedResolution(option.id)}
                  className={cn(
                    "w-full rounded-lg border-2 p-3 text-left transition-all hover:bg-secondary/50",
                    selectedResolution === option.id ? "border-primary bg-primary/10" : "border-border bg-secondary/30",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("rounded-lg bg-background p-2", option.color)}>
                      <option.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Operator Notes
            </label>
            <Textarea
              id="notes"
              placeholder="Add any additional context or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!selectedResolution || isSubmitting} className="flex-1" size="lg">
              {isSubmitting ? "Submitting..." : "Submit Resolution"}
            </Button>
            <Button variant="outline" size="lg" disabled={isSubmitting}>
              Request Backup
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-start gap-2">
              <User className="mt-0.5 h-3 w-3 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-xs font-semibold text-foreground">Operator: J. Martinez</p>
                <p className="text-xs text-muted-foreground">
                  Your decision will be logged and used to improve anomaly detection accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
