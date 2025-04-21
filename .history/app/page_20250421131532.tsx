import { currentUser } from "@clerk/nextjs/server";

import Navbar from "@/components/Navbar";
const Home = async () => {
  const user = await currentUser();
  // console.log(user);
  return (
    <div>
      <Navbar />
    </div>
  );
};
export default Home;
