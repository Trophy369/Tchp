import { useRef, useState } from "react";
import { createReview } from "../../services/adminApi";

const CreateReview = () => {
  const nameRef = useRef();
  const idRef = useRef();
  const ratingRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = event => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    setPreviews(prevPreviews => [
      ...prevPreviews,
      ...files.map(file => URL.createObjectURL(file))
    ]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const reviewText = nameRef.current.value;
    const rating = ratingRef.current.value;
    const id = idRef.current.value;

    const formData = new FormData();
    formData.append("review", reviewText);
    formData.append("rating", rating);
    formData.append("id", id);

    Array.from(selectedFiles).forEach(file => {
      formData.append("file", file);
    });

    const data = await createReview(formData);
    console.log(data);
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md mt-11 mb-44">
      <h1 className="mb-6 text-2xl font-bold text-center">Add Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block mb-2 font-bold text-gray-700">
            Rating:
          </label>
          <input
            type="number"
            required
            ref={ratingRef}
            min="1"
            max="5"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter rating (1-5)"
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
            Review:
          </label>
          <textarea
            required
            ref={nameRef}
            className="w-full px-4 py-2 border rounded"
            placeholder="Write your review"
          />
        </div>
        <div>
          <label htmlFor="id" className="block mb-2 font-bold text-gray-700">
            Product ID:
          </label>
          <input
            type="number"
            required
            ref={idRef}
            min="1"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product ID"
          />
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold">Upload Images for Review</h2>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-4 py-2 border rounded"
          />
          {previews.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-md">Image Previews:</h3>
              <div className="flex gap-4 mt-2 overflow-x-auto">
                {previews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="object-cover w-24 h-24 rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
