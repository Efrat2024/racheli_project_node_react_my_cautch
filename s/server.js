require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 7001;
const app = express();

connectDB();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/couch", require("./routes/couchRoute"));
app.use("/api/shopingCart", require("./routes/shopingCartRoute"));

// Routes
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
});