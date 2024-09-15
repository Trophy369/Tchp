import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Review from "./Review";
import ShowError from "../ShowError";
import { viewReview } from "../../services/userApi";

const Reviews = ({id}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data, error } = await viewReview(id);

        if (error) {
          setError(error);
          setReviews([]);
        } else if (data.length === 0) {
          setError("No Reviews Available");
          setReviews([]);
        } else {
          setReviews(data);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to fetch reviews. Please try again later.");
        setReviews([]);
      }
    };

    fetchReview();
  }, [id]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="mt-2 mb-44 md:w-[60vw] mx-auto">
      <div 
        className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer" 
        onClick={toggleAccordion}
      >
        <h1 className="text-lg font-semibold md:mx-auto ">Reviews</h1>
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
            reviews.length === 0 ? (
              <p className="mx-auto text-center text-gray-500">No Reviews Available</p>
            ) : (
              reviews.map((item) => (
                <Review key={item.id} item={item} />
              ))
            )
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Reviews;

