import Baso from "../components/Baso";

const Page = () => {
  const tikus = "belajar next.js";
  
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-7xl">Home</h1>
      </div>
      <div>
        <Baso tikus={tikus} />
      </div>
    </>
  );
};

export default Page;