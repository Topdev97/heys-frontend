<template>
  <div>
    <div v-if="state.layoutData.page === 'list'">
      <div>
        <h3 class="display-1 font-normal text-center text-default mb-3">
          Gatherings
        </h3>
        <h4 class="text-default text-center">
          A space for public Google docs about specific topics
        </h4>
      </div>

      <div class="min-h-700">
        <button
          class="w-3/5 mt-5 mb-8 mx-auto py-2 block text-xl text-white rounded duration-200 bg-orange-600 hover:bg-orange-500 active:bg-orange-400 min-w-200"
          :disabled="state.layoutData.addLoading"
          @click="state.layoutData.page = 'add'"
        >
          <i class="fa fa-plus mr-2 text-white"></i>
          New gathering
        </button>
        <div
          v-for="(space, sid) in state.spaces"
          :key="'space-' + sid"
          class="my-2"
        >
          <router-link
            :to="{ path: '/s/' + space.slug }"
            class="space-link no-underline text-orange-600"
          >
            s/{{ space.name }}<br />
            <span class="font-normal text-default">
              {{ space.description }}
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else-if="state.layoutData.page === 'add'">
      <div
        @click="state.layoutData.page = 'list'"
        class="flex justify-center items-center w-3/5 mt-6 mb-8 mx-auto text-center cursor-pointer text-default"
      >
        <i class="fas fa-angle-left mr-2 text-xl"></i>
        Back
      </div>

      <p class="subheading font-medium my-6 pt-3 text-default">
        Create a gathering which is a custom feed of your public Google docs.
        You can control which docs are included as well as the look and feel of
        the feed.
      </p>

      <div class="form-group mb-3">
        <input
          type="text"
          required
          id="space-name"
          ref="space-name"
          class="bg-gray-200 rounded w-full outline-none px-3 pt-5 pb-3 text-default mb-0"
          v-model="state.newSpaceObj.name"
          :error="
            state.newSpaceObj.errors.indexOf('no-name') >= 0 ||
            state.newSpaceObj.errors.indexOf('name-duplicate') >= 0 ||
            state.newSpaceObj.errors.indexOf('name-error') >= 0
          "
          filled
        />
        <label
          for="space-name"
          :class="
            state.newSpaceObj.errors.indexOf('no-name') >= 0 ||
            state.newSpaceObj.errors.indexOf('name-duplicate') >= 0 ||
            state.newSpaceObj.errors.indexOf('name-error') >= 0
              ? `text-orange-600`
              : `text-default`
          "
          >Name (slug format)</label
        >
        <p
          v-if="state.newSpaceObj.errors.indexOf('name-duplicate') >= 0"
          class="text-red-500 text-left"
        >
          This name already exists - please use a different one
        </p>
        <p
          v-if="state.newSpaceObj.errors.indexOf('name-error') >= 0"
          class="text-ted-500 text-left"
        >
          Please use only letters, numbers and "_" or "-"
        </p>
      </div>

      <div class="relative mb-3">
        <div ref="root">This is a root element</div>
        <div class="form-group">
          <textarea
            id="space-description"
            ref="space-description"
            rows="4"
            class="bg-gray-200 rounded w-full outline-none px-3 pt-5 pb-3 text-default"
            v-model="state.newSpaceObj.description"
            :error="state.newSpaceObj.errors.indexOf('no-description') >= 0"
            maxlength="1000"
            required
            filled
          ></textarea>
          <label
            for="space-description"
            :class="
              state.newSpaceObj.errors.indexOf('no-description') >= 0
                ? `text-orange-600`
                : `text-default`
            "
            >Description</label
          >
        </div>
        <div
          @click="state.layoutData.emojiPicker = !state.layoutData.emojiPicker"
          class="emoji-picker-btn cursor-pointer absolute bottom-3 right-2"
        >
          <i class="far fa-smile"></i>
        </div>
        <EmojiPicker
          v-if="state.layoutData.emojiPicker"
          class="emoji-picker absolute z-50"
          @select-emoji="insertEmoji"
          @close="state.layoutData.emojiPicker = false"
        ></EmojiPicker>
      </div>

      <div class="form-group mb-3">
        <input
          ref="space-email"
          id="space-email"
          class="bg-gray-200 rounded w-full outline-none px-3 pt-5 pb-3 text-default mb-0"
          v-model="state.newSpaceObj.emailAddress"
          :error="state.newSpaceObj.errors.indexOf('no-email-address') >= 0"
          @keyup.enter="addSpace()"
          filled
          required
        />
        <label
          for="space-email"
          :class="
            state.newSpaceObj.errors.indexOf('no-email-address') >= 0
              ? `text-orange-600`
              : `text-default`
          "
        >
          Your gDrive email address (to verify ownership of the docs)
        </label>
      </div>

      <div class="text-default">Colors</div>
      <div>
        <input
          type="color"
          id="html5colorpicker2"
          v-model="state.newSpaceObj.colors.color2"
          class="cursor-pointer mx-3 w-10 h-10 border-none outline-none mb-0"
        />
        <input
          type="color"
          id="html5colorpicker3"
          v-model="state.newSpaceObj.colors.color3"
          class="cursor-pointer mx-3 w-10 h-10 border-none outline-none mb-0"
        />
        <input
          type="color"
          id="html5colorpicker1"
          v-model="state.newSpaceObj.colors.color1"
          class="cursor-pointer mx-3 w-10 h-10 border-none outline-none mb-0"
        />
      </div>

      <button
        @click="addSpace()"
        :disabled="state.layoutData.addLoading"
        class="w-full text-white mt-5 mb-4 rounded py-2.5 text-lg font-medium hover:opacity-75 duration-500"
        :style="{
          'background-image':
            'linear-gradient(180deg, rgba(7, 68, 73, 0.3), ' +
            state.newSpaceObj.colors.color1 +
            '),linear-gradient(50deg, ' +
            state.newSpaceObj.colors.color2 +
            ' 22%, ' +
            state.newSpaceObj.colors.color3 +
            ')',
        }"
      >
        <i
          v-if="!state.layoutData.addLoading"
          class="fa fa-plus mr-1 text-white"
        ></i>
        {{ state.layoutData.addLoading ? 'Adding...' : 'Add gathering' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onBeforeMount, nextTick } from 'vue'
import EmojiPicker from '@/components/ui/EmojiPicker.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    EmojiPicker,
  },
  props: {
    extended: { type: Boolean },
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      spaces: [],
      layoutData: {
        page: 'list',
        comboboxInput: null,
        addLoading: false,
        onMobile: false,
        emojiPicker: false,
      },
      newSpaceObj: {
        name: '',
        errors: [],
        description: '',
        emailAddress: '',
        colors: {
          color1: '#074246',
          color2: '#073746',
          color3: '#074620',
        },
      },
    })

    onBeforeMount(() => {
      fetch('/api/spaces/get', {
        method: 'POST',
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => {
            alert(r)
          })
        } else {
          r.json().then(r => {
            state.spaces = r.spaces
          })
        }
      })
    })

    const addSpace = () => {
      state.newSpaceObj.errors = []
      state.layoutData.addLoading = true
      if (!state.newSpaceObj.name) state.newSpaceObj.errors.push('no-name')
      if (!state.newSpaceObj.description)
        state.newSpaceObj.errors.push('no-description')
      if (!state.newSpaceObj.emailAddress)
        state.newSpaceObj.errors.push('no-email-address')
      if (!state.newSpaceObj.emailAddress.includes('@'))
        state.newSpaceObj.errors.push('no-email-address')
      if (state.newSpaceObj.name.match(/[^A-Za-z0-9-_]+/g))
        state.newSpaceObj.errors.push('name-error')
      if (!state.newSpaceObj.errors.length) {
        fetch('/api/spaces/add', {
          method: 'POST',
          body: JSON.stringify(state.newSpaceObj),
        }).then(r => {
          if (r.status !== 200) {
            r.json().then(r => {
              state.layoutData.addLoading = false
              alert(r)
            })
          } else {
            r.json().then(r => {
              if (!r.success) {
                state.newSpaceObj.errors.push(r.reason)
              } else {
                router.push('/s/' + state.newSpaceObj.name)
              }
            })
          }
        })
      } else {
        state.layoutData.addLoading = false
      }
    }

    const insertEmoji = emoji => {
      const el = document.querySelector('textarea')
      let cursorPos = el.selectionEnd
      state.newSpaceObj.description =
        state.newSpaceObj.description.substring(0, cursorPos) +
        emoji +
        state.newSpaceObj.description.substring(cursorPos)
      cursorPos += 1
      nextTick(() => {
        el.setSelectionRange(cursorPos, cursorPos)
        el.focus()
      })
      state.layoutData.emojiPicker = false
    }

    return {
      state,
      addSpace,
      insertEmoji,
    }
  },
})
</script>
<style scoped>
.display-1 {
  font-size: 1.725rem;
}

.min-h-700 {
  min-height: 700px;
}
</style>
