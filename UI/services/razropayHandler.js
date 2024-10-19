import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";

const checkdb = async () => {
  await axios.get(
    "http://10.0.2.2:5001/carwash-60ef0/us-central1/api/check_db"
  );
};

const paymentVerification = async (checkoutData) => {
  try {
    console.log(currentUser);
    //todo: post request to server to store checkoutData in server
    const data = await axios.post(
      "http://10.0.2.2:5001/carwash-60ef0/us-central1/api/orders/paymentVerification",
      [checkoutData, currentUser]
    );
  } catch (e) {
    console.log("Payment Verification Error(Client-Side):" + e);
  }
};

const checkoutHandler = async (options) => {
  try {
    const checkoutData = await RazorpayCheckout.open(options);
    console.log(checkoutData);
    paymentVerification(checkoutData);
  } catch (error) {
    console.log("checkout Error:", error.message);
  }
};

export const handleCheckout = async (title, price, userData, subscriptionData) => {
  try {
    // console.log(price,subscriptionData,userData);
    const { data } = await axios.post(
      "http://10.0.2.2:5001/carwash-60ef0/us-central1/api/orders",
      {
        amount: price,
        currency: "INR",
        receipt: "receipt#1",
      }
    );
    // console.log(data);
    if (data.status == "created") {
      const { amount, id } = data;
      console.log(amount, id);
      const {displayName,email,phone} = userData;
      console.log(displayName,email,phone)
      const phoneNo = "91"+phone
      const options = {
        description: `Payment for wash service for ${title}`,
        image: "https://i.imgur.com/3g7nmJC.jpg",
        currency: "INR",
        key: "rzp_test_yhb3fVA9vsfWO9",
        amount: amount,
        name: "Frankline Corp",
        order_id: id,
        prefill: {
          email: email,
          contact: phoneNo,
          name: displayName,
        },
        theme: { color: "#53a20e" },
      };

      checkoutHandler(options);
    }
  } catch (e) {
    console.log("Payment Error", e.message);
  }
};
