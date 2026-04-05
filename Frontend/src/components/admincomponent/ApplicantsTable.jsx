import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!applicants || applicants.applications?.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg font-medium">
        No applicants yet.
      </p>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-xl border-white/20 mt-8">
      <Table className="min-w-full">
        <TableCaption className="text-center text-gray-600 py-2">
          Recently Applied Users
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="px-4 py-3 text-left text-gray-700">
              Full Name
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-gray-700">
              Email
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-gray-700">
              Contact
            </TableHead>
            <TableHead className="px-4 py-3 text-left text-gray-700">
              Date
            </TableHead>
            <TableHead className="px-4 py-3 text-right text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {applicants.applications.map((item) => (
            <TableRow
              key={item._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableCell className="px-4 py-3">
                {item?.applicant?.fullname || "N/A"}
              </TableCell>
              <TableCell className="px-4 py-3">
                {item?.applicant?.email || "N/A"}
              </TableCell>
              <TableCell className="px-4 py-3">
                {item?.applicant?.phoneNumber || "N/A"}
              </TableCell>
              <TableCell className="px-4 py-3">
                {item?.applicant?.createdAt
                  ? new Date(item.applicant.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell className="px-4 py-3 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-gray-700" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 p-2 bg-white shadow-lg rounded-md">
                    {shortlistingStatus.map((status) => (
                      <div
                        key={status}
                        onClick={() => statusHandler(status, item._id)}
                        className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-100 rounded"
                      >
                        <input
                          type="radio"
                          name={`status-${item._id}`}
                          value={status}
                          className="cursor-pointer"
                        />
                        <span className="text-gray-700">{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
