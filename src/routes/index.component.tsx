import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

export const component = function Index() {
  const { user } = useUser();

  return (
    <div className="p-2">
      <SignedIn>
        <h3>Welcome Home, {user?.username}!</h3>
      </SignedIn>
      <SignedOut>
        <h3>Welcome Home!</h3>
      </SignedOut>
    </div>
  );
};
