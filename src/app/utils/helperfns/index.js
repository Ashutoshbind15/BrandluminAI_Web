export const generatePromptFromIdea = (idea) => {
  const { title, description, type, media, theme, audienceInterests } = idea;

  const mediaList = media.join(", ");
  const themeList = theme.join(", ");
  const interestsList = audienceInterests.join(", ");

  return `Create a ${type} titled "${title}" that will be posted on ${mediaList}. 
    The content should be themed around ${themeList} and should appeal to audiences interested in ${interestsList}. 
    Description: ${description}`;
};

export const extractTranscriptsFromInsightsData = (insightsData) => {
  return insightsData?.videos[0]?.insights?.transcript.map((tr) => tr.text);
};

export const extractKeywordsFromInsightsData = (insightsData) => {
  console.log(insightsData?.summarizedInsights);

  return insightsData?.summarizedInsights?.keywords?.map(
    (keyword) => keyword.name
  );
};

export const extractTopicsFromInsightsData = (insightsData) => {
  return insightsData?.videos[0]?.insights?.topics.map((topic) => topic.name);
};

export const generatePromptFromInsightsData = (insightsData, media) => {
  console.log(insightsData);

  const keywords = extractKeywordsFromInsightsData(insightsData);
  const topics = extractTopicsFromInsightsData(insightsData);
  const transcripts = extractTranscriptsFromInsightsData(insightsData);

  const keywordsList = keywords.join(", ");
  const topicsList = topics.join(", ");
  const transcriptsList = transcripts.join(" ");

  return `Create a ${media} that is themed around ${topicsList} and includes the following keywords: ${keywordsList}. 
        The content should be based on the following transcript: ${transcriptsList}`;
};
