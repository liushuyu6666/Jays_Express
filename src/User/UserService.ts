import { User } from "./User";
import { UserRepository } from "./UserRepository";
import bcrypt from "bcryptjs";

export class UserService {
  static async registerUser(
    username: string,
    password: string,
    email: string
  ): Promise<User | string> {
    // Check if user with the same email already exists.
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) {
      return "User with the same email already exists";
    }
    console.log(`UserService get username: ${username}`);

    // Create a new User.
    // TODO: handle with the error from database.
    const newUser = UserRepository.addUser(username, password, email);

    return newUser;
  }

  static async verifyUserAndReturnUserId(email: string, password: string): Promise<string | undefined> {
    const loginUser = await UserRepository.getUserByEmail(email);

    if (!loginUser) {
      return undefined;
    }

    if (bcrypt.compareSync(password, loginUser?.password)) {
        return loginUser.userId;
    } else {
        return undefined;
    }
  }
}