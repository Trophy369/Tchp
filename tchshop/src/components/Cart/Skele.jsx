const Skele = () => {
  console.log('work')
  return (
    <div className="p-4 border rounded-md">
      {/* Product Skeleton */}
      <div className="space-y-4">
        {Array(2).fill().map((_, index) => (
          <div key={index} className="flex space-x-4 animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
            <div className="flex justify-between w-full">
              <div className="w-2/3 h-4 bg-gray-200 rounded-md"></div>
              <div className="w-1/4 h-4 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Address and Email Skeleton */}
      <div className="mt-8 space-y-2">
        <div className="flex items-center justify-between py-2 border-b animate-pulse">
          <span className="w-1/3 h-4 bg-gray-200 rounded-md"></span>
          <span className="w-1/3 h-4 bg-gray-200 rounded-md"></span>
        </div>
        <div className="flex items-center justify-between py-2 border-b animate-pulse">
          <span className="w-1/3 h-4 bg-gray-200 rounded-md"></span>
          <span className="w-1/3 h-4 bg-gray-200 rounded-md"></span>
        </div>
      </div>

      {/* Totals Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between py-2 border-b animate-pulse">
          <span className="w-1/4 h-4 bg-gray-200 rounded-md"></span>
          <span className="w-1/4 h-4 bg-gray-200 rounded-md"></span>
        </div>
        <div className="flex items-center justify-between py-2 border-b animate-pulse">
          <span className="w-1/4 h-4 bg-gray-200 rounded-md"></span>
          <span className="w-1/4 h-4 bg-gray-200 rounded-md"></span>
        </div>
      </div>
    </div>
  );
};

export default Skele