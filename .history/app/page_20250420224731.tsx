import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const user = await currentUser();
  console.log(user);
  return (
    <div className="py-6 px-26 flex justify-between items-center ">
      <div>
        <h1 className="text-2xl font-bold">Clerk App</h1>
      </div>

      <div className="flex items-center border">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};
export default Home;
