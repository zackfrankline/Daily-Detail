//store all 3 fields in server
//1. razorpay_payment_id
//2. razorpay_order_id different from frontend order id
//3. razorpay_signature
// use all to verify payment signature

const express = require("express");
const RazorPay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");
const { PaymentController } = require("./controller/PaymentController");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

initializeApp(firebaseConfig);


const app = express();
const db = getFirestore();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/orders", async (req, res) => {
  try {
    const razorpayInstance = new RazorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (e) {
    console.log("error" + e.message);
  }
});

app.get("/check_db", async (res) => {
  try {
    const userDocRef = db.collection("Users").doc();
    const userDoc = await userDocRef.get();
    console.log(userDoc.exists)
    // if (!) {
    //   console.log("No Document");
    // } else {
    //   console.log("document data:", userDoc);
    // }
  } catch (error) {
    console.log("Payment Controller Error:", error);
  }
  
});

app.post("/orders/paymentVerification", (req, res) => {
  try {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    const [checkoutData, userAuth] = req.body;
    const { razorpay_order_id, razopay_payment_id, razorpay_signature } =
      checkoutData;
    console.log(razorpay_order_id);
    const verification = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razopay_payment_id },
      razorpay_signature,
      process.env.RAZORPAY_SECRET
    );

    //Updating user subcription
    PaymentController.updateUserSubscription(userAuth.uid, db);
  } catch (error) {
    console.log("payment Verification Error(Server-Side):", error.message);
  }
});

exports.api = onRequest(app);
