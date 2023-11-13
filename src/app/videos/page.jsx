import VideoRenderer from "../components/Server/VideoRenderer";
import VideoClientHelper from "../components/Wrappers/ClientComponent/VideoClientHelper";

const VideosRenderer = async () => {
  return (
    <VideoClientHelper>
      <VideoRenderer />
    </VideoClientHelper>
  );
};

export default VideosRenderer;
