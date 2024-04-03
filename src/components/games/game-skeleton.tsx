import { Card, CardContent } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function GameSkeleton() {
  return (
    <Card>
      <CardContent data-testid="game-card" className="p-0 m-0 space-y-2">
        <div className="flex flex-row pb-0 space-y-1 p-6 m-2 mb-8">
          <div className="basis-12/12 md:basis-8/12 space-y-4">
            <div className="flex space-x-2">
              {/* Loading image */}
              <Skeleton className="h-[32px] w-[32px]" />
              {/* Loading team info */}
              <Skeleton className="h-[16px] w-[200px] my-2" />
            </div>
            <div className="flex space-x-2">
              {/* Loading image */}
              <Skeleton className="h-[32px] w-[32px]" />
              {/* Loading team info */}
              <Skeleton className="h-[16px] w-[200px] my-2" />
            </div>
          </div>
          <div className="invisible md:visible md:basis-1/12">
            {/* Loading separator */}
            <Skeleton className="h-full w-[2px]" />
          </div>
          <div className="invisible md:visible md:basis-3/12 flex flex-col space-y-6">
            {/* Loading buttons */}
            <div className="flex">
              <Skeleton className={"h-[16px] w-[100px]"} />
            </div>
            <div className="flex space-x-2">
              <Skeleton className={"h-[32px] w-[70px]"} />
              <Skeleton className={"h-[32px] w-[70px]"} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
