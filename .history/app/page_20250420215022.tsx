// import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Home = async () => {
  // const user = await currentUser();
  // console.log(user);
  return (
    <div className="h-screen flex items-center justify-center">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button asChild>
          <SignInButton />
        </Button>
      </SignedOut>
    </div>
  );
};
export default Home;
