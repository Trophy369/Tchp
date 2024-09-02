// import React, { useState } from 'react';

// const ImageUploadComponent = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     // Update files and previews
//     setSelectedFiles(prevFiles => [...prevFiles, ...files]);
//     setPreviews(prevPreviews => [
//       ...prevPreviews,
//       ...files.map(file => URL.createObjectURL(file))
//     ]);
//   };

//   // Handle file upload
  

//   return (
//     <div>
//       <h2>Upload Images for Product</h2>
//       <div>
//         <input
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           accept="image/*"
//         />
//       </div>
//       <div>
//         {previews.length > 0 && (
//           <div>
//             <h3>Image Previews:</h3>
//             <div style={{ display: 'flex', gap: '10px', overflowX: 'scroll' }}>
//               {previews.map((preview, index) => (
//                 <img
//                   key={index}
//                   src={preview}
//                   alt={`Preview ${index}`}
//                   style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const handleUpload = async (productName, selectedFiles) => {
//   if (selectedFiles.length === 0) {
//     setError('Please select at least one image.');
//     return;
//   }

//   const formData = new FormData();
//   selectedFiles.forEach(file => formData.append('file', file));

//   try {
//     const response = await fetch(`${baseUrl}/addProductImage/${productName}`, {
//       method: 'POST',
//       body: formData,
//       credentials: 'include',
//     });
//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(result.error || 'Failed to upload images');
//     }
//     setMessage(result.Message || 'Images uploaded successfully.');
//     setError('');
//     // Clear previews and file input
//     setPreviews([]);
//     setSelectedFiles([]);
//   } catch (err) {
//     setError(err.message);
//     setMessage('');
//   }
// };