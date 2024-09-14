import { useRef } from "react";
import { assignRole, createRole } from "../../services/adminApi";

const AssignRole = () => {
  const emailRef = useRef();
  const roleRef = useRef();
  const nameRef = useRef()
    
   const handleRole = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;

    const data = await createRole(name);
    console.log(data)
   }

  const handleSubmit = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const role_to_assign = roleRef.current.value;

    const data = await assignRole(email, role_to_assign);
    console.log(data);
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Add Role Form</h1>
  
        <form onSubmit={handleRole} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">Role Name:</label>
            <input
              type="text"
              required
              ref={nameRef}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Add Role
          </button>
        </form>
      </div>
  
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Assign Role Form</h1>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              required
              ref={emailRef}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="role" className="mb-1 text-sm font-medium text-gray-700">Role Name:</label>
            <input
              type="text"
              required
              ref={roleRef}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Assign Role
          </button>
        </form>
      </div>
    </>
  );
};

export default AssignRole;
