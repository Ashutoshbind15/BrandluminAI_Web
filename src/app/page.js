import HomeSVG from "./components/UI/SVGs/Home";
import SVGWrapper from "./components/Wrappers/Helpers/SVGWrapper";
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
