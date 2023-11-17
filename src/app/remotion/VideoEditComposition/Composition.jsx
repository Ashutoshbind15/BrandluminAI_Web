import { AbsoluteFill, Video, Sequence } from "remotion";

export const MyComposition = ({ sections, videoUrl }) => {
  console.log(sections);
  const parseTime = (time) => {
    if (!time || time.length === 0) return 0;
    const [hour, minute, second] = time.split(":");
    return +hour * 3600 + +minute * 60 + +second;
  };
  return (
    <AbsoluteFill className="border-2 border-black flex items-center justify-center">
      <Sequence
        from={0}
        durationInFrames={30}
        className="flex items-center justify-center"
      >
        <h1 className="text-2xl font-semibold font-mono">Hello</h1>
      </Sequence>

      {sections.length &&
        sections?.map((section) => {
          console.log(section?.instances[0].start);
          return (
            <Sequence
              from={Math.ceil(parseTime(section?.instances[0].start)) * 30}
              durationInFrames={
                Math.ceil(parseTime(section?.instances[0].end)) * 30 -
                Math.ceil(parseTime(section?.instances[0].start)) * 30
              }
              className="flex flex-col items-center justify-between"
            >
              <Video
                startFrom={
                  Math.ceil(parseTime(section?.instances[0].start)) * 30
                }
                endAt={Math.ceil(parseTime(section?.instances[0].end)) * 30}
                src={videoUrl}
              />
              <p className="mb-6">{section.text}</p>
            </Sequence>
          );
        })}
    </AbsoluteFill>
  );
};
