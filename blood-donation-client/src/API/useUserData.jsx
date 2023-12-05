import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
  const { user, loading } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: userData = {},
    isPending: isUserTypeLoading,
  } = useQuery({
    queryKey: [user?.email, "userData"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/dashboard?email=${user.email}`);
      return res.data.data;
    },
  });
  return [refetch, userData, isUserTypeLoading];
};

export default useUserData;
