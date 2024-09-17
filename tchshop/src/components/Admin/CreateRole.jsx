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
    <section className="px-4 mt-11 mb-44 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-center">Add Role Form</h1>

        <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Role Name:</label>
                <input
                    type="text"
                    required
                    ref={nameRef}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
            >
                Add Role
            </button>
        </form>
    </section>
);

}

export default CreateRole