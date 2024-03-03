import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useIdeas = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ideas"],
    queryFn: async () => {
      const { data } = await axios.get("/api/idea");
      return data;
    },
  });

  return {
    ideas: data,
    isIdeasLoading: isLoading,
    isIdeasError: isError,
    ideasError: error,
  };
};
