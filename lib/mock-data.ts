import type { Vehicle, Scenario, TelemetryData, SensorSnapshot, AnomalyInsight } from "./types"

export const mockVehicles: Vehicle[] = [
  {
    id: "VEH-001",
    name: "Fleet Alpha-7",
    status: "alert",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "1234 Market St, San Francisco, CA",
    },
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "VEH-002",
    name: "Fleet Beta-3",
    status: "active",
    location: {
      lat: 37.7849,
      lng: -122.4094,
      address: "5678 Mission St, San Francisco, CA",
    },
    lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "VEH-003",
    name: "Fleet Gamma-9",
    status: "idle",
    location: {
      lat: 37.7649,
      lng: -122.4294,
      address: "9012 Valencia St, San Francisco, CA",
    },
    lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "VEH-004",
    name: "Fleet Delta-5",
    status: "maintenance",
    location: {
      lat: 37.7549,
      lng: -122.4394,
      address: "3456 Folsom St, San Francisco, CA",
    },
    lastUpdate: new Date(Date.now() - 45 * 60 * 1000),
  },
]

export const mockScenarios: Scenario[] = [
  {
    id: "SCN-001",
    vehicleId: "VEH-001",
    type: "ambiguous",
    severity: "high",
    title: "Unexpected Route Deviation",
    description: "Vehicle deviated from planned route by 2.3 miles. GPS signal intermittent.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    anomalyScore: 0.87,
    requiresClarification: true,
  },
  {
    id: "SCN-002",
    vehicleId: "VEH-002",
    type: "pending",
    severity: "medium",
    title: "Elevated Engine Temperature",
    description: "Engine temperature 15°F above normal operating range.",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    anomalyScore: 0.64,
    requiresClarification: true,
  },
  {
    id: "SCN-003",
    vehicleId: "VEH-001",
    type: "ambiguous",
    severity: "critical",
    title: "Rapid Deceleration Event",
    description: "Vehicle experienced sudden deceleration from 45mph to 0mph in 2.1 seconds.",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    anomalyScore: 0.92,
    requiresClarification: true,
  },
]

export const mockTelemetryData: Record<string, TelemetryData[]> = {
  "VEH-001": Array.from({ length: 50 }, (_, i) => ({
    timestamp: new Date(Date.now() - (50 - i) * 60 * 1000),
    speed: Math.max(0, 45 + Math.sin(i / 5) * 15 + (Math.random() - 0.5) * 10),
    fuelLevel: Math.max(20, 85 - i * 1.2),
    engineTemp: 195 + Math.sin(i / 3) * 10 + (Math.random() - 0.5) * 5,
    batteryVoltage: 13.8 + (Math.random() - 0.5) * 0.4,
    odometer: 45230 + i * 0.8,
  })),
  "VEH-002": Array.from({ length: 50 }, (_, i) => ({
    timestamp: new Date(Date.now() - (50 - i) * 60 * 1000),
    speed: Math.max(0, 35 + Math.sin(i / 4) * 12 + (Math.random() - 0.5) * 8),
    fuelLevel: Math.max(30, 92 - i * 0.9),
    engineTemp: 210 + Math.sin(i / 2) * 8 + (Math.random() - 0.5) * 6,
    batteryVoltage: 13.9 + (Math.random() - 0.5) * 0.3,
    odometer: 38450 + i * 0.6,
  })),
}

export const mockSensorSnapshots: SensorSnapshot[] = [
  {
    id: "SNAP-001",
    vehicleId: "VEH-001",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "camera",
    imageUrl: "/vehicle-front-camera-view-urban-street.jpg",
    metadata: {
      confidence: 0.89,
      detectedObjects: ["vehicle", "pedestrian", "traffic_light"],
    },
  },
  {
    id: "SNAP-002",
    vehicleId: "VEH-001",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    type: "camera",
    imageUrl: "/vehicle-rear-camera-view-intersection.jpg",
    metadata: {
      confidence: 0.92,
      detectedObjects: ["vehicle", "road_sign", "lane_marking"],
    },
  },
  {
    id: "SNAP-003",
    vehicleId: "VEH-002",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    type: "camera",
    imageUrl: "/vehicle-dashboard-warning-lights.jpg",
    metadata: {
      confidence: 0.85,
      detectedObjects: ["dashboard", "warning_indicator"],
    },
  },
]

export const mockAnomalyInsights: AnomalyInsight[] = [
  {
    id: "ANO-001",
    scenarioId: "SCN-001",
    type: "location",
    severity: "high",
    description:
      "GPS signal loss detected in area with known interference. Vehicle may have taken alternate route due to road closure.",
    recommendation: "Verify with driver. Check local traffic reports for road closures in area.",
    confidence: 0.78,
  },
  {
    id: "ANO-002",
    scenarioId: "SCN-001",
    type: "behavior",
    severity: "medium",
    description: "Route deviation pattern matches historical detour behavior during peak traffic hours.",
    recommendation: "Review traffic conditions at time of deviation. May be legitimate optimization.",
    confidence: 0.71,
  },
  {
    id: "ANO-003",
    scenarioId: "SCN-002",
    type: "temperature",
    severity: "medium",
    description:
      "Engine temperature elevation correlates with extended uphill driving and ambient temperature increase.",
    recommendation: "Monitor for next 30 minutes. Schedule maintenance check if temperature remains elevated.",
    confidence: 0.82,
  },
  {
    id: "ANO-004",
    scenarioId: "SCN-003",
    type: "speed",
    severity: "high",
    description: "Rapid deceleration event detected. ABS activation logged. No collision detected by impact sensors.",
    recommendation: "Emergency braking likely due to traffic hazard. Review camera footage and contact driver.",
    confidence: 0.91,
  },
]
