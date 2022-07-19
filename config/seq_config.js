// Credential of arqam's system
development = {
  username: "postgres",
  password: "admin",
  database: "basicprojectsetup",
  host: "localhost",
  port: 5432,
  dialect: "postgres"
}
production = {
  username: "feedbackuser",
  password: "feedbackpass",
  database: "feedback_wow",
  host: "feedback-db-dev.coaufei32lth.us-west-2.rds.amazonaws.com",
  port: 5432,
  dialect: "postgres"
}

module.exports = {
  development
  // production
}
