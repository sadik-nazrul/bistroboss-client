import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForms from "./CheckOutForms";

// TODO: Add Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
  return (
    <div>
      <SectionTitle heading={"Payment"} subHeading={"Please pay to cart"} />
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForms />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
