"use client";

import {
  extractKeywordsFromInsightsData,
  extractTopicsFromInsightsData,
  extractTranscriptsFromInsightsData,
} from "@/app/utils/helperfns";
import { Button } from "../utilUI/ui/button";

const AnalysisConsumer = ({ data }) => {
  const transcripts = extractTranscriptsFromInsightsData(data);
  const keywords = extractKeywordsFromInsightsData(data);
  const topics = extractTopicsFromInsightsData(data);

  console.log(data);

  console.log(transcripts);
  console.log(keywords);
  console.log(topics);

  return (
    <div className="flex flex-col p-6">
      <div className="h-56 overflow-y-scroll shadow-lg mb-4">
        {transcripts.map((transcript, i) => {
          return (
            <p className="py-1 border-1 border-black my-1 px-2" key={i}>
              {transcript}
            </p>
          );
        })}
      </div>

      <div className="py-3 mb-2 flex items-center overflow-y-auto max-h-24">
        {keywords.map((keyword, i) => {
          return (
            <p className="py-1 px-2 border-1 border-black mx-1" key={i}>
              {keyword}
            </p>
          );
        })}
      </div>
      <div className="py-3 mb-2 border-1 border-black flex items-center overflow-x-auto flex-wrap max-h-24 overflow-y-auto">
        {topics.map((topic, i) => {
          return (
            <p className="py-1 px-2 border-1 border-black mx-1 mb-1" key={i}>
              {topic}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisConsumer;
