const mongoose = require('mongoose');

let systemInfoScheme = new mongoose.Schema({
  info: { type: JSON },
});
module.exports = mongoose.model('SystemInfo', systemInfoScheme );
