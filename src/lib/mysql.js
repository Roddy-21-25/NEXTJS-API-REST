import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "aws.connect.psdb.cloud",
    user: "mmt4d491wyf7hvyqj79c",
    password: "pscale_pw_OsanDXP9yPuxGr5pXCjZe2Nme12LzeAVKLy0Q6pHQTb",
    // port: 3306,
    database: "nextmysqlcrud",
    //? Esto es para temas de practicas y test, lo ideal es que configuremos un SSL.
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
