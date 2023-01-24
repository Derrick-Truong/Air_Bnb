'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = 'air_bnb';  // define your schema in options object
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Users';
        return queryInterface.bulkInsert(options, [
            {
                firstName: 'Derrick',
                lastName: 'Truong',
                email: 'dtruong169@gmail.com',
                username: 'DerrickTruong',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'Brandon',
                lastName: 'Truong',
                email: 'btruong24@gmail.com',
                username: 'BrandonTruong',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                firstName: 'Jessica',
                lastName: 'Truong',
                email: 'jtruong30@gmail.com',
                username: 'JessicaTruong',
                hashedPassword: bcrypt.hashSync('password')
            }

        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Users';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: ['DerrickTruong', 'BrandonTruong', 'JessicaTruong'] }
        }, {});
    }
};
