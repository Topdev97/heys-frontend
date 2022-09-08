<template>
  <div
    class="overflow-auto fixed z-50 bg-white rounded fade-modal absolute-center"
  >
    <div class="relative px-4 sm:px-6 pt-12 w-full h-full">
      <div
        class="absolute top-5 right-7 cursor-pointer"
        @click="$emit('close')"
      >
        <i class="text-2xl fa fa-times"></i>
      </div>

      <h3
        class="mb-3 font-normal text-center text-default display-1"
        :style="
          state.layoutData.onMobile
            ? { 'font-size': '1.5rem!important', 'line-height': '2.0rem' }
            : { 'font-size': '1.725rem!important' }
        "
      >
        Share an interesting Doc, Sheet or Slide
      </h3>

      <div v-if="state.layoutData.page === 'main'" class="text-center">
        <br />
        <br />
        <br />
        <button
          class="py-2 mt-5 mb-4 w-1/2 rounded duration-200 bg-orange-600 hover:bg-orange-500 active:bg-orange-400"
          :style="
            state.layoutData.onMobile
              ? { 'font-size': '0.8rem!important', 'min-width': '235px' }
              : { 'font-size': '1.0rem!important', 'min-width': '285px' }
          "
          @click="state.layoutData.page = 'existing'"
        >
          <i class="mr-2 text-xl text-white fa fa-file-alt"></i>
          <span class="text-xl text-white">Share a link to existing doc</span>
        </button>
        <br />
        <button
          class="py-2 mt-5 mb-4 w-1/2 rounded duration-200 bg-orange-600 hover:bg-orange-500 active:bg-orange-400"
          :style="
            state.layoutData.onMobile
              ? { 'font-size': '0.8rem!important', 'min-width': '235px' }
              : { 'font-size': '1.0rem!important', 'min-width': '285px' }
          "
          @click="state.layoutData.page = 'new'"
        >
          <i class="mr-2 text-xl text-white fa fa-file"></i>
          <span class="text-xl text-white">Write a new doc</span>
        </button>
      </div>
      <div
        v-if="state.layoutData.page === 'existing'"
        class="sm:px-10 text-center"
      >
        <a
          class="mb-4 hover:underline cursor-pointer text-emerald-800 active:text-emerald-600"
          @click="state.layoutData.page = 'main'"
        >
          <i class="mr-1 fa fa-chevron-left"></i>
          Back
        </a>
        <br />
        <br />
        <br />
        <div class="mb-3 form-group">
          <input
            id="url-input"
            ref="url-input"
            v-model="state.newDocumentObj.url"
            type="text"
            class="px-3 pt-5 pb-3 mb-0 w-full text-default bg-gray-200 rounded outline-none"
            :error="
              state.newDocumentObj.errors.indexOf('url-error') >= 0 ||
              state.newDocumentObj.errors.indexOf('no-url') >= 0
            "
            filled
            required
          />
          <label
            for="url-input"
            :class="
              state.newDocumentObj.errors.indexOf('url-error') >= 0 ||
              state.newDocumentObj.errors.indexOf('no-url') >= 0
                ? `text-orange-600`
                : `text-default`
            "
            >Url</label
          >
          <p
            v-if="state.newDocumentObj.errors.indexOf('url-error') >= 0"
            class="text-left text-red-500"
          >
            Incorrect url - please double check your link. It should be
            something like
            "https://docs.google.com/document/d/1wf9YFtLFM4LuNkDzbb4hGfZqvb6VnKzJ9iZ"
          </p>
        </div>

        <div class="mb-3 form-group">
          <textarea
            id="new-modal-description"
            ref="new-modal-description"
            v-model="state.newDocumentObj.description"
            rows="4"
            class="px-3 pt-5 pb-3 w-full text-default bg-gray-200 rounded outline-none"
            :error="state.newDocumentObj.errors.indexOf('no-description') >= 0"
            maxlength="1000"
            filled
            required
          ></textarea>
          <label
            for="new-modal-description"
            :class="
              state.newDocumentObj.errors.indexOf('no-description') >= 0
                ? `text-orange-600`
                : `text-default`
            "
          >
            What is this doc about?
          </label>
          <div
            class="absolute right-2 bottom-3 cursor-pointer emoji-picker-btn"
            @click="
              state.layoutData.emojiPicker = !state.layoutData.emojiPicker
            "
          >
            <i class="far fa-smile"></i>
          </div>
          <EmojiPicker
            v-if="state.layoutData.emojiPicker"
            class="absolute z-50 emoji-picker"
            @select-emoji="insertEmoji"
            @close="state.layoutData.emojiPicker = false"
          ></EmojiPicker>
        </div>
        <div class="form-group">
          <input
            id="tags-combobox--1"
            ref="tags--1"
            v-model="state.newDocumentObj.tags"
            class="px-3 pt-5 pb-3 mb-0 w-full text-default bg-gray-200 rounded outline-none"
            :items="existingTags"
            :error="state.newDocumentObj.errors.indexOf('no-tags') >= 0"
            chips
            counter="2"
            multiple
            hide-details
            hide-selected
            hide-no-data
            auto-select-first
            filled
            required
            @input="state.layoutData.comboboxInput = null"
            @keydown="updateTagsOnComma"
            @blur="addTag"
          />
          <label
            for="tags-combobox--1"
            :class="
              state.newDocumentObj.errors.indexOf('no-tags') >= 0
                ? `text-orange-600`
                : `text-default`
            "
          >
            Tags
          </label>
        </div>
        <div class="min-h-26">
          <transition name="fade">
            <small
              v-if="
                state.layoutData.comboboxInput &&
                state.newDocumentObj.tagCandidate &&
                state.newDocumentObj.tagCandidate !== 'No data available'
              "
              class="z-20 mb-0 text-left"
            >
              Enter:
              <strong>{{ state.newDocumentObj.tagCandidate }}</strong>
              (comma to ignore)
            </small>
          </transition>
        </div>
        <button
          class="py-2 mt-5 mb-6 w-full rounded duration-200 bg-orange-600 hover:bg-orange-500 active:bg-orange-400"
          :disabled="state.layoutData.addLoading"
          @click="addDocument()"
        >
          <i
            v-if="!state.layoutData.addLoading"
            class="mr-2 text-xl text-white fa fa-plus"
          ></i>
          <span class="text-xl text-white">{{
            state.layoutData.addLoading ? 'Adding...' : 'Add new doc'
          }}</span>
        </button>
        <div class="pb-12 min-h-26">
          <h5>Sponsor submission</h5>
          <small class="block mt-1 mb-4"
            >Sponsored docs are more likely to be included in the
            gathering</small
          >
          <PaymentSelector />
          <!--          <small>If the doc is not approved, the funds will be returned</small>-->
        </div>
      </div>
      <div v-if="state.layoutData.page === 'new'" class="pb-6 text-center">
        <a
          class="mb-4 hover:underline cursor-pointer text-emerald-800 active:text-emerald-600"
          @click="state.layoutData.page = 'main'"
        >
          <i class="mr-1 fa fa-chevron-left"></i>
          Back
        </a>
        <br />
        <p class="mt-7 mb-2 text-lg font-normal text-default subheading">
          1. Create a new:
        </p>
        <div class="flex justify-center">
          <a
            href="https://docs.new"
            target="_blank"
            class="flex items-center mx-2 hover:underline logo-link text-emerald-800 active:text-emerald-600"
          >
            <svg
              alt="Google"
              class="mr-1 w-6 rounded"
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 64.000000 64.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect x="5" y="5" width="55" height="55" fill="white"></rect>
              <g
                transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                fill="#4285F4"
                stroke="none"
              >
                <path
                  d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"
                ></path>
              </g>
            </svg>
            Doc
          </a>
          <a
            href="https://sheets.new"
            target="_blank"
            class="flex items-center mx-2 hover:underline logo-link text-emerald-800 active:text-emerald-600"
          >
            <svg
              alt="Google"
              class="mr-1 w-6 rounded"
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 64.000000 64.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect x="5" y="5" width="55" height="55" fill="white"></rect>
              <g
                transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                fill="#0F9D58"
                stroke="none"
              >
                <path
                  d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"
                />
              </g>
            </svg>
            Sheet
          </a>
          <a
            href="https://slides.new"
            target="_blank"
            class="flex items-center mx-2 hover:underline logo-link text-emerald-800 active:text-emerald-600"
          >
            <svg
              alt="Google"
              class="mr-1 w-6 rounded"
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 64.000000 64.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect x="5" y="5" width="55" height="55" fill="white"></rect>
              <g
                transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                fill="#F4B400"
                stroke="none"
              >
                <path
                  d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"
                />
              </g>
            </svg>
            Slide
          </a>
        </div>

        <p class="mt-7 mb-2 text-lg font-normal text-default subheading">
          2. Make it public and copy the link:
        </p>
        <img
          alt="Share doc 1"
          src="/src/assets/img/nd1.jpg"
          class="block mx-auto w-3/4"
        />
        <br />
        <img
          alt="Share doc 2"
          src="/src/assets/img/nd2.jpg"
          class="block mx-auto w-3/4"
        />

        <p class="mt-7 mb-2 text-lg font-normal text-default subheading">
          3. Add the link to heystacks:
          <a
            class="hover:underline cursor-pointer text-emerald-800 active:text-emerald-600"
            @click="state.layoutData.page = 'existing'"
            >here</a
          >
        </p>
      </div>
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
import { ethers } from 'ethers'
import EmojiPicker from '@/components/ui/EmojiPicker.vue'
import PaymentSelector from '@/components/payments/PaymentSelector.vue'
import gatheringAbi from '@/abis/GatheringAbi.json'
import { GATHERING_ADDRESSES } from '@/utils/consts'

export default defineComponent({
  components: {
    EmojiPicker,
    PaymentSelector,
  },
  props: {
    existingTags: { type: Array, default: () => [] },
    gathering: { type: String, default: '' },
  },
  emits: ['close', 'close-add-new-modal', 'close-approval-needed'],
  setup(props, { emit }) {
    const new_modal_description = ref(null)
    const route = useRoute()

    const state = reactive({
      layoutData: {
        comboboxInput: null,
        addLoading: false,
        onMobile: false,
        emojiPicker: false,
        page: 'main',
      },
      newDocumentObj: {
        url: 'https://docs.google.com/document/d/1wf9YFtLFM4LuNkDzbb4hGfZqvb6VnKzJ9iZ',
        errors: [],
        description: 'Test for gathering',
        tagCandidate: '',
        tags: ['test'],
      },
    })

    onMounted(() => {
      state.layoutData.onMobile = window.innerWidth < 600
      window.addEventListener('resize', () => {
        state.layoutData.onMobile = window.innerWidth < 600
      })
    })

    const addDocument = async () => {
      state.newDocumentObj.errors = []
      if (!state.newDocumentObj.url) state.newDocumentObj.errors.push('no-url')
      if (!state.newDocumentObj.description)
        state.newDocumentObj.errors.push('no-description')
      if (!state.newDocumentObj.tags.length)
        state.newDocumentObj.errors.push('no-tags')
      if (
        !state.newDocumentObj.url.match(
          /^https:\/\/docs\.google\..{1,6}\/spreadsheets/
        ) &&
        !state.newDocumentObj.url.match(
          /^https:\/\/docs\.google\..{1,6}\/document/
        ) &&
        !state.newDocumentObj.url.match(
          /^https:\/\/docs\.google\..{1,6}\/presentation/
        )
      )
        state.newDocumentObj.errors.push('url-error')

      if (!state.newDocumentObj.errors.length) {
        state.layoutData.addLoading = true
        const docObjCopy = Object.assign({}, state.newDocumentObj)
        docObjCopy.existingTags = []
        if (route.params.gatheringSlug)
          docObjCopy.space = route.params.gatheringSlug
        else if (props.gathering) docObjCopy.space = props.gathering

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const gatheringInstance = new ethers.Contract(
          GATHERING_ADDRESSES['gBG'],
          gatheringAbi,
          signer
        )

        try {
          const response = await gatheringInstance.addDoc(docObjCopy.url, 0)
          const receipt = (await response?.wait()) as any
          if (receipt) {
            fetch('/api/documents/add', {
              method: 'POST',
              body: JSON.stringify({
                ...docObjCopy,
                docUid: receipt?.events[0]?.args?.docId?.toNumber(),
              }),
            }).then(r => {
              if (r.status !== 200) {
                r.json().then(r => {
                  state.layoutData.addLoading = false
                  alert(r)
                })
              } else {
                r.json().then(r => {
                  if (!r.success) {
                    if (r.reason === 'already-exists')
                      alert('⚠️ This document has already been added')
                    if (r.reason === 'url-error')
                      alert(
                        '⚠️ Url error - please check if your url is in the correct format'
                      )
                    if (r.reason === 'cant-access')
                      alert(
                        '⚠️ Unable to access this document - are you sure this is a public document?'
                      )
                  } else {
                    state.newDocumentObj.title = ''
                    state.newDocumentObj.url = ''
                    state.newDocumentObj.description = ''
                    state.newDocumentObj.tags = []
                    if (r.approvalNeeded) {
                      emit('close-approval-needed')
                    } else {
                      fetch('/api/documents/create-thumbnail', {
                        method: 'POST',
                        body: JSON.stringify({ docId: r.document.id }),
                      })
                      setTimeout(
                        () => fetch(`/api/sodoc/${r.document.id}`),
                        3000
                      )
                      emit('close-add-new-modal', r.document)
                    }
                  }
                  state.layoutData.addLoading = false
                })
              }
            })
          }
        } catch (err) {
          state.layoutData.addLoading = false
          console.log(err)
          alert('Error adding doc')
        }
      }
    }

    const updateTagsOnComma = event => {
      if (event.key === 'Tab' && state.layoutData.comboboxInput) {
        event.preventDefault()
        const enterProps = {
          bubbles: true,
          cancelable: true,
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
        }
        const ke = new KeyboardEvent('keydown', enterProps)
        event.target.dispatchEvent(ke)
        setTimeout(
          () => document.getElementById('tags-combobox--1').focus(),
          10
        )
      }
      if (event.key === ',') {
        event.preventDefault()
        addTag()
      }
      if (event.key === 'Enter') {
        if (state.newDocumentObj.tagCandidate === 'No data available') {
          addTag()
        } else {
          if (state.newDocumentObj.tags.length > 7) {
            state.layoutData.snackbarText = 'Maximum number of tags reached'
            state.layoutData.openSnackbar = true
            state.newDocumentObj.tags.pop()
          }
        }
      }
      setTimeout(() => updateTagCandidate(), 0)
    }

    const addTag = () => {
      if (state.newDocumentObj.tags.length > 7) {
        state.layoutData.snackbarText = 'Maximum number of tags reached'
        state.layoutData.openSnackbar = true
      } else {
        if (
          state.layoutData.comboboxInput &&
          state.newDocumentObj.tags
            .map(tag => tag.text)
            .indexOf(state.layoutData.comboboxInput) < 0
        ) {
          state.newDocumentObj.tags.push({
            text: state.layoutData.comboboxInput,
            value: state.layoutData.comboboxInput,
          })
        }
        state.layoutData.comboboxInput = null
        state.newDocumentObj.tagCandidate = ''
      }
    }

    const updateTagCandidate = () => {
      state.newDocumentObj.tagCandidate = (
        document.querySelector(
          '.v-autocomplete__content > .v-list > .v-list-item--highlighted'
        ) || { textContent: 'No data available' }
      ).textContent
    }

    const insertEmoji = emoji => {
      const el = new_modal_description.value.$el.querySelector('textarea')
      let cursorPos = el.selectionEnd
      state.newDocumentObj.description =
        state.newDocumentObj.description.substring(0, cursorPos) +
        emoji +
        state.newDocumentObj.description.substring(cursorPos)
      cursorPos += 1
      nextTick(() => {
        el.setSelectionRange(cursorPos, cursorPos)
        el.focus()
      })
      state.layoutData.emojiPicker = false
    }

    return {
      state,
      emit,
      addDocument,
      updateTagsOnComma,
      addTag,
      updateTagCandidate,
      insertEmoji,
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
