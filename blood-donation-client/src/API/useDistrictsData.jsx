import { useContext } from "react";
import { SecurityContext } from "../Provider/SecurityProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useDistrictsData = () => {
    const {loading} = useContext(SecurityContext)
    const axiosPublic = useAxiosPublic();

    const {data:districtsData=[], isPending: isDistrictsLoading}= useQuery({
        queryKey : ["districtsData"],
        enabled: !loading,
        queryFn: async()=>{
          const res = await axiosPublic.get('/districts');
          return res.data.data
        }
      })

    return [districtsData,isDistrictsLoading]
};

export default useDistrictsData;