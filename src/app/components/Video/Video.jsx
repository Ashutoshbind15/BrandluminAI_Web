import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../utilUI/ui/dialog";
import { Button } from "../utilUI/ui/button";
import AnalysisConsumer from "./AnalysisConsumer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "../utilUI/ui/use-toast";

const BackOffVideoAnalysisFetcher = ({ id, setVid }) => {
  const [data, setData] = useState(null);

  const rtr = useRouter();

  // Utility function to introduce a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchAnalysis = async () => {
      let retryCount = 0;
      let maxRetries = 10;
      let delayTime = 1000; // Initial delay of 1 second

      while (retryCount < maxRetries) {
        try {
          const res = await fetch(`/api/videoanalyzer?id=${id}`);
          const result = await res.json();
          setData(result);

          if (result.state === "Processed") {
            setVid((prev) => ({ ...prev, data: result }));
            break;
          }
        } catch (error) {
          console.error("Error fetching analysis:", error);
        }

        retryCount += 1;
        await delay(delayTime);
        delayTime *= 2; // Exponential backoff
      }
    };

    fetchAnalysis();
  }, [id, setVid]);

  return (
    <div>
      <p>{data?.state}</p>
      <p>Processing...</p>
    </div>
  );
};

const Video = ({ video }) => {
  const [vid, setVid] = useState(video);
  const rtr = useRouter();
  const [name, setName] = useState("");

  return (
    <div
      key={vid._id}
      className="flex flex-col items-center p-4 border-y-2 border-black mb-4 shadow-lg"
    >
      <div>
        <video src={vid.fileUrl} controls className="h-96 w-96"></video>
      </div>
      <div className="flex flex-col items-center ml-32">
        {vid?.data || !vid?.fileId ? (
          <Dialog>
            <DialogTrigger>
              {vid?.data ? (
                <Button>Show analysis</Button>
              ) : (
                <Button>Analyze</Button>
              )}
            </DialogTrigger>

            <DialogContent>
              {!vid?.fileId ? (
                <form>
                  <input
                    type="text"
                    placeholder="Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Button
                    onClick={async (e) => {
                      e.preventDefault();
                      const { data } = await axios.post(`/api/videoanalyzer`, {
                        url: vid.fileUrl,
                        name,
                      });

                      setVid((prev) => ({ ...prev, fileId: data.video.id }));
                    }}
                  >
                    Analyze
                  </Button>
                </form>
              ) : (
                <>
                  <AnalysisConsumer data={vid.data} />
                  <Button
                    onClick={() => {
                      rtr.push(`/videos/${vid._id}/assistant`);
                    }}
                  >
                    Generate content
                  </Button>
                </>
              )}
            </DialogContent>
          </Dialog>
        ) : (
          <BackOffVideoAnalysisFetcher id={vid._id} setVid={setVid} />
        )}
      </div>
    </div>
  );
};

export default Video;
