const app = require("express")();
const path = require("path");
 
const cors = require("cors");
 
const shortid = require("shortid");
const Razorpay = require("razorpay");
 
const razorpay = new Razorpay({
  key_id: "rzp_test_6P6dYQ66MKQp7I",
  key_secret: "PIHr6I4TlIPN3TkAcz2TWNKs",
});
 
app.use(cors());
 
// Serving company logo
app.get("/logo.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.jpg"));
});
 
app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";
 
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
 
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});
 
app.listen(1337, () => {
  console.log("Backend running at localhost:1337");
});