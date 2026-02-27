

const express = require("express");
const cors = require("cors");
require("express-async-errors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");




const authRoutes = require("./routes/auth.routes");
const publicListings = require("./routes/public.listing.routes");
const listerListings = require("./routes/lister.listing.routes");
const adminListings = require("./routes/admin.listing.routes");
const inquiryRoutes = require("./routes/inquiry.routes");
const webhookRoutes = require("./routes/webhook.routes");
const paymentRoutes = require("./routes/payment.routes");
const errorHandler = require("./middleware/error.middleware");
const leadRoutes = require("./routes/lead.routes");
const listerInquiryRoutes = require("./routes/lister.inquiry.routes");
const userRoutes = require("./routes/admin.users");
const { forgotPassword, resetPassword} = require("./controllers/auth.controller");















const app = express();

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  next();
});

app.use(cors({ 
  origin: [
    "http://localhost:5173",
    "https://www.subletmatch.com",
    "https://subletmatch.com",
    "http://subletmatch.com",
  ]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/listings", publicListings);
app.use("/api/lister/listings", listerListings);
app.use("/api/admin/listings", adminListings);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin/inquiries", require("./routes/admin.inquiry.routes"));
app.use("/api/webhooks", webhookRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/leads", leadRoutes);
app.use(
  "/api/lister/inquiries", listerInquiryRoutes
);
app.use("/api/admin/users", userRoutes);

// Password reset routes
app.use("/api/auth/forgot-password", forgotPassword);
app.use("/api/auth/reset-password/:token", resetPassword);


app.use(errorHandler);


module.exports = app;
