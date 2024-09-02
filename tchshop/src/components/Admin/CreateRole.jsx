import { useRef } from "react"
import { createRole } from "../../services/adminApi"

const CreateRole = () => {
    const nameRef = useRef()
    
   const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;

    const data = await createRole(name);
    console.log(data)
   }

    return (
        <>
        <h1>Add Role Form</h1>

        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Role Name:</label>
          <input type="text" required ref={nameRef} />
        </div>
        <button type="submit">Add Role</button>
      </form>
        </>
    )
}

export default CreateRole