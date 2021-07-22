const mongoose = require("mongoose");

// need to add a actor/actresses array to ref actor/actresses they have favorited

const fighterSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Nickname: String,
  Record: String,
  Wins: String,
  Losses: String,
  Draws: String,
  Height: String,
  Weight: String,
  Reach: String,
  Stance: String,
  SLpM: String,
  Str: {
    _Acc: String,
    _Def: String
  },
  SApM: String,
  TD_Avg: String,
  TD_Acc: String,
  TD_Def: String,
  Sub: {
    _Avg: String
  },
  URL: String,
  nick: String,
  class: String,
  extras: {
    record: {
      wins: {
        total: Number,
        knockouts: Number,
        submissions: Number,
        decisions: Number,
        others: Number
      },
      losses: {
        total: Number,
        knockouts: Number,
        submissions: Number,
        decisions: Number,
        others: Number
      },
      no_contests: {
        type: Number,
        default: null,
        required: false,
      }
    },
    fights: [
      {
        name: String,
        date: String,
        url: String,
        result: String,
        method: String,
        referee: String,
        round: String,
        time: String,
        opponent: {
          name: String,
          url: String
        }
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Fighters = mongoose.model("Fighters", fighterSchema);

module.exports = Fighters;