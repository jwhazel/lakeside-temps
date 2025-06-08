<template>
  <div class="p-10">
    <h2 class="font-bold">{{ title }}</h2>
    <div
      class="relative flex aspect-[2] items-center justify-center overflow-hidden rounded-t-full bg-gradient-to-r from-sky-400 to-red-500"
    >
      <div
        :style="`--tw-rotate: calc(${chartValue}deg - 45deg); transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`"
        class="absolute top-0 aspect-square w-full bg-gradient-to-tr from-transparent from-50% to-gray-300 to-50% transition-transform duration-500"
      ></div>
      <div class="absolute top-1/4 flex aspect-square w-3/4 justify-center rounded-full bg-white"></div>
      <div class="absolute bottom-0 w-full text-center text-[4vmax] leading-none">
        <div>
          <slot></slot>
        </div>
        <div>{{ amount }}°F</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  amount: { type: Number },
  min: { type: Number, default: 50 },
  max: { type: Number, default: 100 },
});

// Return the degree for the chart
const chartValue = computed(() => {
  if (props.amount <= props.min) {
    return 0;
  } else if (props.amount >= props.max) {
    return 180;
  } else {
    const scale = 180 / (props.max - props.min);
    return (props.amount - props.min) * scale;
  }
});
</script>
