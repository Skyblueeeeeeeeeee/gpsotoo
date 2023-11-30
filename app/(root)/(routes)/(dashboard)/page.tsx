"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDeviceId, selectDeviceId } from "@/redux/services/device.slice";
import { AppDispatch } from "@/redux/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbEntity } from "thingsboard-api-client";
import HistoryTable from "./components/history-table";
import TelemetryTable from "./components/telemetry-table";

const deviceId = "704147a0-82b2-11ee-9abd-09c043ac25d0";
const keys = "latitude,longitude";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const deviceById = useSelector(selectDeviceId);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }

    if (!deviceById?.data) {
      dispatch(getDeviceId({ token, path: { deviceId } }));
    }
  }, []);

  const now = Date.now();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{deviceById?.data?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <TelemetryTable
            entityId={deviceId}
            entityType={TbEntity.DEVICE}
            keys={keys}
            startTs={0}
            endTs={now}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Click History</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryTable
            entityId={deviceId}
            entityType={TbEntity.DEVICE}
            keys={"history"}
            startTs={0}
            endTs={now}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
