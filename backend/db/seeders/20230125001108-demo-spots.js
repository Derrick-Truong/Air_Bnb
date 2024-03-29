"use strict";

/** @type {import("sequelize-cli").Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

 options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "12 Poplar St",
        city: "Millbrae",
        state: "California",
        country: "United States of America",
        lat: 21.1243254,
        lng: -122.1234567,
        name: "Fun Land",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 3
      },
      {
        ownerId: 2,
        address: "35 Depressing Lane",
        city: "Smiles",
        state: "Texas",
        country: "United States of America",
        lat: 34.1326893,
        lng: -133.6739573,
        name: "Candy House",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 599
      },
      {
        ownerId: 3,
        address: "123 Left Corner",
        city: "Righty",
        state: "Alaska",
        country: "United States of America",
        lat: 34.20376935,
        lng: -155.2957394,
        name: "Mid",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 57
      },
      {
        ownerId: 1,
        address: "456 Middle",
        city: "Nowhere",
        state: "Missouri",
        country: "United States of America",
        lat: 12.20126935,
        lng: -115.2957194,
        name: "Not My Cup of Tea",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 80
      },
      {
        ownerId: 2,
        address: "333 Right Corner",
        city: "Halibut",
        state: "Arkansas",
        country: "United States of America",
        lat: 14.20377735,
        lng: -125.2957312,
        name: "Perfect Land",
        description: "Happiness place on Earth, might be the go to spot if I am being honest. Nice get away from your children",
        price: 66
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Candy House", "Not My Cup of Tea", "Perfect Land"] }
    }, {});

  }
};
