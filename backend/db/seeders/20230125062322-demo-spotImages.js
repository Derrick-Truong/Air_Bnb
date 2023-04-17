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
        url: "https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg",
        preview: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ["https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg", "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg", "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg", "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg","https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/Stock-Modern-House-With-Large-Pool-AdobeStock-127770833-Copy.jpg"] }
    }, {});
  }
};











