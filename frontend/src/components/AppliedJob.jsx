import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { useSelector } from "react-redux";
import { Briefcase } from "lucide-react";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-16">
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <Briefcase className="w-10 h-10 mb-3 opacity-30" />
                  <p className="font-semibold text-slate-500">
                    No applications yet
                  </p>
                  <p className="text-xs mt-1">
                    Jobs you apply to will show up here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item?.createdAt.slice(0, 10)}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell>
                  {(() => {
                    const status = item.status?.toLowerCase();
                    const styles = {
                      accepted:
                        "bg-emerald-50 border-emerald-200 text-emerald-700",
                      rejected: "bg-red-50 border-red-200 text-red-500",
                      pending: "bg-amber-50 border-amber-200 text-amber-600",
                    };
                    const dots = {
                      accepted: "bg-emerald-500",
                      rejected: "bg-red-400",
                      pending: "bg-amber-400",
                    };
                    return (
                      <span
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all duration-200 cursor-default ${styles[status] || "bg-slate-50 border-slate-200 text-slate-500"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-slate-400"}`}
                        />
                        <span className="capitalize">{item.status}</span>
                      </span>
                    );
                  })()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
