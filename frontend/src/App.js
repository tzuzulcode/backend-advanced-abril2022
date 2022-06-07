import {loadStripe} from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'


const stripe = loadStripe("pk_test_51KTd1dCxJ8HWxsAUvHdkJU90wXuUHO4qa4bF5dq3A7kCPWLAiaPnQ4bDpvBqIVMHPdABDwVMODmDff6jl8ok59OJ00SeHORvaW")


const PaymentForm = () =>{

  const stripe = useStripe()
  const elements = useElements()

  const paySubscription = async (event)=>{
    event.preventDefault()
    const paymentResult = await stripe.confirmPayment({
      elements:elements.getElement(CardElement)
    })
    const result = await stripe.retrievePaymentIntent("pi_3L84ZuCxJ8HWxsAU0Zqd8XYE_secret_2924qd1gFsmvmnkMhO4lSbLOO")

    console.log(paymentResult)
    console.log(result)
  }


  return <form onSubmit={paySubscription}>
    <CardElement/>
    <button>Suscribirme</button>
  </form>
}

function App() {

  return (
    <>
      <h1>Formulario de pago</h1>
      <Elements stripe={stripe}>
        <PaymentForm/>
      </Elements>
    </>
  );
}

export default App;
