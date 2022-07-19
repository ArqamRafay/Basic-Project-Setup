// Credential for arqam's system
module.exports = {
    username: "postgres",
    password: "admin",
    database: "basicprojectsetup",
    host: 'localhost',
    port: 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
// module.exports = {
//     username: process.env.RDS_USERNAME,
//     password: process.env.RDS_PASSWORD,
//     database: process.env.RDS_DB_NAME,
//     host: process.env.RDS_HOSTNAME,
//     port: process.env.RDS_PORT,
//     dialect:process.env.RDS_DIALECT
// }
// add space
