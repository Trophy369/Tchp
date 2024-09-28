import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import config from "../../config";
import { useParams } from "react-router-dom";
import { viewProductDescription } from "../../services/userApi";
import ShowError from "../ShowError";
import ShowImage from "../ShowImage";

// ProductDescription component
const ProductDescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [productDesc, setProductDesc] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProductDesc = async () => {
      try {
        const { data, error } = await viewProductDescription(id);
        if (data) {
          setProductDesc(data);
          setError(null);
        } else {
          setError(error);
          setProductDesc([]);
        }
      } catch (err) {
        setError("An error occurred while fetching product description.");
        setProductDesc([]);
      }
    };

    fetchProductDesc();
  }, [id]);

  const descImageUrls = Array.isArray(productDesc.images)
    ? productDesc.images.map(img => `static/descriptions/${img.image_name}`)
    : [];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="my-2 md:w-[60vw] mx-auto">
      <div 
        className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer" 
        onClick={toggleAccordion}
      >
        <h1 className="text-lg font-semibold md:mx-auto">Description</h1>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto" } : { height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4">
          {error ? (
            <ShowError errorMessage={error} />
          ) : (
            <>
              {descImageUrls.map((src, index) => (
                <div key={index} className="flex justify-center mb-4">
                  <ShowImage url={src} alt={`Slide ${index}`} style="home" className="object-cover h-50vh w-50vw" />
                </div>
              ))}
              <p className="mt-4 font-medium text-md">{productDesc.specifications}</p>
              
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ProductDescription;
