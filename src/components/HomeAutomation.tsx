import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Lightbulb,
  Lock,
  Thermometer,
  Shield,
  Camera,
  Wifi,
  Battery,
  Power,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const smartDevices = [
  {
    id: 1,
    name: "Living Room Lights",
    type: "lighting",
    room: "Living Room",
    status: "on",
    brightness: 75,
    connected: true,
    battery: null,
  },
  {
    id: 2,
    name: "Front Door Lock",
    type: "security",
    room: "Entrance",
    status: "locked",
    connected: true,
    battery: 85,
  },
  {
    id: 3,
    name: "Thermostat",
    type: "climate",
    room: "Main",
    status: "auto",
    temperature: 72,
    connected: true,
    battery: null,
  },
  {
    id: 4,
    name: "Security Camera",
    type: "security",
    room: "Front Yard",
    status: "recording",
    connected: true,
    battery: null,
  },
  {
    id: 5,
    name: "Smart Speaker",
    type: "entertainment",
    room: "Living Room",
    status: "idle",
    connected: true,
    battery: null,
  },
];

const automationRules = [
  {
    id: 1,
    name: "Emergency Response",
    description: "Turn on all lights and unlock doors during emergency alerts",
    trigger: "Emergency Alert",
    actions: ["Turn on all lights", "Unlock front door", "Sound alarm"],
    enabled: true,
    priority: "critical",
  },
  {
    id: 2,
    name: "Nighttime Security",
    description: "Activate security mode when no activity detected after 10 PM",
    trigger: "Time: 10:00 PM + No Activity",
    actions: ["Lock all doors", "Turn off lights", "Arm security system"],
    enabled: true,
    priority: "high",
  },
  {
    id: 3,
    name: "Morning Routine",
    description: "Gradual lighting and temperature adjustment for wake-up",
    trigger: "6:00 AM",
    actions: ["Gradually increase lights", "Adjust temperature to 70°F"],
    enabled: true,
    priority: "medium",
  },
  {
    id: 4,
    name: "Fall Detection Response",
    description: "Immediate safety measures when fall is detected",
    trigger: "Fall Detected",
    actions: ["Turn on all lights", "Unlock doors", "Call emergency contacts"],
    enabled: true,
    priority: "critical",
  },
];

export const HomeAutomation = () => {
  const [devices, setDevices] = useState(smartDevices);
  const [rules, setRules] = useState(automationRules);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "lighting":
        return <Lightbulb className="w-5 h-5 text-warning" />;
      case "security":
        return <Shield className="w-5 h-5 text-primary" />;
      case "climate":
        return <Thermometer className="w-5 h-5 text-primary" />;
      case "entertainment":
        return <Home className="w-5 h-5 text-success" />;
      default:
        return <Power className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const toggleDevice = (deviceId: number) => {
    setDevices(prev => prev.map(device => {
      if (device.id === deviceId) {
        const newStatus = device.status === "on" ? "off" : "on";
        toast.success(`${device.name} turned ${newStatus}`);
        return { ...device, status: newStatus };
      }
      return device;
    }));
  };

  const toggleRule = (ruleId: number) => {
    setRules(prev => prev.map(rule => {
      if (rule.id === ruleId) {
        const newEnabled = !rule.enabled;
        toast.success(`${rule.name} ${newEnabled ? "enabled" : "disabled"}`);
        return { ...rule, enabled: newEnabled };
      }
      return rule;
    }));
  };

  const triggerEmergencyMode = () => {
    toast.error("Emergency mode activated! All safety protocols initiated.");
  };

  const getRulePriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge variant="default">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Home Automation</h1>
          <p className="text-muted-foreground">
            Control smart devices and configure automated safety responses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="destructive" onClick={triggerEmergencyMode}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency Mode
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Device Settings
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected Devices</p>
                <p className="text-2xl font-bold text-success">
                  {devices.filter(d => d.connected).length}/{devices.length}
                </p>
              </div>
              <Wifi className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-primary">
                  {rules.filter(r => r.enabled).length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Status</p>
                <p className="text-2xl font-bold text-success">Armed</p>
              </div>
              <Shield className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Energy Efficiency</p>
                <p className="text-2xl font-bold text-warning">89%</p>
              </div>
              <Battery className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="devices">Smart Devices</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="scenarios">Emergency Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <Card key={device.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.type)}
                      <div>
                        <CardTitle className="text-lg">{device.name}</CardTitle>
                        <CardDescription>{device.room}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={device.connected ? "default" : "destructive"}>
                      {device.connected ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {device.type === "lighting" && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Power</span>
                          <Switch
                            checked={device.status === "on"}
                            onCheckedChange={() => toggleDevice(device.id)}
                          />
                        </div>
                        {device.status === "on" && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Brightness</span>
                              <span className="text-sm font-medium">{device.brightness}%</span>
                            </div>
                            <Slider
                              value={[device.brightness]}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {device.type === "security" && device.name.includes("Lock") && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status</span>
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm font-medium capitalize">{device.status}</span>
                        </div>
                      </div>
                    )}

                    {device.type === "climate" && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Temperature</span>
                          <span className="text-sm font-medium">{device.temperature}°F</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mode</span>
                          <span className="text-sm font-medium capitalize">{device.status}</span>
                        </div>
                      </>
                    )}

                    {device.type === "security" && device.name.includes("Camera") && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status</span>
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm font-medium capitalize">{device.status}</span>
                        </div>
                      </div>
                    )}

                    {device.battery !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Battery</span>
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4" />
                          <span className="text-sm font-medium">{device.battery}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="space-y-4">
            {rules.map((rule) => (
              <Card key={rule.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{rule.name}</h3>
                        {getRulePriorityBadge(rule.priority)}
                      </div>
                      <p className="text-muted-foreground">{rule.description}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Trigger:</h4>
                          <div className="flex items-center gap-2 p-2 bg-accent rounded">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm">{rule.trigger}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Actions:</h4>
                          <div className="space-y-1">
                            {rule.actions.map((action, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-accent rounded">
                                <CheckCircle className="w-4 h-4 text-success" />
                                <span className="text-sm">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Fall Detection Response
                </CardTitle>
                <CardDescription>Automated response when a fall is detected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    <span className="text-sm">Turn on all lights to maximum brightness</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Unlock front door for emergency access</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">Sound emergency alarm</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
                    <Camera className="w-4 h-4 text-primary" />
                    <span className="text-sm">Start recording all cameras</span>
                  </div>
                </div>
                <Button variant="destructive" className="w-full">
                  Test Fall Response
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Shield className="w-5 h-5" />
                  Security Breach Response
                </CardTitle>
                <CardDescription>Automated response for security alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Lock all doors and windows</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    <span className="text-sm">Activate security lighting</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <Camera className="w-4 h-4 text-primary" />
                    <span className="text-sm">Start recording all cameras</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">Send alert to security contacts</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Test Security Response
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <Clock className="w-5 h-5" />
                  Medication Reminder
                </CardTitle>
                <CardDescription>Gentle reminders for medication times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    <span className="text-sm">Gentle lighting adjustment</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-lg">
                    <Home className="w-4 h-4 text-success" />
                    <span className="text-sm">Play medication reminder chime</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm">Send notification to caregivers</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Test Reminder System
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-5 h-5" />
                  All Clear Mode
                </CardTitle>
                <CardDescription>Reset all systems to normal operation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    <span className="text-sm">Return lighting to normal levels</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Restore security settings</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                    <Camera className="w-4 h-4 text-primary" />
                    <span className="text-sm">Resume normal monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Send all clear notification</span>
                  </div>
                </div>
                <Button variant="success" className="w-full">
                  Activate All Clear
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};