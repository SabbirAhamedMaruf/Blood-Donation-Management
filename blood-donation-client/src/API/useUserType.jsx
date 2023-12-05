import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";
import useAxiosPublic from "./useAxiosPublic";

const useUserType = () => {
  const { user, loading } = useContext(SecurityContext);
  const axiosPublic = useAxiosPublic();

  const { data: userType, isPending: isUserTypeLoading } = useQuery({
    queryKey: ["userType", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/dashboard?email=${user.email}`);
      return res.data?.data.userType;
    },
  });
  return [userType, isUserTypeLoading];
};

export default useUserType;
