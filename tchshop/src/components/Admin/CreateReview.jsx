import { useRef } from "react"
import { createReview } from "../../services/adminApi"

const CreateReview = () => {
    const nameRef = useRef()
    
   const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;

    const data = await createReview(name);
    console.log(data)
   }

    return (
        <>
        <h1>Add Review Form</h1>

        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Review:</label>
          <input type="text" required ref={nameRef} />
        </div>
        <button type="submit">Add Review</button>
      </form>
        </>
    )
}

export default CreateReview