// src/pages/Index.tsx

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { LiveMonitor } from "@/components/LiveMonitor";
import { AlertSystem } from "@/components/AlertSystem";
import { WellnessTracking } from "@/components/WellnessTracking";
import { ContactManagement } from "@/components/ContactManagement";
import { UserProfile } from "@/components/UserProfile";
import { ActivityLog } from "@/components/ActivityLog"; // Import the new component

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
      case "activity-log": // Add case for the new component
        return <ActivityLog />;
      case "wellness":
        return <WellnessTracking />;
      case "contacts":
        return <ContactManagement />;
      case "profile":
        return <UserProfile />;
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