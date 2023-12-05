import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdminDonationData = () => {
  const { user, loading } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: adminDonationData = [],
    isPending: isDonorDonationLoading,
  } = useQuery({
    queryKey: [user?.email, "adminDonationData"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/getalldonation?email=${user.email}`);
      return res.data.data;
    },
  });
  return [adminDonationData, refetch, isDonorDonationLoading];
};

export default useAdminDonationData;
