"use client";

import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import ProfileForm from "./components/profile-form";

const SettingsPage = () => {
  return (
    <>
      <div className="space-y-6">
        <Heading
          title="Profile"
          description="This is how others will see you on the site"
        />
        <Separator />
        <ProfileForm />
      </div>
    </>
  );
};

export default SettingsPage;
