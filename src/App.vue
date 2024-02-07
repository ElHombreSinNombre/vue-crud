<template>
  <main>
    <section class="center">
      <article class="max-w-md mx-auto card">
        <article class="fa-xl items-center my-3 flex justify-center">
          <Search />
        </article>
        <Input placeholder="Search user..." v-model="search" :value="search" />
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
            :key="user.id"
            @click="add(user)"
          >
            <span>{{ user.name }}</span> <FloppyDisk class="ml-auto" />
          </li>
        </TransitionGroup>
        <Toast v-if="exist" />
      </article>
      <TransitionGroup name="saved" tag="ul" v-if="savedUsers.length">
        <article class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <article class="card" v-for="saved in savedUsers" :key="saved.id">
            <article class="grid grid-cols-2">
              <article class="flex flex-col">
                <p class="font-bold">{{ saved.name }}</p>
                <p>{{ saved.email }}</p>
                <p>{{ saved.phone }}</p>
              </article>
              <article class="flex items-center justify-end gap-2">
                <article
                  class="hover:text-red-700 transition duration-500"
                  title="Remove user"
                >
                  <XmarkCircle
                    @click.native="remove(saved)"
                    class="cursor-pointer"
                  />
                </article>
                <article
                  class="hover:text-blue-700 transition duration-500"
                  title="Edit user"
                >
                  <EditPencil
                    class="cursor-pointer"
                    @click.native="edit(saved)"
                  />
                </article>
              </article>
            </article>
          </article>
        </article>
      </TransitionGroup>
    </section>
    <Overlay v-if="opened">
      <Form :user="selectedUser" @submit="close" />
    </Overlay>
  </main>
</template>

<script lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useUserStore } from './store/user'
  import Form from '@/components/Form.vue'
  import { UserModel } from './types/User'
  import debounce from '@/src/utils/debounce'
  import {
    XmarkCircle,
    EditPencil,
    Search,
    FloppyDisk
  } from '@iconoir/vue'
  import Input from '@/components/Input.vue'
  import Toast from '@/components/Toast.vue'
  import Overlay from '@/components/Overlay.vue'

  export default {
    name: 'search',
    components: {
      XmarkCircle,
      EditPencil,
      Form,
      Search,
      FloppyDisk,
      Input,
      Toast,
      Overlay
    },
    setup() {
      const store = useUserStore()
      const search = ref<string | undefined>(undefined)
      const opened = ref<boolean>(false)
      const exist = ref<boolean>(false)
      const allUsers = ref<UserModel[] | undefined>(undefined)
      const selectedUser = ref<UserModel | undefined>(undefined)
      watch(search, () => {
        const debouncedFetch = debounce(async () => {
          if (search.value === '') {
            allUsers.value = undefined
          } else {
            allUsers.value = await store.fetchUsers(search.value)
          }
        }, 300)
        debouncedFetch()
      })
      const savedUsers = computed(() => {
        return store.getUser
      })
      function add(user: UserModel) {
        const hasUser = savedUsers.value.find(
          (savedUser: UserModel) => savedUser.id === user.id
        )
        console.log(hasUser)
        if (!hasUser) {
          search.value = ''
          allUsers.value = undefined
          exist.value = false
          store.addUser(user)
        } else {
          exist.value = true
        }
      }
      function edit(user: UserModel) {
        opened.value = true
        selectedUser.value = user
      }
      function remove(user: UserModel) {
        store.removeUser(user)
      }
      function close() {
        opened.value = false
      }
      return {
        Search,
        XmarkCircle,
        EditPencil,
        FloppyDisk,
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
        debounce,
        close,
        opened
      }
    }
  }
</script>
