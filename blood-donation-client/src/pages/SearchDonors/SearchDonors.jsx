import { useEffect, useState } from "react";
import useAxiosPublic from "../../API/useAxiosPublic";
import useDistrictsData from "../../API/useDistrictsData";
import SingleDonorData from "../../Components/SingleDonorData";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const SearchDonors = () => {
  const axiosPublic = useAxiosPublic();
  const [districtData] = useDistrictsData();
  const [upazilaData, setUpazilaData] = useState([]);
  const [donorData, setDonorData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  // getting upazila data based on districts
  const handleGetUpazilas = (e) => {
    e.preventDefault();
    const userDistricts = e.target.value;
    axiosPublic
      .post(`/upazilas?userDistricts=${userDistricts}`)
      .then((res) => setUpazilaData(res.data.data));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchedBloodGroup = form.bloodgroup.value;
    const searchedDistrict = form.district.value;
    const searchedUpazila = form.upazila.value;

    const searchData = {
      bloodgroup: searchedBloodGroup,
      district: searchedDistrict,
      upazila: searchedUpazila,
    };
    axiosPublic
      .post("/search-donors", searchData)
      .then((res) => setDonorData(res.data.data));
  };

  
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: true });
    }, 1000);
  }, []);

  // initial data;

  useEffect(() => {
    axiosPublic
      .get("/all-donors-default")
      .then((res) => setDonorData(res.data.data));
  }, [axiosPublic, refetch]);

  return (
    <div>
           <Helmet>
        <title>Life Flow : Search Donors</title>
      </Helmet>
      <div className="w-[90%] lg:h-[80vh] lg:w-[90vw] m-auto shadow-lg  md:p-5 lg:p-10 rounded-lg lg:rounded-2xl  ">
        <h1 className="text-center font-semibold text-xl md:text-2xl lg:text-4xl">
          Search Donors
        </h1>
        <div data-aos="fade-up" data-aos-duration="1500" className="flex flex-col lg:flex-row gap-5 p-5">
          <div className="lg:h-[60vh] p-2 lg:p-4 lg:w-1/4 mt-[67px] bg-red-500 rounded-md">
            <form
              onSubmit={handleSearch}
              className="space-y-3 p-3 text-[12px] md:text-[15px]"
            >
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                <label
                  className="text-white col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                  htmlFor="bloodgroup"
                >
                  Blood Group
                </label>
                <select
                  onChange={() => setRefetch(!refetch)}
                  className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
                  name="bloodgroup"
                  required
                >
                  <option value="none">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                <label
                  className="text-white col-span-1 md:col-span-2 text-[15px] lg:text-xl font-semibold"
                  htmlFor="district"
                >
                  District
                </label>
                <select
                  className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
                  name="district"
                  required
                  onChange={handleGetUpazilas}
                >
                  <option value="none">Select your district</option>
                  {districtData?.map((i) => (
                    <option key={i._id} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                <label
                  className="text-white col-span-1 md:col-span-2  text-[15px] lg:text-xl font-semibold"
                  htmlFor="upazila"
                >
                  Upazila
                </label>
                <select
                  className="col-span-2 md:col-span-3 lg:col-span-5 text-[12px] md:text-[15px] px-2 py-3 bg-red-50 outline-none"
                  name="upazila"
                  required
                >
                  <option value="none">Select your upazila</option>
                  {upazilaData?.map((i) => (
                    <option key={i._id} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                className="w-full text-center text-xl text-black font-semibold rounded-full  py-1 lg:py-2 bg-white disabled:cursor-not-allowed"
                type="submit"
                value="Search"
              />
            </form>
          </div>

          <div className="h-3/4 w-full py-5">
            <div className="overflow-x-auto ">
              <table className="table table-lg space-y-5">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>District</th>
                    <th>Upazilas</th>
                  </tr>
                </thead>
                <tbody>
                  {donorData.map((i, idx) => (
                    <SingleDonorData number={idx} key={i._id} data={i} />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>District</th>
                    <th>Upazilas</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDonors;
