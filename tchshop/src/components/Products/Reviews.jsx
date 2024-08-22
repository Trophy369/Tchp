import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import { viewReview } from "../../services/userApi";
import Review from "./Review";

// Product component
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      const data = await viewReview(id);
      setReviews(data);
    };

    fetchReview();
  }, [id]);

  return (
    <div>
      <h1>review</h1>
      {reviews.map(item => <Review item={item}/>)}
    </div>
  );
};

export default Reviews;
