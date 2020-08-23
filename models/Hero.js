const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  title: {
    type: String,
  },
  categories: [{
    type: mongoose.Types.ObjectId,
    ref: "Category",
  }],
  properties: {
    difficulty: {
      type: Number,
    },
    skill: {
        type: Number
    },
    attack: {
        type: Number
    },
    servive: {
        type: Number
    }
  },

  // 技能介绍
  skills: [
      {
        icon: String,
        name: String,
        description: String,
        consume: Number, // 消耗
        restore: String, // 冷却值, 存在多个
      }
  ],

  // 加点建议
//  mainSkill: {
//      type: mongoose.Types.ObjectId,
//      ref: ''
//  }
// 顺风出装
attackEquipment: [
    {
        type: mongoose.Types.ObjectId,
        ref: 'Item'
    }
],
// 逆风出装
serviveEquipment: [
    {
        type: mongoose.Types.ObjectId,
        ref: 'Item'
    }   
],
// 使用技巧
usageTip: {
    type: String
},
// 对战技巧
battleTip: {
    type: String
},
// 团战思路
teamFightTip: {
    type: String
},
// 英雄关系

});

module.exports = mongoose.model("Hero", schema);
