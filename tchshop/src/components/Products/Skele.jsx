const Skele = () => {
    return (
      <div className="animate-pulse overflow-hidden transition-transform transform border border-gray-200 rounded-lg group hover:scale-105">
        <div className="flex flex-col h-full">
          <div className="w-full h-48 bg-gray-300 rounded"></div>
  
          <div className="flex flex-col items-center justify-center flex-1 p-2 space-y-2">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Skele;
  