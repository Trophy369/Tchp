import config from "../config";

const baseURL = config.baseUrl;

const ShowImage = ({ style, url }) => {
  let size;

  if (style === "cart") {
    size = "object-cover w-16 h-16"; // Small image size
  } else if (style === "home") {
    size = "object-cover w-full h-48"; // Large image size
  } else { 
    size = "object-cover w-15 h-15"; // Default or medium image size
  }

  return <img src={`${baseURL}/${url}`} alt={""} className={size} />;
};

export default ShowImage;

// const ShowImage = ({ style, url }) => {
//   const size = style ? "object-cover w-16 h-16" : "object-cover w-full h-48" : "object-cover w-15 h-15"
  
//   return <img src={url} alt={""} className={size} />;
// };
// export default ShowImage;
