export class User {
  static async fetchUsers(value: string) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?name_like=${value}`
      );
      if (res.status === 200) {
        return res.json();
      }
    } catch (e) {
      throw new Error("Failed in fetch user");
    }
  }
}
