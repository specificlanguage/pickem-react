import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

export const FavoriteTeamIcon = () => (
  <span className="text-yellow-500 leading-6 mt-1">
    <span className="inline-block align-center">
      <FaStar size={16} />
    </span>
  </span>
);

export const CheckedIcon = () => (
  <span className="text-green-500 leading-6 mt-1">
    <span className="inline-block bg-green-700 p-1 text-white rounded-full shadow-none">
      <FaCheck size={12} />
    </span>
  </span>
);