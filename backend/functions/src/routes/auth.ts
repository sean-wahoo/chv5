import { User } from "types/auth";
import * as mysql from "mysql2/promise";
import db_config from "utils/connection";
import { nanoid } from "nanoid";
import * as validator from "email-validator";
import * as jwt from "jsonwebtoken";

export const signUp = async (req: any, res: any) => {
  const connection = await mysql.createConnection(db_config);
  try {
    const user: User = { ...req.body };
    if (Object.keys(user).length < 1) throw new Error("Empty Request!");
    switch (user.type) {
      case "email": {
        if (!user.email || user.email.length < 1)
          throw new Error("Email not provided!");
        connection.connect();
        const user_id = nanoid(14);
        const [userExistingWithCredentials]: any = await connection.query(
          "SELECT user_id, email FROM users WHERE email = ? OR user_id = ?",
          [user.email, user_id]
        );
        if (userExistingWithCredentials.length > 0)
          throw new Error("User with that email already exists!");
        if (!validator.validate(user.email))
          throw new Error("Email is the wrong format!");
        await connection.query(
          "INSERT INTO users (user_id, display_name, email) VALUES (?, ?, ?)",
          [user_id, user.display_name, user.email]
        );
        const token = jwt.sign(user, process.env.JWT_KEY, {
          expiresIn: "2d",
        });
        user.user_id = user_id;
        connection.end();
        res.json({ message: "User successfully signed up!", user, token });
      }
      case "google": {
        console.log("google");
      }
    }
  } catch (error: any) {
    res.status(400).json({ code: error.code, message: error.message });
  }
};

export const deleteUser = async (req: any, res: any) => {
  const connection = await mysql.createConnection(db_config);
  try {
    const { user_id } = req.query;
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!user_id || user_id.length < 1) throw new Error("No user_id provided!");
    if (!token) throw new Error("Not authorized");
    connection.connect();
    const [userFromUserId]: any = await connection.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [user_id]
    );
    if (userFromUserId.length < 1)
      throw new Error("There is no user with that id!");
    await connection.query("DELETE FROM users WHERE user_id = ?", [user_id]);
    connection.end();
    res.json({ message: `Successfully deleted user with id ${user_id}` });
  } catch (error) {
    res.status(400).json({ code: error.code, message: error.message });
  }
};
