'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: "2021-10-22",
        endDate: "2021-11-26"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2020-07-15",
        endDate: "2020-10-20"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2018-10-23",
        endDate: "2018-11-21"
      },
      {
        spotId: 4,
        userId: 3,
        startDate: "2019-10-23",
        endDate: "2019-11-21"
      },
      {
        spotId: 5,
        userId: 2,
        startDate: "2020-10-23",
        endDate: "2020-11-21"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
