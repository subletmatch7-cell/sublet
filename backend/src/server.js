require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const expireListingsJob = require("./cron/expireListings");

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);

    // Start cron jobs
    expireListingsJob();
  });
});
