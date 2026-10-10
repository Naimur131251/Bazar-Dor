const MarqueeSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white py-3">
      <div className="flex animate-pulse items-center gap-9 whitespace-nowrap">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-4 rounded bg-gray-200" />
            <div className="h-4 w-10 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSkeleton;
