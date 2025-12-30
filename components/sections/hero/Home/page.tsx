import IntroCard from "./IntroCard";
import IntroMain from "./IntroMain";

const HomeContent = () => {
  return (
    <div className="h-auto w-[85%] flex items-center justify-center gap-4 flex-col pb-4">
      <div className="w-full flex items-center justify-center md:mt-0 mt-6">
        <h1 className="md:text-6xl text-4xl font-bold uppercase ">Developer</h1>
      </div>
      <div className="w-full flex items-center justify-between md:flex-row flex-col">
        <div className="md:w-[30%] w-[80%] ">
          <IntroCard />
        </div>

        <div className="md:w-[30%] w-[80%]  ">
          <IntroMain />
        </div>
        <div className="md:w-[30%] w-[80%] md:mb-0 mb-10 ">
          <div className="w-auto h-[1-0%] flex items-center justify-between 
        bg-transparent flex-col rounded-full p-6 px-8 py-10 shadow-2xl space-y-6 ">
          <div className="flex items-center gap-4 border-b">
            <h2 className="text-6xl font-black">10</h2>
            <p>Programming <br /> Languages</p>
          </div>
          <div className="flex items-center gap-4 border-b">
            <h2 className="text-6xl font-black ">6</h2>
            <p>Development <br /> Tools</p>
          </div>
          <div className="flex items-center gap-4 border-b">
            <h2 className="text-6xl font-black">1</h2>
            <p>Year Of <br /> Experience</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
