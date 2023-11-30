"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      toast.success("Logout success");
      router.push("/login");
    }
  }, [router]);
};

export default LogoutPage;
