import {
  Component,
  Database,
  Users,
  Cross,
  GraduationCap,
  Activity,
  House,
  MessageCircle,
} from "lucide-react";
import { Nav } from "./Nav";
import { useState } from "react";

export default function ListNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="h-screen sticky top-16">
      <div className="flex-1 flex-col ">
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Home",
              url: "/",
              icon: House,
            },
            {
              title: "Models",
              url: "/models",
              icon: Component,
            },
            {
              title: "Datasets",
              url: "/datasets",
              icon: Database,
            },
            {
              title: "Diseases",
              url: "/diseases",
              icon: Cross,
            },
            {
              title: "Competitions (soon)",
              url: "/competitions",
              icon: Activity,
            },
            {
              title: "Members (soon)",
              url: "/members",
              icon: Users,
            },

            {
              title: "Discussions (soon)",
              url: "/discussions",
              icon: MessageCircle,
            },
            {
              title: "Learn (soon)",
              url: "/learn",
              icon: GraduationCap,
            },
          ]}
        />
      </div>
    </div>
  );
}
