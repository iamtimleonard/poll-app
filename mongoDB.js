const mongoose = require("mongoose");

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
