import config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const baseURL = config.baseUrl;

const Review = ({ item }) => {
  const { Image, Rating, Review: reviewText, Timestamp } = item;

  const imageUrls = Array.isArray(Image)
    ? Image.map((img) => `${baseURL}/static/reviews/${img}`)
    : [];

  return (
    <div className="mb-4 overflow-y-auto max-h-20vh">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 ">
        {imageUrls.map((image, index) => (
          <img key={index} src={image} className="object-contain w-1/2 h-auto mx-auto rounded" alt={`Review ${index + 1}`} />
        ))}
      </div>
      <div className="mt-4">
        <h2 className="flex items-center justify-center text-sm text-gray-600">
          {Array.from({ length: Math.floor(Rating) }, (_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="text-center text-yellow-400" />
          ))}
          {/* <span className="ml-1">{Rating}</span> */}
        </h2>
        <h1 className="text-lg font-normal">{reviewText}</h1>
        <h3 className="text-xs text-gray-400">{Timestamp}</h3>
      </div>
      <hr className="mt-2" />
    </div>
  );
};

export default Review;
