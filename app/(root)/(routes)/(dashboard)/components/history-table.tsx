import { DataTable } from "@/components/ui/data-table";
import { thingsboard } from "@/lib/tbClient";
import { ColumnDef } from "@tanstack/react-table";
import { Loader } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { TbEntity } from "thingsboard-api-client";

interface HistoryTableProps {
  entityId: string;
  entityType: TbEntity;
  keys: string;
  startTs: number;
  endTs: number;
}

const HistoryTable = ({
  entityId,
  entityType,
  keys,
  startTs,
  endTs,
}: HistoryTableProps) => {
  const [dataFormatTable, setDataFormatTable] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "idx",
      header: "",
      cell: ({ row }) => <p className="text-center">{row.getValue("idx")}</p>,
    },
    {
      accessorKey: "ts",
      header: "Thời gian",
    },
    {
      accessorKey: "latitude",
      header: "Vĩ Độ",
    },
    {
      accessorKey: "longitude",
      header: "Kinh Độ",
    },
    {
      accessorKey: "",
      header: "Vị trí googlemap",
      cell: ({ row }) => {
        const url = `https://maps.google.com/?q=${row.getValue(
          "latitude"
        )},${row.getValue("longitude")}`;
        return (
          <Link href={url} className="font-medium text-blue-500">
            {url}
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
    const getData = async () => {
      setLoading(true);
      try {
        const data = await thingsboard.telemetry().getTimeseries(
          token,
          {
            entityId,
            entityType,
          },
          {
            keys,
            startTs,
            endTs,
          }
        );
        const formatData = formattedData(data);
        setDataFormatTable(formatData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [endTs, entityId, entityType, keys, startTs]);

  const formattedData = (data: any) => {
    return data["history"].map((val: any, idx: number) => {
      const { latitude, longitude } = JSON.parse(val.value);
      return {
        idx: idx + 1,
        ts: moment(val.ts).format("HH:mm:ss DD-MM-YYYY"),
        latitude,
        longitude,
      };
    });
  };

  return (
    <div className="container mx-auto">
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {dataFormatTable != null && (
        <DataTable columns={columns} data={dataFormatTable} />
      )}
    </div>
  );
};

export default HistoryTable;
