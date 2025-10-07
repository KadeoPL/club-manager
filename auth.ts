import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import PostgresAdapter from "@auth/pg-adapter";
import { QueryResult } from "pg";
import Credentials from "@auth/core/providers/credentials";
import { pool } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PostgresAdapter(pool),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        name: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        if (
          typeof credentials.name !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        try {
          const result: QueryResult = await pool.query(
            "SELECT id, name, password FROM users WHERE name = $1",
            [credentials.name]
          );
          console.log("Query result", result.rows);
          user = result.rows[0];

          if (!user) {
            throw new Error("User doesn't exsist.");
          }
        } catch (error) {
          console.error("Erorr with autorization", error);
          return null;
        }

        return user;
      },
    }),
  ],
});
