module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Themes', [
      { type: 'color', value: '#ffffff', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#5f5f5f', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#f11437', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#46ff76', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#ffc245', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#da36ff', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#1491f1', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#46f8ff', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#16a085', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#d35400', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#ecf0f1', createdAt: new Date(), updatedAt: new Date() },
      { type: 'color', value: '#2c3e50', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/1.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/2.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/3.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/4.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/5.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/6.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/7.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/8.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'pattern', value: 'https://server.feedbackwow.com/images/patterns/9.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/1.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/2.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/3.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/4.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/5.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/6.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/7.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/8.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/9.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/10.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/11.jpg', createdAt: new Date(), updatedAt: new Date() },
      { type: 'image', value: 'https://server.feedbackwow.com/images/pictures/12.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/1.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/2.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/3.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/4.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/5.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/6.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/7.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/8.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'pattern', value: 'http://localhost:8081/images/patterns/9.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/1.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/2.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/3.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/4.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/5.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/6.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/7.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/8.jpg', createdAt: new Date(), updatedAt: new Date() },
      // { type: 'image', value: 'http://localhost:8081/images/pictures/9.jpg', createdAt: new Date(), updatedAt: new Date() },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Themes', [
      { type: 'color', value: 'white', createdAt: new Date(), updatedAt: new Date() }
    ])
  }
};
