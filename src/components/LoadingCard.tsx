export default function LoadingCard() {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm">
      <div className="animate-pulse">
        <div className="w-10 h-10 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
        <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
      </div>
    </div>
  );
} 