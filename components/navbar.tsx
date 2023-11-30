"use client";

import { Button } from "@/components/ui/button";
import { getAuthUser, selectAuthUser } from "@/redux/services/auth.slice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "./main-nav";

const Navbar = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector(selectAuthUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    } else {
      dispatch(getAuthUser(token));
    }
  }, []);

  useEffect(() => {
    if (authUser.error) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [authUser]);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4 gap-2">
          <div className="flex flex-col text-right">
            <span>
              {authUser?.data ? `Hi, ${authUser.data.firstName}` : ``}
            </span>
            <span className="text-xs">
              {authUser?.data ? `${authUser.data.authority}` : ``}
            </span>
          </div>
          <Link href={"/logout"}>
            <Button>Logout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
