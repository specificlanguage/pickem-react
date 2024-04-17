import axios from "axios";
import { formatAPIPath } from "@/lib/http/utils.ts";

interface UserRecord {
  correct: number;
  total: number;
}

export function getUserRecord(
  range: "all" | "month" | "week",
  userID?: string,
  username?: string,
) {
  return axios
    .get(
      formatAPIPath(
        `/picks/user/record?range=${range}&${userID ? `userID=${userID}` : `username=${username}`}`,
      ),
    )
    .then((r) => r.data as UserRecord)
    .catch(() => null);
}
