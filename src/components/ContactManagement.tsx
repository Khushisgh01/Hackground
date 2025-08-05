import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Phone,
  Mail,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  Heart,
  Home,
  AlertTriangle,
  MessageSquare,
  Video,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const mockContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Primary Caregiver",
    relationship: "Daughter",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    priority: "high",
    alertTypes: ["emergency", "wellness", "medication"],
    status: "active",
    responseTime: "2 min",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Healthcare Provider",
    relationship: "Doctor",
    phone: "+1 (555) 987-6543",
    email: "m.chen@hospital.com",
    priority: "high",
    alertTypes: ["emergency", "health"],
    status: "active",
    responseTime: "5 min",
  },
  {
    id: 3,
    name: "Robert Smith",
    role: "Emergency Contact",
    relationship: "Neighbor",
    phone: "+1 (555) 246-8135",
    email: "rob.smith@email.com",
    priority: "medium",
    alertTypes: ["emergency"],
    status: "active",
    responseTime: "15 min",
  },
  {
    id: 4,
    name: "Emergency Services",
    role: "Emergency Services",
    relationship: "Official",
    phone: "911",
    email: "",
    priority: "critical",
    alertTypes: ["emergency"],
    status: "active",
    responseTime: "Immediate",
  },
];

export const ContactManagement = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    relationship: "",
    phone: "",
    email: "",
    priority: "medium",
    alertTypes: [],
  });

  const getRoleBadge = (role: string, priority: string) => {
    const getVariant = () => {
      switch (priority) {
        case "critical":
          return "destructive";
        case "high":
          return "default";
        case "medium":
          return "secondary";
        default:
          return "outline";
      }
    };

    return <Badge variant={getVariant()}>{role}</Badge>;
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "primary caregiver":
        return <Heart className="w-5 h-5 text-primary" />;
      case "healthcare provider":
        return <Shield className="w-5 h-5 text-success" />;
      case "emergency contact":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "emergency services":
        return <Phone className="w-5 h-5 text-destructive" />;
      default:
        return <Users className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleAddContact = () => {
    const contact = {
      ...newContact,
      id: Date.now(),
      status: "active",
      responseTime: "Unknown",
    };
    setContacts([...contacts, contact]);
    setNewContact({
      name: "",
      role: "",
      relationship: "",
      phone: "",
      email: "",
      priority: "medium",
      alertTypes: [],
    });
    setIsAddDialogOpen(false);
    toast.success("Contact added successfully!");
  };

  const handleTestAlert = (contact: any) => {
    toast.info(`Test alert sent to ${contact.name}`);
  };

  const handleDeleteContact = (contactId: number) => {
    setContacts(contacts.filter(c => c.id !== contactId));
    toast.success("Contact removed");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-muted-foreground">
            Manage emergency contacts, caregivers, and notification preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Add a new emergency contact or caregiver to your network
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                      placeholder="e.g., Daughter"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => setNewContact({...newContact, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primary Caregiver">Primary Caregiver</SelectItem>
                      <SelectItem value="Healthcare Provider">Healthcare Provider</SelectItem>
                      <SelectItem value="Emergency Contact">Emergency Contact</SelectItem>
                      <SelectItem value="Family Member">Family Member</SelectItem>
                      <SelectItem value="Neighbor">Neighbor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={(value) => setNewContact({...newContact, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>

                <Button onClick={handleAddContact} className="w-full">
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Contact Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emergency Contacts</p>
                <p className="text-2xl font-bold text-destructive">
                  {contacts.filter(c => c.priority === "critical" || c.role.includes("Emergency")).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Caregivers</p>
                <p className="text-2xl font-bold text-primary">
                  {contacts.filter(c => c.role.includes("Caregiver") || c.role.includes("Healthcare")).length}
                </p>
              </div>
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Contacts</p>
                <p className="text-2xl font-bold text-success">
                  {contacts.filter(c => c.status === "active").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">Contact List</TabsTrigger>
          <TabsTrigger value="escalation">Alert Escalation</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <Card key={contact.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRoleIcon(contact.role)}
                      <div>
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        <CardDescription>{contact.relationship}</CardDescription>
                      </div>
                    </div>
                    {getRoleBadge(contact.role, contact.priority)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                    {contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{contact.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium">{contact.responseTime}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleTestAlert(contact)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Test
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="escalation" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Alert Escalation Matrix</CardTitle>
              <CardDescription>
                Configure how alerts are escalated based on response times and severity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive mb-3">Critical Emergency (Fall, Medical Emergency)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Step 1 (Immediate):</span>
                      <span>Emergency Services + Primary Caregiver</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Step 2 (If no response in 2 min):</span>
                      <span>All High Priority Contacts</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning mb-3">High Priority (Prolonged Inactivity)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Step 1 (Immediate):</span>
                      <span>Primary Caregiver</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Step 2 (If no response in 10 min):</span>
                      <span>Emergency Contacts</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary mb-3">Medium Priority (Wellness Alerts)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Step 1 (Immediate):</span>
                      <span>Primary Caregiver (Non-urgent notification)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Step 2 (If no response in 30 min):</span>
                      <span>Follow-up notification</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Quick Communications
                </CardTitle>
                <CardDescription>Send updates to your care network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="hero" className="w-full justify-start gap-3">
                  <CheckCircle className="w-5 h-5" />
                  Send "All Good" Update
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Heart className="w-5 h-5" />
                  Share Wellness Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Video className="w-5 h-5" />
                  Start Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  Request Check-in
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
                <CardDescription>Latest messages and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Sarah Johnson</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Received "All Good" update
                    </p>
                  </div>

                  <div className="p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Video className="w-4 h-4 text-primary" />
                      <span className="font-medium">Dr. Michael Chen</span>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Video consultation completed
                    </p>
                  </div>

                  <div className="p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="font-medium">Robert Smith</span>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Responded to wellness check
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};