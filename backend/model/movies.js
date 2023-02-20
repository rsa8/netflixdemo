const mongoose = require('mongoose');

let moviesScheme = new mongoose.Schema({
  useremail: { type: String },
  movie: { type: JSON },
  cast: { type: JSON },
  details: { type: JSON }
});
module.exports = mongoose.model('Movies', moviesScheme );
