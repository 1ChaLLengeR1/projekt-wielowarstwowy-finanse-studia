<template>
  <div class="flex h-16 w-full rounded-tr-3xl bg-color-bg p-2">
    <label
      class="flex w-2/5 items-center justify-center text-center text-sm text-color-grey sm:text-lg"
      >{{ name_label }}</label
    >
    <input
      :type="type_input"
      class="w-3/5 rounded-tr-3xl bg-color-bg-dark px-3 text-center text-color-grey outline-none"
      @input="update_number"
    />
  </div>
</template>

<script lang="ts">
export default {
  emits: ["update-number"],
  props: {
    name_label: {
      required: true,
      type: String,
    },
    type_input: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
  },
  setup(props, ctx) {
    const update_number = (e: Event) => {
      ctx.emit("update-number", {
        type: props.type,
        number: parseFloat((e.target as HTMLInputElement).value),
      });
    };
    return { update_number };
  },
};
</script>
