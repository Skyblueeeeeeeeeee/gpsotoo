import { Button } from "@/components/ui/button";
import {
  getTimeseries,
  selectTelemetryTimeseries,
} from "@/redux/services/telemetry.slice";
import { AppDispatch } from "@/redux/store";
import { ColumnDef } from "@tanstack/react-table";
import { Loader, MapPin, Timer, WholeWord } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbEntity } from "thingsboard-api-client";
import { DataTable } from "@/components/ui/data-table";
import toast from "react-hot-toast";
import { thingsboard } from "@/lib/tbClient";

interface TelemetryTableProps {
  entityId: string;
  entityType: TbEntity;
  keys: string;
  startTs: number;
  endTs: number;
}

const formattedData = (data: any) => {
  return data["latitude"].map((val: any, idx: number) => ({
    idx: idx + 1,
    ts: moment(data["latitude"][idx].ts).format("HH:mm:ss DD-MM-YYYY"),
    latitude: data["latitude"][idx].value,
    longitude: data["longitude"][idx].value,
  }));
};

const TelemetryTable = ({
  entityId,
  entityType,
  keys,
  startTs,
  endTs,
}: TelemetryTableProps) => {
  const [dataFormatTable, setDataFormatTable] = useState() as any;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectTelemetryTimeseries);

  const onClickURL = async (latitude: string, longitude: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/login");
      }
      await thingsboard.telemetry().saveEntityTelemetry(
        token,
        {
          entityId,
          entityType,
        },
        {
          history: JSON.stringify({
            latitude,
            longitude,
          }),
        }
      );
    } catch {
      toast.error("Saved to history");
    } finally {
      toast.success("Saved to history");
      router.refresh();
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "idx",
      header: "",
      cell: ({ row }) => <p className="text-center">{row.getValue("idx")}</p>,
    },
    {
      accessorKey: "latitude",
      header: "Latitude",
    },
    {
      accessorKey: "longitude",
      header: "Longitude",
    },
    {
      accessorKey: "ts",
      header: "Time",
    },
    {
      accessorKey: "",
      header: "Mapped pin",
      cell: ({ row }) => {
        const url = `https://maps.google.com/?q=${row.getValue(
          "latitude"
        )},${row.getValue("longitude")}`;
        return (
          <Button
            variant={"link"}
            className="px-0"
            onClick={() =>
              onClickURL(row.getValue("latitude"), row.getValue("longitude"))
            }
          >
            <Link
              href={url}
              target="_blank"
              className="font-medium text-blue-500"
            >
              {url}
            </Link>
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
    dispatch(
      getTimeseries({
        token,
        path: {
          entityId,
          entityType,
        },
        query: {
          keys,
          startTs,
          endTs,
        },
      })
    );
  }, [dispatch, endTs, entityId, entityType, keys, startTs]);

  useEffect(() => {
    setLoading(data.loading);
  }, [data.loading]);

  useEffect(() => {
    if (!!data?.data && Object.keys(data?.data).length > 0) {
      const formatData = formattedData(data.data);
      setDataFormatTable(formatData);
    }
  }, [data.data]);

  return (
    <div className="container mx-auto">
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {dataFormatTable != null && (
        <DataTable columns={columns} data={dataFormatTable} />
      )}
    </div>
  );
};

export default TelemetryTable;
