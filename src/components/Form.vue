<template>
  <section class="center fixed inset-0 z-10">
    <article class="card">
      <article class="mb-4">
        <label for="name" class="block mb-2 font-bold">Name</label>
        <Input
          :value="user.name"
          :placeholder="user ? 'Edit name' : 'New name'"
          v-model="user.name"
        />
      </article>
      <article class="mb-4">
        <label for="phone" class="block mb-2 font-bold">Phone</label>
        <Input
          :value="user.phone"
          v-model="user.phone"
          :placeholder="user ? 'Edit phone' : 'New phone'"
        />
      </article>
      <article class="mb-4">
        <label for="email" class="block mb-2 font-bold">Email</label>
        <Input
          type="email"
          :value="user.email"
          v-model="user.email"
          :placeholder="user ? 'Edit email' : 'New email'"
        />
      </article>
      <Button text="Done" @submit="submit" :disabled="!user.name" />
    </article>
  </section>
</template>

<script lang="ts">
  import { UserModel } from '@/src/types/User'
  import { useUserStore } from '@/src/store/user'
  import Input from '@/components/Input.vue'
  import Button from '@/components/Button.vue'

  export default {
    name: 'Form',
    props: {
      user: {
        type: Object as () => UserModel,
        default: null
      }
    },
    components: { Input, Button },
    setup(props, { emit }) {
      const store = useUserStore()
      function submit() {
        if (props.user.id) {
          store.editUser(props.user)
        } else {
          store.addUser(props.user)
        }
        emit('submit')
      }

      return { Input, user: props.user, submit }
    }
  }
</script>
