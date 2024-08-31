import { useRef } from "react";
import { assignRole } from "../../services/adminApi";

const AssignRole = () => {
  const emailRef = useRef();
  const roleRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const role_to_assign = roleRef.current.value;

    const data = await assignRole(email, role_to_assign);
    console.log(data);
  };

  return (
    <>
      <h1>Assign Role Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" required ref={emailRef} />
        </div>
        <div>
          <label htmlFor="role">Role Name:</label>
          <input type="text" required ref={roleRef} />
        </div>
        <button type="submit">Assign Role</button>
      </form>
    </>
  );
};

export default AssignRole;
