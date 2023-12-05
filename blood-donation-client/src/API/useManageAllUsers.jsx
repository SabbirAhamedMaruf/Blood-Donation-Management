import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";
import useAxiosSecure from "./useAxiosSecure";

const useManageAllUsers = () => {
  const { user, loading } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: allUsers = [],
    isPending: isUserTypeLoading,
  } = useQuery({
    queryKey: [user?.email, "allUsers"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/allUsers?email=${user.email}`);
      return res.data.data;
    },
  });

  return [refetch, allUsers, isUserTypeLoading];
};

export default useManageAllUsers;
