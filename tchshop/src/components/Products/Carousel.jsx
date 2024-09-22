import { useState, useEffect } from "react";
import ShowImage from "../ShowImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 7000); // 7 seconds interval
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const handleSwipe = (direction) => {
    setIsPaused(false); // Reset pause on swipe
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const handleTouchStart = () => {
    setIsPaused(true); // Pause on touch
  };

  return (
    <section className="relative overflow-hidden h-[40vh] md:h-[50vh] md:max-w-[50vw] mx-auto" onTouchStart={handleTouchStart}>
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            <ShowImage url={src} alt={`Slide ${index}`} style="carousel" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 flex items-center justify-between w-full p-4">
        <button
          onClick={() => handleSwipe('right')}
          className="px-2 py-1 text-white bg-black rounded"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex justify-center space-x-2">
          {images.map((_, index) => (
            <div key={index} className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-400'}`}></div>
          ))}
        </div>
        <button
          onClick={() => handleSwipe('left')}
          className="px-2 py-1 text-white bg-black rounded"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
