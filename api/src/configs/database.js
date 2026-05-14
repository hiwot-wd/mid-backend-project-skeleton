import knex from "knex";
import { createKnexConfig } from "#configs/knex-config.js";

const db = knex(createKnexConfig());

export default db;
