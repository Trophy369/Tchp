import { useRef } from "react"
import { createproduct, deleteProduct } from "../../services/adminApi"
import { listproducts } from "../../services"

const AddProduct = () => {
    const productRef = useRef()
    const descriptionRef = useRef()
    const quantityRef = useRef()
    const regRef = useRef()
    const disRef = useRef()
    
   const handleSubmit = async (e) => {
    e.preventDefault();
    const product_name = productRef.current.value;
    const description = descriptionRef.current.value;
    const quantity = quantityRef.current.value;
    const regular_price = regRef.current.value;
    const discounted_price = disRef.current.value;

    const data = await createproduct(product_name, description, quantity, regular_price, discounted_price);
    console.log(data)
   }

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
        <button type="submit">Add Product</button>
      </form>
        </>
    )
}

export default AddProduct