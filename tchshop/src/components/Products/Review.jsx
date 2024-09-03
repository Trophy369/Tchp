import config from "../../config"


const baseURL = config.baseUrl;

const Review = ({ item }) => {
  const { Image, Rating, Review, Timestamp } = item;

  const imageUrls = Array.isArray(Image)
    ? Image.map((img) => `${baseURL}/static/reviews/${img}`)
    : [];

  return (
    <div className="mb-4">
      {imageUrls.map((image, index) => (
        <img key={index} src={image} className="w-full h-auto mb-2 rounded" alt={`Review ${index + 1}`} />
      ))}
      <h1 className="text-lg font-bold">{Review}</h1>
      <h2 className="text-sm text-gray-600">{Rating} Stars</h2>
      <h3 className="text-xs text-gray-400">{Timestamp}</h3>
      <hr className="mt-2" />
    </div>
  );
};

export default Review;
