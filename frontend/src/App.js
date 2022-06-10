import {loadStripe} from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import {
  PayPalScriptProvider,
  PayPalButtons
} from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'


const stripe = loadStripe("pk_test_51KTd1dCxJ8HWxsAUvHdkJU90wXuUHO4qa4bF5dq3A7kCPWLAiaPnQ4bDpvBqIVMHPdABDwVMODmDff6jl8ok59OJ00SeHORvaW")


const PaymentForm = () =>{

  const [clientSecret,setClientSecret] = useState("")

  useEffect(()=>{
    fetch("http://localhost:4000/api/subscriptions/create",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify({
        customerID:"cus_Lpk3VUuBf2FORt",
        priceID:"price_1L84UDCxJ8HWxsAUpQ0SdEPw"
      })
    })
    .then(response=>response.json())
    .then(data=>{
      setClientSecret(data.clientSecret)
    })
  },[])

  const stripe = useStripe()
  const elements = useElements()

  const paySubscription = async (event)=>{
    event.preventDefault()
    const cardElement = elements.getElement(CardElement)
    const paymentResult = await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:cardElement,
        billing_details:{
          name:"Tzuzul Code",
          email:"mail@tzuzulcode.com"
        }
      }
    })

    console.log(paymentResult)
  }


  return <form onSubmit={paySubscription}>
    <CardElement/>
    <button>Suscribirme</button>
  </form>
}

function App() {

  const createPayPalSubscription = (data,actions)=>{
    return actions.subscription.create({
      'plan_id':'P-3XT7942048806484FMKRWRZA'
    })
  }

  return (
    <>
      <h1>Formulario de pago</h1>
      <Elements stripe={stripe}>
        <PaymentForm/>
      </Elements>
      <PayPalScriptProvider options={{
        "client-id":"AbRzoW7gcghQsM3Ie-wU374DyvMm5eT8ro7_hcGuU83fQmHwWaGyGIO1Jgfl3vjTZKNGKDmASYbRblcb",
        "intent":"subscription",
        "components":"buttons",
        "vault":true
      }}>
        <PayPalButtons
          style={{
            layout:"horizontal",
            color:"blue",
            label:"subscribe"
          }}
          createSubscription={createPayPalSubscription}
          onApprove={(data,actions)=>{
            console.log(data.subscriptionID)
          }}
        />
      </PayPalScriptProvider>
    </>
  );
}

export default App;
