import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useIdeas = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
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
    refetchIdeas: refetch,
  };
};

export const useUser = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data;
    },
  });

  return {
    user: data,
    isUserLoading: isLoading,
    isUserError: isError,
    userError: error,
    refetchUser: refetch,
  };
};
