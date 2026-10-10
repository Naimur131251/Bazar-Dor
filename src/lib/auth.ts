import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.BETTER_AUTH_DB_URL;

if (!uri) {
  throw new Error("BETTER_AUTH_DB_URL is not defined");
}

const client = new MongoClient(uri);

const db = client.db("bazar-dor-auth-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
});
