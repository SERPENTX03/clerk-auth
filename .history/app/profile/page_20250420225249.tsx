import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Navbar from "@/components/Navbar";
const Profile = async () => {
  const user = await currentUser();
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1>{user?.emailAddresses[0].emailAddress}</h1>
        <Image
          src={user?.imageUrl || ""}
          alt="profile"
          width={100}
          height={100}
        />
        <p>{user?.firstName}</p>
      </div>
    </div>
  );
};
export default Profile;
