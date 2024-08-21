import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import usePayment from "../../../hooks/usePayment";

const PaymentHistory = () => {
  const [payments] = usePayment();
  return (
    <div>
      <SectionTitle heading={"PAYMENT HISTORY"} subHeading={"At a Glance!"} />
      <div>
        <h2>Total Payment: {payments.length}</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.email}</td>
                  <td>${payment.price}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
