import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
const Profile = async () => {
  const user = await currentUser();
  return (
    <div>
      <h1>{user?.emailAddresses[0].emailAddress}</h1>
      <Image src={user?.imageUrl} alt="profile" width={100} height={100} />
      <p>{user?.firstName}</p>
    </div>
  );
};
export default Profile;
