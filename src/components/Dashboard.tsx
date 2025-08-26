import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Video,
  AlertTriangle,
  Heart,
  Users,
  CheckCircle,
  Clock,
  Activity,
  Eye,
  Wifi,
  Battery,
  Watch,
  Smartphone,
  Bell,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

export const Dashboard = ({ onTabChange }: DashboardProps) => {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-gradient-hero p-8 lg:p-12 text-primary-foreground"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(34, 197, 94, 0.8)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            AI-Powered Home Safety & Wellness
          </h1>
          <p className="text-xl mb-6 text-primary-foreground/90">
            Monitor your loved ones with intelligent activity recognition, instant alerts, 
            and comprehensive wellness tracking. Now with SmartWatch integration.
          </p>
          <div className="flex items-center gap-4 mb-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <Watch className="w-6 h-6" />
            <div>
              <p className="font-semibold">SmartWatch Connected</p>
              <p className="text-sm text-primary-foreground/80">Apple Watch, Fitbit, Garmin supported</p>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Live Sync
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => onTabChange("monitor")}
            >
              <Video className="w-5 h-5" />
              Start Monitoring
            </Button>
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => onTabChange("wellness")}
            >
              <Heart className="w-5 h-5" />
              View Wellness
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
            <div className="flex items-center mt-2 gap-2">
              <Wifi className="h-3 w-3 text-success" />
              <Battery className="h-3 w-3 text-success" />
              <span className="text-xs text-success">Connected</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Monitors</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">Cameras online</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
            <Badge variant="outline" className="mt-2 text-xs">
              Low Priority
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
            <Heart className="h-4 w-4 text-success animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">92%</div>
            <p className="text-xs text-muted-foreground">Above average</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <Activity className="h-3 w-3 text-success mr-1" />
                <span className="text-xs text-success">Excellent</span>
              </div>
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                <Watch className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SmartWatch Integration Panel */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-glow border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Watch className="w-6 h-6" />
            SmartWatch Health Monitoring
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Real-time health data from connected wearables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">72</div>
              <div className="text-sm text-primary-foreground/80">Heart Rate</div>
              <div className="flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-1"></div>
                <span className="text-xs">Normal</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">8,432</div>
              <div className="text-sm text-primary-foreground/80">Steps Today</div>
              <div className="text-xs mt-1">Goal: 10,000</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">7.5h</div>
              <div className="text-sm text-primary-foreground/80">Sleep Last Night</div>
              <div className="text-xs mt-1">Quality: Good</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-primary-foreground/80">SpO2 Level</div>
              <div className="text-xs mt-1">Excellent</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm">Last sync: 2 minutes ago</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Watch className="w-3 h-3 mr-1" />
                Apple Watch Series 9
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Activity Feed */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Live Activity Feed
            </CardTitle>
            <CardDescription>Real-time activity recognition updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20 hover:bg-success/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium">Safe Activity Detected</p>
                  <p className="text-sm text-muted-foreground">Living Room - Reading</p>
                  <Badge variant="outline" className="mt-1 text-xs bg-primary/10 text-primary border-primary/20">
                    <Watch className="w-3 h-3 mr-1" />
                    Heart rate stable
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{currentTime}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-success" />
                <div>
                  <p className="font-medium">Wellness Check-in</p>
                  <p className="text-sm text-muted-foreground">Daily health survey completed</p>
                  <Badge variant="outline" className="mt-1 text-xs bg-success/10 text-success border-success/20">
                    <Smartphone className="w-3 h-3 mr-1" />
                    Mobile app
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">10:30 AM</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">Medication Reminder</p>
                  <p className="text-sm text-muted-foreground">Morning pills taken on time</p>
                  <Badge variant="outline" className="mt-1 text-xs bg-primary/10 text-primary border-primary/20">
                    <Watch className="w-3 h-3 mr-1" />
                    Smart reminder
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">9:00 AM</span>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onTabChange("alerts")}
            >
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access key features and controls</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button 
              variant="safety" 
              className="h-24 flex-col gap-2 shadow-card hover:shadow-elegant transition-all duration-300"
              onClick={() => onTabChange("monitor")}
            >
              <div className="p-2 bg-white/20 rounded-full">
                <Video className="w-6 h-6" />
              </div>
              <span className="font-medium">Live Monitor</span>
              <Badge variant="secondary" className="text-xs">AI Vision</Badge>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 shadow-card hover:shadow-elegant transition-all duration-300 border-warning/20 hover:border-warning/40"
              onClick={() => onTabChange("alerts")}
            >
              <div className="p-2 bg-warning/10 rounded-full">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <span className="font-medium">Alert History</span>
              <Badge variant="secondary" className="text-xs">Real-time</Badge>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 shadow-card hover:shadow-elegant transition-all duration-300 border-primary/20 hover:border-primary/40"
              onClick={() => onTabChange("wellness")}
            >
              <div className="p-2 bg-primary/10 rounded-full">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium">Wellness Tracking</span>
              <Badge variant="secondary" className="text-xs">
                <Watch className="w-3 h-3 mr-1" />
                SmartWatch
              </Badge>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 shadow-card hover:shadow-elegant transition-all duration-300 border-secondary/20 hover:border-secondary/40"
              onClick={() => onTabChange("contacts")}
            >
              <div className="p-2 bg-secondary/10 rounded-full">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <span className="font-medium">Manage Contacts</span>
              <Badge variant="secondary" className="text-xs">Emergency</Badge>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};