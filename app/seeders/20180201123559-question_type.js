module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Question_types', [
      {
        id: 1,
        name: 'blank',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'mcq',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'text',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'rating',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'slider',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'likeDislike',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'NPS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'pictureChoice',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Question_types', [{
      name: 'test'
    }])
  }
};
