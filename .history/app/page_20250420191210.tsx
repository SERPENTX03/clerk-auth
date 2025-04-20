import { Button } from "@/components/ui/button";
import Link from "next/link";
const Home = () => {
  return (
    <div>
      <Button className="cursor-pointer">Click me</Button>
      <button>Click me</button>
      <a href="#">Click me</a>
      <Link href="#">Click me</Link>
    </div>
  );
};
export default Home;
