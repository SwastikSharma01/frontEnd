require("dotenv").config();

const express = require("express");
const sgMail = require("@sendgrid/mail");
const path = require("path");

const app = express();
const PORT = 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/subscribe", (req, res) => {
  const userEmail = req.body.email;

  const msg = {
    to: userEmail,
    from: "swastik4893.se24@chitkara.edu.in", 
    subject: "Welcome to DEV@Deakin!",
    text: "Thanks for subscribing to DEV@Deakin!",
  };

  sgMail
    .send(msg)
    .then(() => res.send(`<h2 style="color: green; text-align: center;"> Email sent to: ${userEmail} </h2>`))
    .catch((error) => {
      console.error(error);
      res.send(`<h2 style="color: red; text-align: center;"> Failed to send email </h2>`);
    });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
