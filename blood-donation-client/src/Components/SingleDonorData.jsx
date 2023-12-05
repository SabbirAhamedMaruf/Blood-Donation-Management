import PropTypes from 'prop-types';
const SingleDonorData = ({number,data}) => {
  return (
    <tr>
      <th>{number+1}</th>
      <td><img src={data.photo} className="w-14"/></td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.district}</td>
      <td>{data.upazila}</td>

    </tr>
  );
};
SingleDonorData.propTypes={
    data:PropTypes.object,
    number:PropTypes.number
}
export default SingleDonorData;
