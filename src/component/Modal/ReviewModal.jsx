/* eslint-disable react/prop-types */
const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    const review = formData.get("review"); 
    onSubmit(review); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">Add a Review</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="review"
            className="w-full border rounded-md p-2 mb-4"
            rows="4"
            placeholder="Write your review here..."
            required
          ></textarea>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#363e94] text-white hover:bg-[#363e94cb]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
