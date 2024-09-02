import React, { useState, useEffect } from "react";
import config from "../../config";
import { useParams } from "react-router-dom";
import { viewProductDescription } from "../../services/userApi";
import ShowError from "../ShowError";
import ShowImage from "../ShowImage";

// Product component
const ProductDescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [productDesc, setProductDesc] = useState([]);

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

  return error ? (
    <ShowError errorMessage={error} />
  ) : (
    <div>
      <h1>description</h1>
      {descImageUrls.map((src, index) => (
        <div key={index} className="flex-shrink-0 w-full">
          <ShowImage url={src} alt={`Slide ${index}`} style="carousel" />
        </div>
      ))}
      <h2>{productDesc.specifications}</h2>
      <p>end of product description</p>
    </div>
  );
};

export default ProductDescription;
