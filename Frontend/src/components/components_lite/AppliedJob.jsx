import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white/50">
      <Table>
        <TableCaption className="pb-4 italic text-sm text-gray-400">
          Tracking your career journey — one application at a time.
        </TableCaption>
        <TableHeader className="bg-gray-50/80">
          <TableRow>
            <TableHead className="font-bold text-gray-700">Date</TableHead>
            <TableHead className="font-bold text-gray-700">Job Title</TableHead>
            <TableHead className="font-bold text-gray-700">Company</TableHead>
            <TableHead className="font-bold text-gray-700 text-center">Applicants</TableHead>
            <TableHead className="text-right font-bold text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-gray-400 italic">
                You haven't applied to any jobs yet. Start your search now!
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-purple-50/30 transition-colors">
                <TableCell className="text-gray-500 font-medium">
                  {new Date(appliedJob?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-bold text-gray-900 group-hover:text-aura transition-colors">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-gray-600 font-medium">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-indigo-100 font-bold px-3">
                    {appliedJob.job?.applications?.length || 0} Applied
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`capitalize px-4 py-1.5 rounded-full shadow-sm text-[12px] font-bold ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-100 text-red-600 border-red-200"
                        : appliedJob?.status === "accepted"
                        ? "bg-green-100 text-green-600 border-green-200"
                        : "bg-blue-100 text-blue-600 border-blue-200"
                    }`}
                  >
                    {appliedJob?.status}
                  </Badge>
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
