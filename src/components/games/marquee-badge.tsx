import { Badge } from "@/components/ui/badge.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

/**
 * Creates a badge to indicate that a game is a marquee game.
 * @constructor
 */
export default function MarqueeBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className="border-yellow-300 text-yellow-600 bg-background"
          >
            MARQUEE
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Marquee games are randomly chosen games that all users pick on that
            day.
            <br />
            <i>
              For series, games on Tuesday and Friday are what users choose.
            </i>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
