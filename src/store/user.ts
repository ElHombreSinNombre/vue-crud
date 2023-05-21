import { defineStore } from "pinia";
import { User } from "../endpoints/user";
import { UserModel } from "./../models/User";
import userParsers from "../parsers/user";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [] as UserModel[],
  }),
  getters: {
    getUser(state: any) {
      return state.users;
    },
  },
  actions: {
    async fetchUsers(value: string) {
      const allUsers = await User.fetchUsers(value);
      if (allUsers) {
        this.allUsers = userParsers(allUsers);
        return this.allUsers;
      }
    },
    addUser(value: UserModel) {
      this.users.push(value);
    },
    editUser(value: UserModel) {
      const index = this.users.findIndex(
        (user: UserModel) => user.id === value.id
      );
      if (index !== -1) {
        this.users[index] = value;
      }
    },
    removeUser(value: UserModel) {
      const index = this.users.findIndex(
        (user: UserModel) => user.id === value.id
      );
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
  },
});
