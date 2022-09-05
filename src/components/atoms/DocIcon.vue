<template>
  <div>
    <span v-if="(url || '').includes('/document/')" class="logo-link">
      <svg
        alt="Google"
        class="rounded"
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 64.000000 64.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="5" y="5" width="55" height="55" fill="white"></rect>
        <g
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          :fill="colorOverride || '#4285F4'"
          stroke="none"
        >
          <path
            d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"
          ></path>
        </g>
      </svg>
    </span>
    <span v-if="(url || '').includes('/spreadsheets/')" class="logo-link">
      <svg
        alt="Google"
        class="rounded"
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 64.000000 64.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="5" y="5" width="55" height="55" fill="white"></rect>
        <g
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          :fill="colorOverride || '#0F9D58'"
          stroke="none"
        >
          <path
            d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"
          />
        </g>
      </svg>
    </span>
    <span v-if="(url || '').includes('/presentation/')" class="logo-link">
      <svg
        alt="Google"
        class="rounded"
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 64.000000 64.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="5" y="5" width="55" height="55" fill="white"></rect>
        <g
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          :fill="colorOverride || '#F4B400'"
          stroke="none"
        >
          <path
            d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"
          />
        </g>
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    url: { type: String },
    colorOverride: { type: String },
  },
})
</script>
