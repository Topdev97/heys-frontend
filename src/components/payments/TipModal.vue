<template>
  <div
    class="fixed fade-modal overflow-auto bg-white rounded z-50 absolute-center"
    style="height: auto"
  >
    <div class="w-full relative pt-12 px-4 sm:px-6 relative">
      <div
        @click="$emit('close')"
        class="cursor-pointer absolute top-5 right-7"
      >
        <i class="fa fa-times text-2xl"></i>
      </div>

      <h3
        class="display-1 font-normal mb-3 text-center text-default"
        :style="
          state.layoutData.onMobile
            ? { 'font-size': '1.5rem!important', 'line-height': '2.0rem' }
            : { 'font-size': '1.725rem!important' }
        "
      >
        Tip this doc
      </h3>

      <div class="min-h-26">
        <h5 class="mb-4 text-center">
          Support the creator of this doc and the gathering it belongs to.
        </h5>
        <PaymentSelector />
      </div>
      <button
        class="mt-5 mb-12 py-2 rounded w-full duration-200 bg-orange-600 hover:bg-orange-500 active:bg-orange-400"
        :disabled="state.layoutData.addLoading"
        @click="tip()"
      >
        <i
          v-if="!state.layoutData.addLoading"
          class="fa fa-plus text-xl mr-2 text-white"
        ></i>
        <span class="text-xl text-white">{{
          state.layoutData.addLoading ? 'Tip...' : 'Tip'
        }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  nextTick,
  ref,
  defineEmits,
  getCurrentInstance,
} from 'vue'
import { useRoute } from 'vue-router'
import EmojiPicker from '@/components/ui/EmojiPicker.vue'
import PaymentSelector from '@/components/payments/PaymentSelector.vue'

export default defineComponent({
  components: {
    PaymentSelector,
  },
  props: {},
  emits: ['close'],
  setup(props, { emit }) {
    const route = useRoute()

    const state = reactive({
      layoutData: {
        comboboxInput: null,
        addLoading: false,
        onMobile: false,
        emojiPicker: false,
        page: 'main',
      },
    })

    onMounted(() => {
      state.layoutData.onMobile = window.innerWidth < 600
      window.addEventListener('resize', () => {
        state.layoutData.onMobile = window.innerWidth < 600
      })
    })

    return {
      state,
      emit,
    }
  },
})
</script>
<style scoped>
.fade-modal {
  height: 80vh;
  max-height: 660px;
  width: 80vw;
  max-width: 800px;
}

.min-h-26 {
  min-height: 26px;
}
</style>
