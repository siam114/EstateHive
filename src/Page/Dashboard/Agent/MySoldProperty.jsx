import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../Loading";

const MySoldProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["bought-properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bought-properties`);
      return data;
    },
    retry: false,
  });
  console.log(soldProperties);
  if (isLoading) return <Loading />;
  const totalSold = soldProperties.reduce((sum, item) => sum + item.offer_amount, 0);

  return (
    <div className="p-6">
      <article className="flex items-center gap-4 max-w-sm my-4 rounded-lg border border-gray-100 bg-slate-200 p-6">
        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">${totalSold}</p>

          <p className="text-sm text-gray-500">Total Sales</p>
        </div>
      </article>
      <h2 className="text-3xl font-bold mb-6">Sold Properties</h2>
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
              Sold Price
            </th>
          </tr>
        </thead>
        <tbody>
          {soldProperties.map((property, index) => (
            <tr key={index} className="odd:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">
                {property?.property?.name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {property?.property?.location}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {property.user.email}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {property.user.name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                ${property.offer_amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySoldProperty;
