import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";
import useAxiosSecure from "./useAxiosSecure";

const useDonorDonationData = () => {
  const { user, loading } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: donorDonationData = [],
    isPending: isDonorDonationLoading,
  } = useQuery({
    queryKey: [user?.email, "donorDonationData"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/fetchdonordonation?email=${user.email}`
      );
      return res.data.data;
    },
  });
  return [donorDonationData, refetch, isDonorDonationLoading];
};

export default useDonorDonationData;
