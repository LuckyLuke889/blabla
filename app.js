const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;
var favicon = require("serve-favicon");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/SW.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "SW.js"));
});
app.get("/public/pwa.webmanifest", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pwa.webmanifest"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/contact.html"));
});
app.post("/contact", (req, res) => {
  //console.log(JSON.stringify(req.body));
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "brunoojaa@gmail.com",
      pass: "onbrwmtdtcxtvbrn",
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: "brunoo.jaa@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("email sent: " + info.response);
      res.send("success");
    }
  });
});

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.listen(port);
