import config from "../config";

const baseURL = config.baseUrl;

const ShowImage = ({ style, url }) => {
  let size;

  if (style === "cart") {
    size = "object-cover w-16 h-16"; // Small image size
  } else if (style === "home") {
    size = "object-cover w-full h-48"; // Large image size
  } else if (style === "carousel") {
    size = "object-cover w-full h-full";
  }  else { 
    size = "object-cover w-15 h-15"; // Default or medium image size
  }

  return <img src={`${baseURL}/${url}`} alt={""} className={size} />;
};

export default ShowImage;
