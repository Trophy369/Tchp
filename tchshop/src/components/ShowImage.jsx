const ShowImage = ({ style, url }) => {
  const size = style ? "object-cover w-16 h-16" : "object-cover w-full h-48";
  
  return <img src={url} alt={""} className={size} />;
};
//   return (
//     <div>
//        {}
//     </div>
//   );
export default ShowImage;
