import { Badge } from "@/components/ui/badge.tsx";
/**
 * Creates a badge to indicate that a game is a marquee game.
 * @constructor
 */
export default function MarqueeBadge() {
  return (
    <Badge
      variant="outline"
      className="border-yellow-300 text-yellow-600 bg-background"
    >
      MARQUEE
    </Badge>
  );
}
