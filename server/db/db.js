const mongoose = require("mongoose");

mongoose
  .connect(process.env.MOGNODBURI)
  .then(() => console.log(`DB connected successfully`))
  .catch((e) => console.log(`DB ERROR ${e}`));

module.exports = mongoose;
