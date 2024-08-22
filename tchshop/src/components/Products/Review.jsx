import Carousel from "./Carousel";
import { viewReview } from "../../services/userApi";

const Review = ({ item }) => {

    const {Image, Rating, Review, Timestamp} = item

    console.log(Image)

    const imageUrls = Array.isArray(Image)
    ? Image.map(
        img => `http://127.0.0.1:5000/static/reviews/${img}`
      )
    : [];



  return (
    <div>
      {imageUrls.map(image => <img src={image} />)}
      <h1>{Review}</h1>
      <h2>{Rating}</h2>
      <h3>{Timestamp}</h3>
      <h1>END</h1>
    </div>
  );
};

export default Review;
