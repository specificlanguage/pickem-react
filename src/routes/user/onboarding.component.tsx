import { getAuth } from "firebase/auth";

export const component = function Onboard() {
  const auth = getAuth();
  const user = auth.currentUser;

  return <div className="p-2">Welcome, {user?.displayName} to onboarding!</div>;
};
