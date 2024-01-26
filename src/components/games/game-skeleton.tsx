import { Card, CardContent } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function GameSkeleton() {
  return (
    <Card>
      <CardContent data-testid="game-card" className="my-2 pb-0 space-y-2">
        <div className="flex justify-between">
          <div className="flex justify-between space-x-2">
            {/* Loading image */}
            <Skeleton className="h-[32px] w-[32px]" />
            {/* Loading team info */}
            <Skeleton className="h-[16px] w-[48px]" />
          </div>
          <div className="flex justify-between space-x-2">
            {/* Loading team info */}
            <Skeleton className="h-[16px] w-[48px]" />
            {/* Loading image */}
            <Skeleton className="h-[32px] w-[32px]" />
          </div>
        </div>
        <hr className="border" />
        <div className="mx-auto">
          <div className="text-sm flex justify-center">
            <Skeleton className="h-[16px] w-48" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
