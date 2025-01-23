/* eslint-disable react/prop-types */

import { TbFidgetSpinner } from "react-icons/tb";
import { shortImageName } from "../../utilitis";

const AddPropertyForm = ({ handleSubmit,loading,uploadImage,setUploadImage }) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
       <h2 className="py-10 text-4xl font-bold">Add Property</h2>
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
                    id="min_price"
                    type="number"
                    placeholder="Min Price"
                    required
                  />
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-[#363e9483] focus:outline-[#363e94af] rounded-md bg-white"
                    name="max_price"
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
                      setUploadImage({image: e.target.files[0]})
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
                  "Save & Continue"
                )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
