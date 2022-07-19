module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Features', [
      {
        name: 'mcq',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'text',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'rating',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'slider',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'likeDislike',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'NPS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pictureChoice',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'distlink',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'distsms',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'distwosms',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'distemail',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'backgroundimages',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Question_types', [{
      id: 10,
      name: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  }
};
