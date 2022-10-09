'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Insert
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('cars', [{
      car_name: 'BMW',
      rent_cost: 250000000,
      car_size: 'Large',
      car_image: 'https://res.cloudinary.com/dd93u8fa5/image/upload/v1665083435/Challenge%20Chapter%205/cars-card_fkaee5.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      car_name: 'Ivanza',
      rent_cost: 150000000,
      car_size: 'Medium',
      car_image: 'https://res.cloudinary.com/dd93u8fa5/image/upload/v1665083435/Challenge%20Chapter%205/cars-card_fkaee5.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      car_name: 'Kijang',
      rent_cost: 100000000,
      car_size: 'Small',
      car_image: 'https://res.cloudinary.com/dd93u8fa5/image/upload/v1665083435/Challenge%20Chapter%205/cars-card_fkaee5.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  // Delete
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
