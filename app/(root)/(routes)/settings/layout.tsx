import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Settings, User } from "lucide-react";
import { SidebarNav } from "./components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
    icon: <User />,
  },
  {
    title: "Password",
    href: "/settings/change-password",
    icon: <Settings />,
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="space-y-6">
        <Heading title="Settings" description="Manage your account settings" />
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;
