<template>
  <div>
    <div class="center">
      <div class="max-w-md mx-auto">
        <div class="card">
          <div class="fa-xl items-center my-3 flex justify-center">
            <Search />
          </div>
          <Input
            placeholder="Search user..."
            v-model="search"
            :value="search"
          />
          <TransitionGroup
            name="list"
            tag="ul"
            v-if="allUsers"
            class="border rounded mb-2"
          >
            <li
              class="cursor-pointer p-2 hover:bg-black hover:text-white border transition duration-500 flex"
              title="Click to add"
              v-for="user in allUsers"
              :value="user.name"
              :key="user.id"
              @click="add(user)"
            >
              <span>{{ user.name }}</span> <SaveFloppyDisk class="ml-auto" />
            </li>
          </TransitionGroup>
          <Toast v-if="exist" />
        </div>
      </div>
      <TransitionGroup name="saved" tag="ul" v-if="savedUsers">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div class="card" v-for="saved in savedUsers" :key="saved.id">
            <div class="grid grid-cols-2">
              <div>
                <p class="font-bold">{{ saved.name }}</p>
                <p>{{ saved.email }}</p>
                <p>{{ saved.phone }}</p>
              </div>
              <div class="flex items-center justify-end gap-2">
                <div
                  class="hover:text-red-700 transition duration-500"
                  title="Remove user"
                >
                  <DeleteCircle
                    @click.native="remove(saved)"
                    class="cursor-pointer"
                  />
                </div>
                <div
                  class="hover:text-blue-700 transition duration-500"
                  title="Edit user"
                >
                  <EditPencil
                    class="cursor-pointer"
                    @click.native="edit(saved)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <Overlay v-if="opened">
      <Form :user="selectedUser" @submit="close" />
    </Overlay>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useUserStore } from "./store/user";
import Form from "./components/Form.vue";
import { UserModel } from "./models/User";
import { DeleteCircle, EditPencil, Search, SaveFloppyDisk } from "@iconoir/vue";
import Input from "./components/Input.vue";
import Toast from "./components/Toast.vue";
import Overlay from "./components/Overlay.vue";

export default {
  name: "search",
  components: {
    DeleteCircle,
    EditPencil,
    Form,
    Search,
    SaveFloppyDisk,
    Input,
    Toast,
    Overlay,
  },
  setup() {
    const store = useUserStore();
    const search = ref<string | undefined>(undefined);
    const opened = ref<boolean>(false);
    const exist = ref<boolean>(false);
    const allUsers = ref<UserModel[] | undefined>(undefined);
    const selectedUser = ref<UserModel | undefined>(undefined);
    watch(search, () => {
      setTimeout(async () => {
        if (search.value === "") {
          allUsers.value = undefined;
        } else {
          allUsers.value = await store.fetchUsers(search.value);
        }
      }, 300);
    });
    const savedUsers = computed(() => {
      return store.getUser;
    });
    function add(user: UserModel) {
      const hasUser = savedUsers.value.find(
        (user: UserModel) => user.id === user.id
      );
      if (!hasUser) {
        search.value = "";
        allUsers.value = undefined;
        exist.value = false;
        store.addUser(user);
      } else {
        exist.value = true;
      }
    }
    function edit(user: UserModel) {
      opened.value = true;
      selectedUser.value = user;
    }
    function remove(user: UserModel) {
      store.removeUser(user);
    }
    function close() {
      opened.value = false;
    }
    return {
      Search,
      DeleteCircle,
      EditPencil,
      SaveFloppyDisk,
      Overlay,
      Form,
      add,
      remove,
      edit,
      search,
      allUsers,
      savedUsers,
      exist,
      selectedUser,
      close,
      opened,
    };
  },
};
</script>

