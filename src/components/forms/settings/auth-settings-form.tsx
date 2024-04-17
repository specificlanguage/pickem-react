import { UserProfile } from "@clerk/clerk-react";

export function AuthSettingsForm() {
  return (
    <div className="flex w-full justify-center">
      <UserProfile
        routing="virtual"
        appearance={{ elements: { navbar: "hidden", card: "max-w-xl" } }}
      />
    </div>
  );

  // const { user, isSignedIn } = useUser();
  // const imageRef = useRef(null);
  //
  // function uploadImageToClerk(x) {
  //   console.log(x);
  // }
  //
  // if (isSignedIn === false) {
  //   return null;
  // }
  //
  // return (
  //   <form className="w-fit relative">
  //     <Avatar className="w-48 h-48 md:w-50 md:h-50">
  //       <AvatarImage src={user?.imageUrl} />
  //     </Avatar>
  //     <Button
  //       type={"button"}
  //       size="sm"
  //       className="absolute -right-2 -bottom-2 bg-accent-foreground dark:bg-accent flex justify-between gap-2 items-center"
  //     >
  //       <input type="file" hidden onChange={(e) => uploadImageToClerk(e)} />
  //       <FaPencil />
  //       Edit
  //     </Button>
  //   </form>
  // );
}
