import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { LiveMonitor } from "@/components/LiveMonitor";
import { AlertSystem } from "@/components/AlertSystem";
import { WellnessTracking } from "@/components/WellnessTracking";
import { ContactManagement } from "@/components/ContactManagement";
import { HomeAutomation } from "@/components/HomeAutomation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onTabChange={setActiveTab} />;
      case "monitor":
        return <LiveMonitor />;
      case "alerts":
        return <AlertSystem />;
      case "wellness":
        return <WellnessTracking />;
      case "contacts":
        return <ContactManagement />;
      case "automation":
        return <HomeAutomation />;
      case "communication":
        return <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Communication Center</h2>
          <p className="text-muted-foreground">Two-way communication features coming soon!</p>
        </div>;
      case "settings":
        return <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p className="text-muted-foreground">System configuration and preferences.</p>
        </div>;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
