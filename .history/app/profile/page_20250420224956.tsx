import { currentUser } from "@clerk/nextjs/server";

const Profile = async () => {
  const user = await currentUser();
  return (
    <div>
      <h1>{user?.emailAddresses[0].emailAddress}</h1>
    </div>
  );
};
export default Profile;
