const ShowError = ({ errorMessage, onRetry, buttonText }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h2>
        <p className="text-gray-700 mt-4">{errorMessage}</p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
          onClick={onRetry}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ShowError;
