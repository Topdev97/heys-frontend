<template>
  <div
    :class="
      (state.layoutData.searchFocused ? 'search-input-wrapper-focused ' : ' ') +
      (narrow ? 'search-input-wrapper-narrow' : '')
    "
    class="flex items-center py-0.5 pr-1 pl-3 my-2 mx-2 bg-thgreen8 rounded-full search-input-wrapper white-border"
  >
    <div class="p-0 h-9 bg-transparent ui input">
      <div class="flex items-center w-4 text-lightgrey search-icons">
        <SearchIcon />
      </div>
      <input
        ref="search-input"
        v-model="state.filterObj.search"
        type="text"
        :placeholder="narrow ? 'Search Heystack' : 'Search'"
        :class="state.filterObj.search.length ? '' : 'text-base'"
        class="mb-0 h-9 text-white border-none"
        @keydown.enter="searchEnter()"
        @focus="state.layoutData.searchFocused = true"
        @blur="state.layoutData.searchFocused = false"
        @keydown="arrowKeyPress"
      />
    </div>
    <div class="w-4">
      <i
        v-if="state.filterObj.search && !searching"
        class="m-0 text-lightgrey cursor-pointer fa fa-times-circle search-icons"
        @click="
          () => {
            state.filterObj.search = ''
            searchEnter()
          }
        "
      ></i>
      <i
        v-if="state.filterObj.search && searching"
        class="m-0 text-lightgrey fas fa-circle-notch fa-spin search-icons"
      ></i>
    </div>
    <div
      v-if="(state.layoutData.searchFocused || state.dropdown.hover) && filteredTags.length"
      class="absolute left-4 z-50 text-left bg-white rounded shadow-menu search-dropdown"
      :style="{ bottom: -(filteredTags.length + 1) * 27 + 'px' }"
      @mouseenter="state.dropdown.hover = true"
      @mouseleave="state.dropdown.hover = false"
    >
      <div class="px-2">
        <small class="font-bold">Tags:</small>
      </div>
      <a
        v-for="(tag, tid) in filteredTags"
        :key="`tag-search-${tid}`"
        :href="'/?tags=' + tag.text"
        :title="tag.text"
        class="no-underline"
        @click="feedTagClick"
      >
        <div
          :class="state.dropdown.active === tid ? 'dropdown-item-active' : ''"
          class="px-2 max-w-full text-lg truncate text-emerald-800"
          @mouseenter="state.dropdown.active = tid"
          @mouseleave="state.dropdown.active = -1"
        >
          {{ tag.text }}
        </div>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SearchIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: { SearchIcon },
  props: {
    feed: { type: Boolean },
    narrow: { type: Boolean },
    searching: { type: Boolean },
    initialSearch: { type: String, default: '' },
    existingTags: { type: Array, default: () => [] },
  },
  emits: ['search', 'selected-tag'],
  setup(props, { emit }) {
    const router = useRouter()
    const state = reactive({
      filterObj: {
        search: '',
        searchOption: 'Everything',
      },
      dropdown: {
        active: -1,
        hover: false,
      },
      layoutData: {
        searchFocused: false,
      },
    })

    const filteredTags = computed(() => {
      return state.filterObj.search
        ? props.existingTags
            .filter(tag => tag.text.toLowerCase().includes(state.filterObj.search.toLowerCase()))
            .slice(0, 5)
        : []
    })

    onBeforeMount(() => {
      state.filterObj.search = props.initialSearch
    })

    watch(
      () => props.initialSearch,
      val => {
        state.filterObj.search = val
      }
    )

    const searchEnter = () => {
      if (state.dropdown.active !== -1) {
        if (props.feed) {
          emit('selected-tag', filteredTags.value._value[state.dropdown.active].text)
          state.filterObj.search = ''
          state.dropdown.active = -1
        } else {
          router.push('/?tags=' + filteredTags.value._value[state.dropdown.active].text)
        }
      } else {
        emit('search', state.filterObj.search)
      }
    }

    const feedTagClick = event => {
      if (props.feed) {
        event.preventDefault()
        emit('selected-tag', filteredTags.value._value[state.dropdown.active].text)
        state.filterObj.search = ''
        state.dropdown.active = -1
      }
    }

    const arrowKeyPress = event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (filteredTags.value._value.length > state.dropdown.active + 1) state.dropdown.active += 1
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (state.dropdown.active > -1) state.dropdown.active -= 1
      }
    }

    return {
      state,
      filteredTags,
      searchEnter,
      feedTagClick,
      arrowKeyPress,
    }
  },
})
</script>
<style scoped>
.search-input-wrapper-focused {
  border-color: #f06139 !important;
  -webkit-box-shadow: 0px 0px 2px 1px rgba(240, 97, 57, 0.2);
  box-shadow: 0px 0px 2px 1px rgba(240, 97, 57, 0.2);
}

.search-input-wrapper input {
  padding: 0 0 0 10px;
  width: 145px;
}

@media screen and (min-width: 600px) {
  .search-input-wrapper-narrow input {
    width: 80%;
  }
}

.search-input-wrapper-narrow {
  margin-top: -14px;
  margin-left: 10px;
  padding: 0 15px;
}

.search-input-wrapper-narrow input {
  padding: 2px 10px 0;
}

.search-input-header .search-input-wrapper {
  border-color: #2e5d63;
  background-color: rgba(92, 128, 132, 0.2);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.search-input-header .search-icons {
  color: #477c82 !important;
}

.dropdown-item-active {
  background-color: #f06139;
  color: white;
  font-weight: 500;
}

.ui.input {
  font-size: 1em;
  display: inline-flex;
}

.ui.input > input {
  margin: 0;
  max-width: 100%;
  outline: 0;
  background: none;
  -webkit-box-shadow: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  box-shadow: none;
}

.search-dropdown {
  width: 174px;
}
</style>
