const express = require("express");
const db = require("./models");
const app = express();
const indexRouter = require("./routes/index");
const awsRouter = require("./routes/aws");

db.sequelize.sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/aws', awsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});