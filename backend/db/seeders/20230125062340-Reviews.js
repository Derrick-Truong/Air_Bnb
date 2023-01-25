'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review:'It was magnificent',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review:'Sucks',
        stars: 3
      },
      {
        spotId: 1,
        userId: 2,
        review:'Wish it was longer',
        stars: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['It was magnificent', 'Sucks', 'Wish it was longer'] }
    }, {});
  }
};
