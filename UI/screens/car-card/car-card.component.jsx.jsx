import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";

//2. Implement shadow for cards and change overall layout of button and have casaroul

const Card = ({ img, variant, desc, order_id }) => {

  const {currentUser} = useContext(AuthContext)

  const checkdb = async () =>{
    await axios.get('http://10.0.2.2:5001/carwash-60ef0/us-central1/api/check_db')
  }

  const paymentVerification = async (checkoutData, options) => {
    try {
      console.log(currentUser)
      //todo: post request to server to store checkoutData in server
      const data = await axios.post(
        "http://10.0.2.2:5001/carwash-60ef0/us-central1/api/orders/paymentVerification",
        [checkoutData, currentUser]
      );
    } catch(e){
      console.log("Payment Verification Error(Client-Side):" + e);
    }
  };

  const checkoutHandler = async (options) => {
    try {
      const checkoutData = await RazorpayCheckout.open(options);
      console.log(checkoutData);
      paymentVerification(checkoutData, options);
    } catch (error) {
      console.log("checkout Error:", error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        "http://10.0.2.2:5001/carwash-60ef0/us-central1/api/orders",
        {
          amount: 10000,
          currency: "INR",
          receipt: "receipt#1",
        }
      );
      console.log(data);
      if (data.status == "created") {
        const { amount, id } = data;
        console.log(amount, id);
        const options = {
          description: "Payment for gray Button",
          image: "https://i.imgur.com/3g7nmJC.jpg",
          currency: "INR",
          key: "rzp_test_yhb3fVA9vsfWO9",
          amount: amount,
          name: "Frankline Corp",
          order_id: id,
          prefill: {
            email: "gaurav.kumar@example.com",
            contact: "9191919191",
            name: "Gaurav Kumar",
          },
          theme: { color: "#53a20e" },
        };

        checkoutHandler(options);
      }
    } catch (e) {
      console.log("Payment Error", e.message);
    }
  };

  return (
    <View elevation={5} style={styles.container}>
      <Image source={img} style={{ height: 150, width: 300 }} />
      {/* <Text>{desc}</Text> */}
      {/* handleCheckout */}
      <Pressable style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>{variant}</Text>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd8b2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    height: 40,
    minWidth: "50%",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
