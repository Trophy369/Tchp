import { useRef, useState } from "react";
import {
  deleteProduct,
  addProductColors, handleUpload
} from "../../services/adminApi";
import { listproducts } from "../../services";

const AddProduct = () => {
  const productRef = useRef();
  const descriptionRef = useRef();
  const quantityRef = useRef();
  const regRef = useRef();
  const disRef = useRef();
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleAddColor = () => {
    if (newColor.trim() === "") return;
    setColors([...colors, newColor.trim()]);
    setNewColor("");
  };

  const handleFileChange = event => {
    const files = Array.from(event.target.files);
    // Update files and previews
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    setPreviews(prevPreviews => [
      ...prevPreviews,
      ...files.map(file => URL.createObjectURL(file))
    ]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const product_name = productRef.current.value;
    const description = descriptionRef.current.value;
    const quantity = quantityRef.current.value;
    const regular_price = regRef.current.value;
    const discounted_price = disRef.current.value;

    const data = await createproduct(
      product_name,
      description,
      quantity,
      regular_price,
      discounted_price
    );
    if (data['Product name']) {
      await addProductColors(product_name, colors);
      await handleUpload(product_name, selectedFiles)
    }
    console.log(data.message);
  };

  return (
    <>
      <h1>Add product Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product">Product Name:</label>
          <input type="text" required ref={productRef} />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <input type="text" required ref={descriptionRef} />
        </div>
        <div>
          <label htmlFor="Quantity">Quantity:</label>
          <input type="text" required ref={quantityRef} />
        </div>
        <div>
          <label htmlFor="Regular Price">Regular Price:</label>
          <input type="text" required ref={regRef} />
        </div>
        <div>
          <label htmlFor="Discount Price">Discount Price:</label>
          <input type="text" required ref={disRef} />
        </div>
        <div>
          <h2>Add Colors to Product</h2>
          <div>
            <label>
              New Color:
              <input
                type="text"
                value={newColor}
                onChange={e => setNewColor(e.target.value)}
              />
            </label>
            <p onClick={handleAddColor}>Add Color</p>
          </div>
          <ul>
            {colors.map((color, index) => (
              <li key={index}>{color}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Upload Images for Product</h2>
          <div>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div>
            {previews.length > 0 && (
              <div>
                <h3>Image Previews:</h3>
                <div
                  style={{ display: "flex", gap: "10px", overflowX: "scroll" }}
                >
                  {previews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover"
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default AddProduct;
