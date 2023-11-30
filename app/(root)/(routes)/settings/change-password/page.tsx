"use client";

import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "../components/change-password-form";

const SettingsPage = () => {
  return (
    <>
      <div className="space-y-6">
        <Heading title="Change Password" description="" />
        <Separator />
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default SettingsPage;
