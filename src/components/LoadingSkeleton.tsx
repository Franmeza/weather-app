import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  const skeletons = [
    { height: "h-48" },
    { height: "h-[490px] xl:h-48" },
    { height: "h-[490px]" },
    { height: "h-[490px]" },
  ];

  return (
    <div className="px-6  lg:px-8 xl:px-[72px] mt-24">
      <div className="grid min-[800px]:grid-cols-[340px_1fr] gap-x-11 gap-y-9 mt-4">
        {skeletons.map((skeleton, index) => (
          <Skeleton
            key={index}
            className={`w-full bg-[#20293A] ${skeleton.height} rounded-xl`}
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeleton;
