import { useRef, useState } from "react";
import { createReview } from "../../services/adminApi";

const CreateReview = () => {
    const nameRef = useRef();
    const idRef = useRef();
    const ratingRef = useRef(); // Reference for the rating input
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewText = nameRef.current.value;
        const rating = ratingRef.current.value; // Get the rating value
        const id = idRef.current.value; // Get the rating value

        const formData = new FormData();
        formData.append('review', reviewText);
        formData.append('rating', rating); // Append the rating to FormData
        formData.append('id', id); // Append the rating to FormData

        Array.from(files).forEach(file => {
            formData.append('file', file);
        });

        const data = await createReview(formData);
        console.log(data);
    };

    return (
        <>
            <h1>Add Review Form</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input type="number" required ref={ratingRef} min="1" max="5" /> {/* Rating input */}
                </div>
                <div>
                    <label htmlFor="name">Review:</label>
                    <input type="text" required ref={nameRef} />
                </div>
                <div>
                    <label htmlFor="id">id:</label>
                    <input type="number" required ref={idRef} min="1" max="5" /> {/* Rating input */}
                </div>
                <div>
                    <label htmlFor="photo">Upload Images:</label>
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Add Review</button>
            </form>
        </>
    );
};

export default CreateReview;


// import { useRef } from "react"
// import { createReview } from "../../services/adminApi"

// const CreateReview = () => {
//     const nameRef = useRef()
    
//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     const name = nameRef.current.value;

//     const data = await createReview(name);
//     console.log(data)
//    }

//     return (
//         <>
//         <h1>Add Review Form</h1>

//         <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Review:</label>
//           <input type="text" required ref={nameRef} />
//         </div>
//         <div>
//           <input type="file" name="photo" accept="image/*" />
//         </div>
//         <button type="submit">Add Review</button>
//       </form>
//         </>
//     )
// }

// export default CreateReview