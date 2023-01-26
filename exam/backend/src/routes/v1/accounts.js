import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { MYSQL_CONFIG } from "../config.js";
import { jwtSecret } from "../config.js";
import jwt from "jsonwebtoken";

const accountSchema = Joi.object({
  group_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});

export const postAccount = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const user_id = decryptedToken.id;
  let accountData = req.body;

  try {
    accountData = await accountSchema.validateAsync(accountData);
  } catch (err) {
    return res.status(400).send(err).end();
  }

  const query = `INSERT INTO accounts (group_id, user_id) VALUES ( ${accountData.group_id}, ${cleanUserId})`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [userGroup] = await con.execute(userExistsInGroup);

    if (Array.isArray(userGroup) && userGroup.length) {
      return res.send("User exist in group");
    }

    await con.execute(query);

    await con.end();

    res.status(200).send("user added to group");
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};

export const getAccounts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const user_id = decryptedToken.id;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [groups] = await con.execute(
      `SELECT * FROM accounts,
      SELECT * FROM groups,
      INNER JOIN accounts ON groups.id = accounts.group_id`
    );

    await con.end();

    return res.status(200).send(groups).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};
