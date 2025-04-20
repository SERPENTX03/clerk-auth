import { currentUser } from "@clerk/nextjs/server";

const Profile = async () => {
  const user = await currentUser();
  return <div>{user?.emailAddresses[0].emailAddress}</div>;
};
export default Profile;
