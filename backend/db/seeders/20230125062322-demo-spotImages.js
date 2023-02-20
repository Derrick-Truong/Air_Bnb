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
        url: "https://media.designcafe.com/wp-content/uploads/2020/07/23205856/home-interior-design-ideas.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://media.architecturaldigest.com/photos/5e9f0a12d5eaf100086259e0/master/w_1600%2Cc_limit/Peter_Sandel_0222.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.coloradohomesmag.com/content/uploads/2021/01/living-room2c-entrepreneur-laura-lovee28099s-denver-home2c-hentschel-designs2c-colorado-homes-and-lifestyles-magazine.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://luxesource.com/wp-content/uploads/2022/01/LX_Arizona67_HOM_Wright_07.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://cdn2.lamag.com/wp-content/uploads/sites/6/2018/06/house-los-angeles-getty.jpg",
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











