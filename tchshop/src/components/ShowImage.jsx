import image from "../assets/cip.png";

const ShowImage = ({ style }) => {
  const size = style ? "object-cover w-16 h-16" : "object-cover w-full h-48";
  return <img src={image} alt={""} className={size} />;
};

export default ShowImage;
