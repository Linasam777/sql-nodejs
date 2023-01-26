import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { MYSQL_CONFIG } from "../config.js";
import { jwtSecret } from "../config.js";
import jwt from "jsonwebtoken";

const billsSchema = Joi.object({
  group_id: Joi.number().integer().required(),
  amount: Joi.number().required(),
  description: Joi.string().trim().required(),
});

export const postBill = async (req, res) => {
  let billData = req.body;
  try {
    billData = await billsSchema.validateAsync(billData);
  } catch (err) {
    return res.status(400).send({ err }).end();
  }

  const query = `INSERT INTO bills (group_id, amount, description) VALUES (${billData.group_id}, ${billData.amount}, '${billData.description}')`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send({ message: `Bill added succesfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Server error. Please try again." });
  }
};

export const getBills = async (req, res) => {
  let billData = req.params;

  try {
    billData = await billsSchema.validateAsync(billData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [groups] = await con.execute(
      `SELECT * FROM bills WHERE group_id = ${billData.group_id}`
    );

    await con.end();

    return res.status(200).send(groups).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Server error. Please try again." });
  }
};
