<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'

import EmojiPicker from '@/components/ui/EmojiPicker.vue'
import PaymentSelector from '@/components/payments/PaymentSelector.vue'

import { ACTIVE_NETWORK } from '@/utils/consts'
import { DocDataBase } from '@/utils/types'
import { ethers } from 'ethers'

import useConnectedAccount from '@/composables/web3/account/useConnectedAccounts'
import useConnecteNetwork from '@/composables/web3/account/useConnectedNetwork'
import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'
import requestNetworkSwitch from '@/composables/web3/account/useChangeNetwork'

import addDocWeb3 from '@/composables/web3/gathering/useAddDoc'
import addDocWeb2 from '@/composables/web2/useAddDoc'

// consts
const existingTags = ['tag-A']
const tagCandidate = ''

const emit = defineEmits<{
  (e: 'close'): void
}>()

// composables
const { provider } = useMetaMaskProvider()
const { account } = useConnectedAccount()
const { connectedChainId } = useConnecteNetwork()

// state
const layoutData = reactive({
  comboboxInput: null,
  onMobile: false,
  emojiPicker: false,
  page: 'main',
})
const newDocObj = reactive({
  url: 'https://docs.google.com/document/d/1wf9YFtLFM4LuNkDzbb4hGfZqvb6VnKzJ9iZ',
  description: 'Test for gathering',
  tags: [],
  docId: -1,
  docUid: '-',
  docType: 0,
} as DocDataBase)
const tags = ref('test')
const loadingAdding = ref(false)
const errors = ref([] as string[])

// methods
async function connectWallet() {
  await provider?.value?.send('eth_requestAccounts', [])
}

async function addDoc() {
  loadingAdding.value = true

  try {
    // parsing doc url to extract docId and docType
    let url = newDocObj.url.match(
      /(https:\/\/docs\.google\..{1,6}\/.{1,30}?\/.{1,10}?\/.{5,100}?(\/|$))/
    )?.[0]
    if (!url) {
      throw new Error('Wrong doc url format')
    }
    if (url.slice(url.length - 1) !== '/') url += '/'
    if (url.match(/\/u\/\d\//g)) url = url.replace(/\/u\/\d\//, '\/')
    if (url.includes('/d/e/')) {
      throw new Error('Published docs are not supported')
      // docUrl[0] += 'pub'
    }
    newDocObj.url = url
    newDocObj.docUid = url.match(/\/d\/(?:e\/)?(.*)\//)?.[1] ?? '-'

    if (url.includes('/document/')) newDocObj.docType = 1
    if (url.includes('/spreadsheets/')) newDocObj.docType = 2
    if (url.includes('/presentation/')) newDocObj.docType = 3

    const tx = await addDocWeb3(newDocObj).catch((err: any) => console.log(err))
    if (!tx) throw new Error('Transaction error')
    const res = await tx.tx.wait().catch((err: any) => console.log(err))
    if (!res) throw new Error('Transaction response error')
    console.log('res data', res)

    newDocObj.tags = tags.value.split(/, |,/)
    newDocObj.docId = Number(ethers.utils.hexValue(res.events[0].data))

    const web2Data = await addDocWeb2(newDocObj).catch((err: any) => alert(err))
    if (!web2Data) throw new Error('Error adding doc to API')
    console.log(web2Data)

    loadingAdding.value = false
    emit('close')
  } catch (err) {
    alert(err)
    loadingAdding.value = false
  }
}
</script>

<template>
  <div class="overflow-auto fixed z-50 bg-white rounded fade-modal absolute-center">
    <div class="relative px-4 sm:px-6 pt-12 w-full h-full">
      <h3
        class="mb-3 font-normal text-center text-default display-1"
        :style="
          layoutData.onMobile
            ? { 'font-size': '1.5rem!important', 'line-height': '2.0rem' }
            : { 'font-size': '1.725rem!important' }
        "
      >
        Share an interesting Doc, Sheet or Slide
      </h3>
      <div>
        <p>Network Status</p>
        <div v-if="!provider">Install or enable MetaMask</div>
        <div v-else-if="!account">
          <div>Connect your account first</div>
          <button class="bg-thgreen8 btn-dark" @click="connectWallet">Connect</button>
        </div>
        <div v-else-if="connectedChainId === ACTIVE_NETWORK">Correct network</div>
        <div v-else>
          <div>Please switch to 80001</div>
          <button class="btn-dark" @click="requestNetworkSwitch">Switch</button>
        </div>
      </div>

      <div v-if="layoutData.page === 'main'" class="text-center">
        <br />
        <br />
        <br />
        <button
          class="py-2 mt-5 mb-4 w-1/2 bg-green-900 hover:bg-green-800 active:bg-green-700 rounded duration-200"
          :style="
            layoutData.onMobile
              ? { 'font-size': '0.8rem!important', 'min-width': '235px' }
              : { 'font-size': '1.0rem!important', 'min-width': '285px' }
          "
          @click="layoutData.page = 'existing'"
        >
          <i class="mr-2 text-xl text-white fa fa-file-alt"></i>
          <span class="text-xl text-white">Share a link to existing doc</span>
        </button>
        <br />
        <button
          class="py-2 mt-5 mb-4 w-1/2 bg-green-900 hover:bg-green-800 active:bg-green-700 rounded duration-200"
          :style="
            layoutData.onMobile
              ? { 'font-size': '0.8rem!important', 'min-width': '235px' }
              : { 'font-size': '1.0rem!important', 'min-width': '285px' }
          "
          @click="layoutData.page = 'new'"
        >
          <i class="mr-2 text-xl text-white fa fa-file"></i>
          <span class="text-xl text-white">Write a new doc</span>
        </button>
      </div>
      <div v-if="layoutData.page === 'existing'" class="sm:px-10 text-center">
        <a
          class="mb-4 hover:underline cursor-pointer text-emerald-800 active:text-emerald-600"
          @click="layoutData.page = 'main'"
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
            v-model="newDocObj.url"
            type="text"
            class="px-3 pt-5 pb-3 mb-0 w-full text-default bg-gray-200 rounded outline-none"
            :error="errors.indexOf('url-error') >= 0 || errors.indexOf('no-url') >= 0"
            filled
            required
          />
          <label
            for="url-input"
            :class="
              errors.indexOf('url-error') >= 0 || errors.indexOf('no-url') >= 0
                ? `text-orange-600`
                : `text-default`
            "
            >Url</label
          >
          <p v-if="errors.indexOf('url-error') >= 0" class="text-left text-red-500">
            Incorrect url - please double check your link. It should be something like
            "https://docs.google.com/document/d/1wf9YFtLFM4LuNkDzbb4hGfZqvb6VnKzJ9iZ"
          </p>
        </div>

        <div class="mb-3 form-group">
          <textarea
            id="new-modal-description"
            ref="new-modal-description"
            v-model="newDocObj.description"
            rows="4"
            class="px-3 pt-5 pb-3 w-full text-default bg-gray-200 rounded outline-none"
            :error="errors.indexOf('no-description') >= 0"
            maxlength="1000"
            filled
            required
          ></textarea>
          <label
            for="new-modal-description"
            :class="errors.indexOf('no-description') >= 0 ? `text-orange-600` : `text-default`"
          >
            What is this doc about?
          </label>
          <div
            class="absolute right-2 bottom-3 cursor-pointer emoji-picker-btn"
            @click="layoutData.emojiPicker = !layoutData.emojiPicker"
          >
            <i class="far fa-smile"></i>
          </div>
          <EmojiPicker
            v-if="layoutData.emojiPicker"
            class="absolute z-50 emoji-picker"
            @select-emoji="insertEmoji"
            @close="layoutData.emojiPicker = false"
          ></EmojiPicker>
        </div>
        <div class="form-group">
          <input
            id="tags-combobox--1"
            ref="tags--1"
            v-model="tags"
            class="px-3 pt-5 pb-3 mb-0 w-full text-default bg-gray-200 rounded outline-none"
            :items="existingTags"
            :error="errors.indexOf('no-tags') >= 0"
            chips
            counter="2"
            multiple
            hide-details
            hide-selected
            hide-no-data
            auto-select-first
            filled
            required
            @input="layoutData.comboboxInput = null"
            @keydown="updateTagsOnComma"
            @blur="addTag"
          />
          <label
            for="tags-combobox--1"
            :class="errors.indexOf('no-tags') >= 0 ? `text-orange-600` : `text-default`"
          >
            Tags
          </label>
        </div>
        <div class="min-h-26">
          <transition name="fade">
            <small
              v-if="
                layoutData.comboboxInput && tagCandidate && tagCandidate !== 'No data available'
              "
              class="z-20 mb-0 text-left"
            >
              Enter:
              <strong>{{ tagCandidate }}</strong>
              (comma to ignore)
            </small>
          </transition>
        </div>
        <button
          class="py-2 mt-5 mb-6 w-full bg-green-900 hover:bg-green-800 active:bg-green-700 rounded duration-200"
          :disabled="loadingAdding"
          @click="addDoc()"
        >
          <i v-if="!loadingAdding" class="mr-2 text-xl text-white fa fa-plus"></i>
          <span class="text-xl text-white">{{ loadingAdding ? 'Adding...' : 'Add new doc' }}</span>
        </button>
        <!-- <div class="pb-12 min-h-26">
          <h5>Sponsor submission</h5>
          <small class="block mt-1 mb-4"
            >Sponsored docs are more likely to be included in the gathering</small
          >
          <PaymentSelector />
          <small>If the doc is not approved, the funds will be returned</small>
        </div> -->
      </div>
      <div v-if="layoutData.page === 'new'" class="pb-6 text-center">
        <a
          class="mb-4 hover:underline cursor-pointer text-emerald-800 active:text-emerald-600"
          @click="layoutData.page = 'main'"
        >
          <i class="mr-1 fa fa-chevron-left"></i>
          Back
        </a>
        <br />
        <p class="mt-7 mb-2 text-lg font-normal text-default subheading">1. Create a new:</p>
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
        <img alt="Share doc 1" src="/src/assets/img/nd1.jpg" class="block mx-auto w-3/4" />
        <br />
        <img alt="Share doc 2" src="/src/assets/img/nd2.jpg" class="block mx-auto w-3/4" />

        <p class="mt-7 mb-2 text-lg font-normal text-default subheading">
          3. Add the link to heystacks:
          <a
            class="hover:underline cursor-pointer text-emerald-800 active:text-emerald-600"
            @click="layoutData.page = 'existing'"
            >here</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
