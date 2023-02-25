// "use strict";

// /** @type {import("sequelize-cli").Migration} */
// const bcrypt = require("bcryptjs");

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;  // define your schema in options object
// }
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     options.tableName = 'SpotImages';
//     return queryInterface.bulkInsert(options, [
//       {
//         spotId: 1,
//         url: "https://a0.muscache.com/im/pictures/8fa2e8aa-fecd-440b-91fc-ad97960b92d9.jpg?im_w=960",
//         preview: true
//       },
//       {
//         spotId: 2,
//         url: "https://a0.muscache.com/im/pictures/ecd58908-fbe3-44bd-9a1d-3c95b6742b0c.jpg?im_w=1200",
//         preview: true
//       },
//       {
//         spotId: 3,
//         url: "https://a0.muscache.com/im/pictures/d3532f3b-5dbe-45b3-b63f-ef4a08355408.jpg?im_w=1200",
//         preview: true
//       },
//       {
//         spotId: 4,
//         url: "https://a0.muscache.com/im/pictures/miso/Hosting-48381226/original/88d44ac7-cfa2-432f-8e7e-37fdef42a2e7.jpeg?im_w=1200",
//         preview: true
//       },
//       {
//         spotId: 5,
//         url: "https://a0.muscache.com/im/pictures/9b03dbf5-2800-493d-8451-40113cf1e65b.jpg?im_w=1200",
//         preview: true
//       }
//     ], {});
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = "SpotImages";
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete(options, {
//       url: { [Op.in]: ["url-path1", "url-path2", "url-path3"] }
//     }, {});
//   }
// };











