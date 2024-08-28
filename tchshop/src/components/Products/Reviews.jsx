import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { viewReview } from "../../services/userApi";
import Review from "./Review";
import ShowError from "../ShowError";

// Product component
const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data, error } = await viewReview(id);

        if (error) {
          setError(error);
          setReviews([]);
        } else if (data.length === 0) {
          setError("Product has no review");
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

  return (
    <div>
      <h1>Reviews</h1>
      {error ? (
        <ShowError errorMessage={error} />
      ) : (
        <div>
          {reviews.map((item, index) => (
            <Review key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
