require("dotenv").config();

const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
// const { sequelize } = require("./models");
const helmet = require("helmet");

app.use(logger("common"));
app.use(express.json());

app.use(helmet());

app.use(cors());

// resgistering routes
// ********************************
// student routes
// *******************************
app.use("/students", require("./APIRoutes/studentsRoutes.js"));
// ********************************
// staff routes
// *******************************
app.use("/staffs", require("./APIRoutes/staffsRoutes.js"));

// *******************************
// message routes
// ******************************
app.use("/message", require("./APIRoutes/messageRoutes.js"));
// ********************************
// department routes
// ******************************
// temporaly route for saving departments
app.use("/department",require("./APIRoutes/DepartmentalRoutes.js"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("your app is running on port 4000 ");
});


