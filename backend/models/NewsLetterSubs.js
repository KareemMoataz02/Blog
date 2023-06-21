const mongoose = require('mongoose');

const newsLetterSubsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const NewsLetterSubs = mongoose.model('NewsLetterSubs', newsLetterSubsSchema);

module.exports = NewsLetterSubs;
