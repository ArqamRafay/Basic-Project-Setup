module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Twilio_feedbackwow_credentials', [
      {
        sid: 'AC910d5642d07b8b5626e2606bfb138c5b',
        auth_token: '10e7bc7f8b39d843a7c4c50a8c1e42b6',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Twilio_feedbackwow_credentials', [{
      user_id: 1
    }])
  }
};
