import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export const FavoriteTeamIcon = () => (
  <span className="text-yellow-500 leading-7">
    <span className="inline-block align-middle">
      <FaStar size={16} />
    </span>
  </span>
);

export const CheckedIcon = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="text-green-500 leading-7">
          <span className="inline-block align-middle bg-green-700 p-1 text-white rounded-full shadow-none">
            <FaCheck size={12} />
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Correct guess!</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const HollowCheckedIcon = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="leading-7">
          <span className="border border-foreground inline-block align-middle p-1 text-white rounded-full shadow-none">
            <FaCheck size={12} />
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Your pick</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
