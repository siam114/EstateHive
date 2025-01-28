import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../Loading";
import isSuccessful from "./../../../helper/status";
import toast from "react-hot-toast";

const RequestProperty = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch offers data
  const {
    data: offers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["offered-properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offered-properties`);
      return data;
    },
    retry: false,
  });


  if (isLoading) return <Loading />;

  const handleStatusChange = async (offerId, status, propertyId) => {
    try {
      const res = await axiosSecure.patch(`offered-property/update`, {
        offerId,
        status,
        propertyId,
      });
      if (isSuccessful(res.status)) {
        toast.success(
          `Offer ${status == "ACCEPTED" ? "accepted" : "rejected"} successfully`
        );
      }
      refetch();
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Requested/Offered Properties</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">
              Property Title
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">
              Location
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">
              Buyer Email
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">
              Buyer Name
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">
              Offered Price
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">
              Status
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr key={index} className="odd:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">
                {offer?.property?.name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {offer?.property?.location}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {offer?.user?.email}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {offer?.user?.name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                ${offer?.offer_amount}
              </td>
              <td className="px-4 py-2 border border-gray-300">
              <button
                      disabled
                      className={` ${
                        offer?.status == "ACCEPTED"
                          ? "bg-green-200"
                          : offer.status == "PAID" ? 'bg-blue-200' : 'bg-red-200'
                      } text-black font-semibold px-4 py-2 rounded w-32 mx-auto`}
                    >
                      {offer?.status}
                    </button>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                {offer?.status === "PENDING" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          offer._id,
                          "ACCEPTED",
                          offer?.property?._id
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded w-32"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          offer._id,
                          "REJECTED",
                          offer?.property?._id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded w-32"
                    >
                      Reject
                    </button>
                  </>
              
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestProperty;
