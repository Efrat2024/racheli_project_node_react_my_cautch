const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = AutoIncrementFactory(mongoose);

const couchSchema = new mongoose.Schema({
  catalognumber: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  high: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
  deep: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // מערך של מחרוזות
    default: []  // ברירת מחדל היא מערך ריק
}
}, {
  timestamps: true
});

couchSchema.plugin(AutoIncrement, { 
    inc_field: 'catalognumber',
    start_at: 1111  // המספר ההתחלתי שלך
  });

module.exports = mongoose.model('Couch', couchSchema);