import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";
import useAxiosSecure from "./useAxiosSecure";

const useMyDonationData = () => {
  const { user, loading } = useContext(SecurityContext);
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: mydonationData = [],
    isPending: isMyDonationDataLoading,
  } = useQuery({
    queryKey: [user?.email, "mydonationData"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/mydonationrequest?email=${user.email}`
      );
      return res.data.data;
    },
  });
  return [mydonationData, refetch, isMyDonationDataLoading];
};

export default useMyDonationData;
