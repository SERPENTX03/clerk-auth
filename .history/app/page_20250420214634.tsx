import { currentUser } from "@clerk/nextjs/server";
const Home = async () => {
  const user = await currentUser();
  console.log(user);
  return (
    <div>
      <h1>Hello {user?.firstName}</h1>
    </div>
  );
};
export default Home;
