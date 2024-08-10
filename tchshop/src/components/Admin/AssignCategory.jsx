import { useRef } from "react";
import { assignCategory } from "../../services/adminApi";

const AssignCategory = () => {
  const emailRef = useRef();
  const roleRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product_name = emailRef.current.value;
    const category_to_assign = roleRef.current.value;

    const data = await assignCategory(product_name, category_to_assign);
    console.log(data);
  };

  return (
    <>
      <h1>Assign Role Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input type="text" required ref={emailRef} />
        </div>
        <div>
          <label htmlFor="name">Category to assign Name:</label>
          <input type="text" required ref={roleRef} />
        </div>
        <button type="submit">Assign Category</button>
      </form>
    </>
  );
};

export default AssignCategory;
