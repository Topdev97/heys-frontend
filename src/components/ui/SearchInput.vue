<template>
  <div
    :class="(state.layoutData.searchFocused ? 'search-input-wrapper-focused ' : ' ') + (narrow ? 'search-input-wrapper-narrow' : '')"
    class="search-input-wrapper bg-thgreen8 flex items-center relative white-border rounded-full my-2 mx-2 pl-3 pr-1 py-0.5"
  >
    <div class="ui input bg-transparent p-0 h-9">
      <div class="search-icons flex items-center w-4 text-lightgrey">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus fa-w-14 max-w-full max-h-full"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" ></path></svg>
      </div>
      <input
        v-on:keydown.enter="searchEnter()"
        v-model="state.filterObj.search"
        ref="search-input"
        @focus="state.layoutData.searchFocused = true"
        @blur="state.layoutData.searchFocused = false"
        @keydown="arrowKeyPress"
        type="text"
        :placeholder="narrow ? 'Search Heystack' : 'Search'"
        :class="state.filterObj.search.length ? '' : 'text-base'"
        class="border-none mb-0 text-white h-9"
      >
    </div>
    <div class="w-4">
      <i
        class="fa fa-times-circle search-icons m-0 cursor-pointer text-lightgrey"
        v-if="state.filterObj.search && !searching"
        @click="() => {state.filterObj.search = ''; searchEnter()}"
      ></i>
      <i
        class="fas fa-circle-notch fa-spin search-icons m-0 text-lightgrey"
        v-if="state.filterObj.search && searching"
      ></i>
    </div>
    <div
      v-if="(state.layoutData.searchFocused || state.dropdown.hover) && filteredTags.length"
      class="shadow-menu text-left search-dropdown absolute z-50 rounded bg-white left-4"
      :style="{'bottom': (-(filteredTags.length + 1) * 27) + 'px'}"
      @mouseenter="state.dropdown.hover = true"
      @mouseleave="state.dropdown.hover = false"
    >
      <div class="px-2">
        <small class="font-bold">Tags:</small>
      </div>
      <a
        v-for="(tag, tid) in filteredTags"
        :href="'/?tags=' + tag.text"
        :title="tag.text"
        class="no-underline"
        @click="feedTagClick"
      >
        <div
          @mouseenter="state.dropdown.active = tid"
          @mouseleave="state.dropdown.active = -1"
          :class="state.dropdown.active === tid ? 'dropdown-item-active' : ''"
          class="px-2 max-w-full truncate text-lg text-emerald-800"
        >
          {{tag.text}}
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  props: {
    feed: { type: Boolean },
    narrow: { type: Boolean },
    searching: { type: Boolean },
    initialSearch: { type: String },
    existingTags: { type: Array }
  },
  emits: ['search', 'selected-tag'],
  setup(props, {emit}) {
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
      }
    })

    const filteredTags = computed(() => {
      return state.filterObj.search ?
        props.existingTags.filter(tag => tag.text.toLowerCase().includes(state.filterObj.search.toLowerCase())).slice(0, 5)
        : []
    })

    onBeforeMount(() => {
      state.filterObj.search = props.initialSearch
    })

    watch(() => props.initialSearch, (val) => {
      state.filterObj.search = val
    })

    const searchEnter = () => {
      if (state.dropdown.active !== -1) {
        if (props.feed) {
          emit('selected-tag', filteredTags._value[state.dropdown.active].text)
          state.filterObj.search = ''
          state.dropdown.active = -1
        } else {
          router.push('/?tags=' + filteredTags._value[state.dropdown.active].text)
        }
      } else {
        emit('search', state.filterObj.search)
      }
    }

    const feedTagClick = (event) => {
      if (props.feed) {
        event.preventDefault()
        emit('selected-tag', filteredTags._value[state.dropdown.active].text)
        state.filterObj.search = ''
        state.dropdown.active = -1
      }
    }

    const arrowKeyPress = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (filteredTags._value.length > state.dropdown.active + 1) state.dropdown.active += 1
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
      arrowKeyPress
    }
  }
})
</script>
<style scoped>

  .search-input-wrapper-focused {
    border-color: #f06139 !important;
    -webkit-box-shadow: 0px 0px 2px 1px rgba(240,97,57,0.2);
    box-shadow: 0px 0px 2px 1px rgba(240,97,57,0.2);
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

  .ui.input>input {
    margin: 0;
    max-width: 100%;
    outline: 0;
    background: none;
    -webkit-box-shadow: none;
    -webkit-tap-highlight-color: rgba(255,255,255,0);
    box-shadow: none;
  }

  .search-dropdown {
    width: 174px;
  }
</style>
