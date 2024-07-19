'use client'

import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button } from '@/lib/material-ui'


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
				return_url: "http://localhost:3000/",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center align-center gap-3">
      <PaymentElement />
      <Button variant="outlined" className="m-3" type="submit" disabled={!stripe}>Submit</Button>
    </form>
  )
};

export default CheckoutForm;

