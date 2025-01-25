const MySoldProperty = () => {
    const soldProperties = [
        {
            title: "Luxury Apartment",
            location: "New York, USA",
            buyerEmail: "buyer1@example.com",
            buyerName: "John Doe",
            soldPrice: "$550,000"
        },
        {
            title: "Cozy Condo",
            location: "Los Angeles, USA",
            buyerEmail: "buyer2@example.com",
            buyerName: "Jane Smith",
            soldPrice: "$325,000"
        },
        {
            title: "Modern House",
            location: "Chicago, USA",
            buyerEmail: "buyer3@example.com",
            buyerName: "Michael Johnson",
            soldPrice: "$780,000"
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Sold Properties</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Property Title</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Location</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Buyer Email</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Buyer Name</th>
                        <th className="px-4 py-2 text-left border border-gray-300 bg-gray-100">Sold Price</th>
                    </tr>
                </thead>
                <tbody>
                    {soldProperties.map((property, index) => (
                        <tr key={index} className="odd:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">{property.title}</td>
                            <td className="px-4 py-2 border border-gray-300">{property.location}</td>
                            <td className="px-4 py-2 border border-gray-300">{property.buyerEmail}</td>
                            <td className="px-4 py-2 border border-gray-300">{property.buyerName}</td>
                            <td className="px-4 py-2 border border-gray-300">{property.soldPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySoldProperty;
