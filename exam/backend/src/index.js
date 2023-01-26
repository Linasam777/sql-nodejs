import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { loginUser, registerUser } from "./v1/auth.js";
import { postGroup, getGroups } from "./v1/groups.js";
import { postAccount, getAccounts } from "./v1/accounts.js";
import { postBill, getBills } from "./v1/bills.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/v1/auth/register", registerUser);
app.post("/v1/auth/login", loginUser);
app.post("/v1/groups/groups", postGroup);
app.get("/v1/groups/groups", getGroups);
app.post("/v1/accounts/postAccount", postAccount);
app.get("/v1/accounts/getAccounts", getAccounts);
app.get("/v1/bills/getBills", getBills);
app.post("/v1/bills/postBils", postBill);

app.all("*", (req, res) => {
  logger.warn(`Page not found: ${req.url}`);
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
