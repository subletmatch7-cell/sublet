const Lead = require("../models/Lead");
const resend = require("../config/resend");

exports.createLead = async (req, res) => {
  const { name, email, message } = req.body;

  const lead = await Lead.create({ name, email, message });

  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: "info@subletmatch.com",
    subject: "New Contact Form Submission",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  });

  res.status(201).json({ message: "Message sent successfully" });
};

