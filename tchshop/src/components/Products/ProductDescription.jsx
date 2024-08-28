import React, { useState, useEffect } from "react";
import config from "../../config";
import { useParams } from "react-router-dom";
import { viewProductDescription } from "../../services/userApi";
import ShowError from "../ShowError";

const baseURL = config.baseUrl;

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

        if (error === null && data.length > 0) {
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
    ? productDesc.images.map(
        img => `${baseURL}/static/descriptions/${img.image_name}`
      )
    : [];

  return error ? (
    <ShowError errorMessage={error} />
  ) : (
    <div>
      <h1>description</h1>
    </div>
  );
};

export default ProductDescription;
