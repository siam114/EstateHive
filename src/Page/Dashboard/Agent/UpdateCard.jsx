import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import { useAuth } from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { shortImageName } from "../../../utilitis";
import { TbFidgetSpinner } from "react-icons/tb";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const UpdateCard = () => {
  const queryClient = useQueryClient();
  const { description, _id, location, max_price, min_price, name } =
    useLoaderData();
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState({ name: "Choose Image" });
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const min_price = parseFloat(form.min_price.value);
    const max_price = parseFloat(form.max_price.value);
    const location = form.location.value;
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    //agent info
    const agent_id = user._id;

    //create property data object
    const propertyData = {
      name,
      description,
      min_price,
      max_price,
      location,
      image: imageUrl,
      agent_id,
    };

    //update property in db
    try {
      //post req
      await axiosSecure.patch(`/properties/${_id}`, propertyData);
      toast.success("Property updated Successfully!");
      await queryClient.resetQueries({ queryKey: ["properties"], exact: false });
      navigate('/dashboard/myAdded')
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <h2 className="pb-10 text-4xl font-bold">Update Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#363e9483] focus:outline-[#363e94af] rounded-md bg-white"
                name="name"
                defaultValue={name}
                id="name"
                type="text"
                placeholder="Property title"
                required
              />
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                defaultValue={description}
                placeholder="Write product description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-[#363e9483] bg-white focus:outline-[#363e94af] "
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex flex-col items-center gap-4">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <div className="flex space-x-2">
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-[#363e9483] focus:outline-[#363e94af] rounded-md bg-white"
                    name="min_price"
                    defaultValue={min_price}
                    id="min_price"
                    type="number"
                    placeholder="Min Price"
                    required
                  />
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-[#363e9483] focus:outline-[#363e94af] rounded-md bg-white"
                    name="max_price"
                    defaultValue={max_price}
                    id="max_price"
                    type="number"
                    placeholder="Max Price"
                    required
                  />
                </div>
              </div>

              {/* Property location */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="location" className="block text-gray-600">
                  Property location
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-[#363e9483] focus:outline-[#363e94af] rounded-md bg-white"
                  name="location"
                  defaultValue={location}
                  id="location"
                  type="text"
                  placeholder="Property location"
                  required
                />
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) =>
                        setUploadImage({ image: e.target.files[0] })
                      }
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#363e94] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#363e94]">
                      {shortImageName(uploadImage?.image)}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#363e94] "
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCard;
