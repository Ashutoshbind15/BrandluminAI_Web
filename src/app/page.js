import Link from "next/link";
import HomeSVG from "./components/UI/SVGs/Home";
import SVGWrapper from "./components/Wrappers/Helpers/SVGWrapper";
import GraphComponent from "./components/UI/Graphs/GraphComponent";
import GraphHome from "./components/UI/Graphs/GraphHome";
import BruteGraph from "./components/UI/Graphs/BruteGraph";

export default function Home() {
  return (
    <div>
      <div className="py-20 px-4 flex items-center justify-around">
        <SVGWrapper className={"h-96 w-96"}>
          <HomeSVG />
        </SVGWrapper>

        <div className="text-xl font-bold text-black font-mono ml-6 mt-32">
          The Home Page of my Video Analysis Platform! <br />
          Yay!!
        </div>
      </div>

      {/* <div className="flex items-center justify-around">
        <Link
          className="px-4 py-2 border-2 border-black text-gray-700 rounded-lg hover:scale-105 transition-all"
          href={"/videos"}
        >
          Videos
        </Link>
        <div className="border-black border-2 flex items-center justify-center w-60 relative">
          <div className="absolute rounded-full h-4 w-4 bg-black"></div>
        </div>
        <div className="px-4 py-2 border-2 border-black text-gray-700 rounded-lg hover:scale-105 transition-all">
          Step2
        </div>
        <div className="border-black border-2 flex items-center justify-center w-60 relative">
          <div className="absolute rounded-full h-4 w-4 bg-black"></div>
        </div>
        <div className="px-4 py-2 border-2 border-black text-gray-700 rounded-lg hover:scale-105 transition-all">
          Step3
        </div>
      </div> */}

      <div className="w-full items-center justify-center">
        <BruteGraph
          grid={[
            ["vid", "step2", "hehe"],
            ["*", "step4", "*"],
            ["*", "step5", "*"],
          ]}
        />
      </div>
    </div>
  );
}
