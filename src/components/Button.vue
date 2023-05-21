<template>
  <button
    :disabled="disabled"
    @click="submit"
    :class="disabled ? 'button disabled:opacity-50' : 'button'"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    text: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const submit = () => {
      emit("submit");
    };
    return {
      props,
      submit,
    };
  },
};
</script>
