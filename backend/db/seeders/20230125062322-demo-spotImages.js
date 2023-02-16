"use strict";

/** @type {import("sequelize-cli").Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/8fa2e8aa-fecd-440b-91fc-ad97960b92d9.jpg?im_w=960",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-48381226/original/88d44ac7-cfa2-432f-8e7e-37fdef42a2e7.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/ab705410-ed9c-428f-b59d-ba6c74e44d74.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-763901226738818596/original/79778ad8-15b2-49b4-a60f-e61e88095ad7.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/d6003505-bc69-4772-b8f2-54f753be6fd3.jpg?im_w=720",
        preview: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["url-path1", "url-path2", "url-path3"] }
    }, {});
  }
};











