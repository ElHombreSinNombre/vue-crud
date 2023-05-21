import axios from "axios";

export class User {
  static async fetchUsers(value: string) {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users?name_like=" + value
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (e) {
      throw new Error("Failed in fetch user");
    }
  }
}
