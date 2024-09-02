import {useState, useEffect} from "react"
import ShowImage from "../ShowImage"

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // 3 seconds interval
      return () => clearInterval(interval);
    }, [images.length]);
  
    const handleSwipe = (direction) => {
      if (direction === 'left') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else if (direction === 'right') {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      }
    };
  
    return (
      <div className="relative overflow-hidden" style={{ height: '25vh' }}>
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <ShowImage url={src} alt={`Slide ${index}`} style="carousel" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 flex space-x-2 transform -translate-x-1/2 left-1/2">
          {images.map((_, index) => (
            <div key={index} className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-400'}`}></div>
          ))}
        </div>
        <button
          onClick={() => handleSwipe('right')}
          className="absolute left-0 px-2 py-1 text-white transform -translate-y-1/2 bg-black top-1/2"
        >
          &lt;
        </button>
        <button
          onClick={() => handleSwipe('left')}
          className="absolute right-0 px-2 py-1 text-white transform -translate-y-1/2 bg-black top-1/2"
        >
          &gt;
        </button>
      </div>
    );
  };

  export default Carousel