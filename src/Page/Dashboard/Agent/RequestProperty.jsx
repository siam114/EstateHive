import { useState } from "react";

const RequestProperty = () => {
    const [offers, setOffers] = useState([
        {
            propertyTitle: "Luxury Apartment",
            location: "New York, USA",
            buyerEmail: "buyer1@example.com",
            buyerName: "John Doe",
            offeredPrice: "$550,000",
            status: "pending"
        },
        {
            propertyTitle: "Cozy Condo",
            location: "Los Angeles, USA",
            buyerEmail: "buyer2@example.com",
            buyerName: "Jane Smith",
            offeredPrice: "$325,000",
            status: "pending"
        },
        {
            propertyTitle: "Modern House",
            location: "Chicago, USA",
            buyerEmail: "buyer3@example.com",
            buyerName: "Michael Johnson",
            offeredPrice: "$780,000",
            status: "pending"
        }
    ]);

    const handleAccept = (index) => {
        let updatedOffers = [...offers];
        updatedOffers[index].status = "accepted";
        // Reject other offers for the same property
        updatedOffers = updatedOffers.map((offer, i) =>
            i !== index && offer.propertyTitle === updatedOffers[index].propertyTitle
                ? { ...offer, status: "rejected" }
                : offer
        );
        setOffers(updatedOffers);
    };

    const handleReject = (index) => {
        let updatedOffers = [...offers];
        updatedOffers[index].status = "rejected";
        setOffers(updatedOffers);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Requested/Offered Properties</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Property Title</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Location</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Buyer Email</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Buyer Name</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Offered Price</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Status</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((offer, index) => (
                        <tr key={index} className="odd:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">{offer.propertyTitle}</td>
                            <td className="px-4 py-2 border border-gray-300">{offer.location}</td>
                            <td className="px-4 py-2 border border-gray-300">{offer.buyerEmail}</td>
                            <td className="px-4 py-2 border border-gray-300">{offer.buyerName}</td>
                            <td className="px-4 py-2 border border-gray-300">{offer.offeredPrice}</td>
                            <td className="px-4 py-2 border border-gray-300">{offer.status}</td>
                            <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                                {offer.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => handleAccept(index)}
                                            className="bg-green-500 text-white px-4 py-2 rounded w-32"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(index)}
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
