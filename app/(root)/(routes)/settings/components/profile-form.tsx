"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { thingsboard } from "@/lib/tbClient";
import { selectAuthUser } from "@/redux/services/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";

const ProfileFormSchema = z.object({
  firstName: z.string().min(1),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const authUser = useSelector(selectAuthUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (authUser?.data) {
      form.setValue("firstName", authUser.data.firstName);
    }
  }, [authUser]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      setLoading(true);
      toast.success("Coming soon");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Display Name" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full bg-gray-900" disabled={loading}>
          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
