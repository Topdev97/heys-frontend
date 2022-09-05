<template>
  <div
    class="emoji-picker bg-white shadow-menu text-center w-300"
    v-on:click.stop
    v-on:contextmenu.stop
  >
    <div class="rounded">
      <div class="pt-2">
        <span
          v-for="(tab, tid) in state.tabs"
          :key="tid"
          @click="state.activeTab = tab"
          :class="tab === state.activeTab ? 'font-semibold' : 'opacity-50'"
          class="cursor-pointer"
          :title="tab"
        >
          {{ getTabEmoji(tab) }}
        </span>
      </div>
      <div class="emoji-search mx-4 my-3">
        <input
          class="w-full py-1 outline-none border-b border-solid border-gray-500 text-default"
          label="Search"
          id="search"
          v-model="state.search"
          autocompele="false"
          autofocus
          required
        />
        <label for="search">Search</label>
      </div>
      <div class="px-1 pb-2 overflow-auto opacity-75 h-180">
        <div v-if="!loading">
          <span
            v-for="(emoji, eid) in state.currentEmojis.filter(
              emoji =>
                !search ||
                emoji.name.includes(search.toLowerCase().replace(/\s/g, '_'))
            )"
            :key="eid"
            class="cursor-pointer"
            :title="emoji.name.replace(/_/g, ' ')"
            @click="$emit('select-emoji', emoji.emoji)"
          >
            {{ emoji.emoji }}
          </span>
        </div>
        <div v-else class="text-center pt-8">
          <i class="fas fa-circle-notch fa-spin text-xl"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, onMounted, watch } from 'vue'

export default defineComponent({
  components: {},
  emits: ['select-emoji', 'close', 'closeee'],
  setup(_, { emit }) {
    const state = reactive({
      loading: true,
      tabs: [
        'emotions',
        'people',
        'nature',
        'food',
        'travel',
        'activities',
        'objects',
        'symbols',
        'flags',
      ],
      search: '',
      activeTab: 'emotions',
      currentEmojis: [],
    })

    onBeforeMount(() => {
      getEmojis()
    })

    onMounted(() => {
      const outsideClickListener = event => {
        if (
          event.target.closest('.emoji-picker') === null &&
          event.target.closest('.emoji-picker-btn') === null
        ) {
          removeClickListener()
          emit('close')
        }
      }
      const removeClickListener = () =>
        document.removeEventListener('click', outsideClickListener)
      document.addEventListener('click', outsideClickListener)
    })

    watch(
      () => state.activeTab,
      val => {
        state.loading = true
        if (val !== 'emojis') state.search = ''
        getEmojis()
      }
    )

    watch(
      () => state.search,
      val => {
        state.loading = true
        if (!val && state.activeTab === 'emojis') state.activeTab = 'emotions'
        else if (val && state.activeTab !== 'emojis') state.activeTab = 'emojis'
        else if (val) state.loading = false
      }
    )

    const getEmojis = () => {
      fetch('/src/assets/emojis/' + state.activeTab + '.json')
        .then(r => r.json())
        .then(r => {
          state.currentEmojis = state.search
            ? [].concat.apply(
                [],
                Object.keys(r).map(key => {
                  return r[key]
                })
              )
            : r
          state.loading = false
        })
    }

    const getTabEmoji = tab => {
      if (tab === 'emotions') return '😀'
      else if (tab === 'people') return '👋'
      else if (tab === 'nature') return '🐶'
      else if (tab === 'food') return '🍆'
      else if (tab === 'travel') return '🌍'
      else if (tab === 'activities') return '🎉'
      else if (tab === 'objects') return '🔨'
      else if (tab === 'symbols') return '🆗'
      else if (tab === 'flags') return '🏁'
    }

    return {
      state,
      getEmojis,
      getTabEmoji,
    }
  },
})
</script>
<style scoped>
.emoji-search {
  position: relative;
}

.emoji-search label {
  position: absolute;
  transform-origin: top left;
  top: 4px;
  left: 0px;
  font-size: 16px;
  color: #333;
  pointer-events: none;
  -webkit-transition: all 0.15s ease-out 0s;
  transition: all 0.15s ease-out 0s;
}

.emoji-search input:focus ~ label,
.emoji-search input:not(:focus):valid ~ label {
  transform: translateY(-14px) scale(0.75);
  color: #f06139;
}

.h-180 {
  height: 180px;
}

.w-300 {
  width: 300px;
}
</style>
