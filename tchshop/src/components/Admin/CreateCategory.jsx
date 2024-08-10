import { useEffect, useRef, useState } from "react"
import { createCategory, getCategory, deleteCategory } from "../../services/adminApi"

const CreateCategory = () => {
    const nameRef = useRef()
    const [category, setCategory] = useState([])

    useEffect(() => {
      const fetchCategory = async (id) => {
        const data = await getCategory(id);
        setCategory(data);
      };
  
      fetchCategory();
    }, []);
    
   const handleSubmit = async (e) => {
    e.preventDefault();
    const category_name = nameRef.current.value;

    const data = await createCategory(category_name);
    console.log(data)
   }

    return (
        <>
        <h1>Add Category Form</h1>

        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Category Name:</label>
          <input type="text" required ref={nameRef} />
        </div>
        <button type="submit">Add Category</button>
      </form>
        </>
    )
}

export default CreateCategory