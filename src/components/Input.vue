<template>
  <input
    :type="type"
    :value="value"
    @input="change($event)"
    class="input"
    :name="name"
    :placeholder="placeholder"
  />
  <slot />
</template>

<script lang="ts">
export default {
  name: "Input",
  props: {
    value: { type: String, default: undefined },
    type: { type: String, default: "text" },
    name: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
  },
  setup(props, { emit }) {
    const change = (event: any) => {
      emit("update:modelValue", event.target.value);
    };
    return {
      props,
      change,
    };
  },
};
</script>
