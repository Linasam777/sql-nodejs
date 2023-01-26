import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { MYSQL_CONFIG } from "../config.js";
import { jwtSecret } from "../config.js";
import jwt from "jsonwebtoken";

const groupSchema = Joi.object({
  name: Joi.string().trim().required(),
});
export const postGroup = async (req, res) => {
  let groupData = req.body;
  try {
    groupData = await groupSchema.validateAsync(groupData);
  } catch (err) {
    return res.status(400).send({ error: err }).end();
  }

  const query = `INSERT INTO groups (name) VALUES ('${groupData.name}')`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send("Group added succesfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Server error. Please try again." });
  }
};

export const getGroups = async (_, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [groups] = await con.execute("SELECT * FROM `groups`");

    await con.end();

    return res.status(200).send(groups).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Server error. Please try again." });
  }
};
