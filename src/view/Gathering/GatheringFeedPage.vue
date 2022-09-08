<script lang="ts" setup>
import { computed, defineComponent, onMounted, reactive, ref, toRef } from 'vue'
import LayoutLight from '@/layouts/LayoutLight.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import TagButton from '@/components/atoms/TagButton.vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Doc, MarketData, Tag } from '@/utils/types'
import useDocs from '@/composables/web2/useDocs'
import FeedCard from '@/components/atoms/FeedCard.vue'
import HeaderNav from '@/components/layoutElements/HeaderNav.vue'
import HeaderContent from '@/components/layoutElements/HeaderContent.vue'
import Footer from '@/components/layoutElements/Footer.vue'
import AddNewModal from '@/components/docs/AddNewModal.vue'
import TipModal from '@/components/payments/TipModal.vue'
import useTags from '@/composables/web2/useTags'
import gatheringSlug from '@/composables/utils/useGatheringSlug'

// consts
const initialFilters = {
  page: ref(0),
  pageCount: 1,
  search: '',
  searchOption: 'Everything',
  tagSearch: '',
  sort: 'Hot',
  type: 'all',
  tags: [],
}

// state
const filters = reactive({ ...initialFilters })
const newDocumentModal = ref(false)
const tipModal = ref(false)

// composables
const { docs } = useDocs(
  toRef(filters, 'search'),
  toRef(filters, 'tags'),
  toRef(filters, 'page'),
  toRef(filters, 'sort'),
  toRef(filters, 'type'),
  toRef(filters, 'searchOption'),
  gatheringSlug
)
const { tags } = useTags(toRef(filters, 'sort'))

// computed
const marketData = computed<MarketData>(() => {
  return {} as MarketData
})

// methods
function toggleTags(tag: string) {
  filters.page = 0
  const tagIdx = filters.tags.indexOf(tag)
  if (tagIdx < 0) {
    filters.tags.push(tag)
    if (!docs.length) filters.search = ''
  } else {
    filters.tags.splice(tagIdx, 1)
  }
}

function addedNewDoc(doc: Doc) {
  console.log(doc)
}
</script>

<template>
  <LayoutLight>
    <template #header-nav>
      <HeaderNav />
    </template>
    <template #header-content>
      <HeaderContent
        :navLink="{
          label: 'Backstage >',
          path: `/g/${gatheringSlug}/backstage`,
        }"
      />
    </template>
    <template #command-band>
      <div class="mx-auto mb-4 max-w-screen-md text-center flex-center">
        <SearchInput
          :feed="true"
          :initialSearch="filters.search"
          :searching="false"
          :existingTags="[]"
          @search="
            search => {
              filters.search = search
            }
          "
          @selected-tag="
            tag => {
              alert(tag)
            }
          "
        />
        <button
          title="Share an interesting Google doc"
          class="py-2 px-4 m-2 bg-thgreen8 btn-white"
          @click="newDocumentModal = true"
        >
          <div style="width: 1rem" class="inline-block">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="plus"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              style="max-height: 100%; max-width: 100%"
              viewBox="0 0 512 512"
              class="svg-inline--fa fa-plus fa-w-14"
            >
              <path
                fill="currentColor"
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                class=""
              ></path>
            </svg>
          </div>
          <span class="hidden sm:inline-block ml-2"> New </span>
        </button>
        <button title="Tip" class="py-2 px-4 m-2 bg-thgreen8 btn-white" @click="tipModal = true">
          <span class="hidden sm:inline-block ml-2"> Tip </span>
        </button>
      </div>
      <div class="flex-wrap mx-auto max-w-screen-md text-center flex-center">
        <TagButton
          v-for="tag in (docs?.remindingTags?.length ? docs?.remindingTags : tags ?? [])
            .slice(0, 10)
            .map(tag => ({ id: tag.id, text: tag.title, title: tag.title }))"
          :key="`tag-${tag.title}`"
          :tag="tag"
          :selected="filters.tags.includes(tag.title)"
          @click="toggleTags(tag.title)"
        />
        <span v-if="tags?.length > 10" class="ml-2"> ... </span>
      </div>
    </template>
    <template #content>
      <div class="mx-auto mb-12 max-w-screen-md">
        <div class="flex items-center pt-6 sm:pt-12 pb-12 mx-auto w-2/3">
          <div class="flex-grow border-t-2 border-gray-200"></div>
          <span class="px-4 mb-0 font-extrabold uppercase">Results</span>
          <div class="flex-grow border-t-2 border-gray-200"></div>
        </div>
        <FeedCard v-for="(doc, did) in docs?.documents" :key="`doc-${did}`" :index="did">
          <h5 class="mb-2">{{ doc.title }}</h5>
          <div class="mb-2">
            •
            <div
              v-for="tag in doc.tags.replace(/'/g, '').split(',')"
              :key="`tag-${did}-${tag}`"
              class="inline-block ml-1"
            >
              <span class="link" @click="toggleTags(tag)">
                {{ tag }}
              </span>
              •
            </div>
          </div>
          <p class="mb-2">{{ doc.description }}</p>
          <div class="mb-2">
            <small class="mr-2"> Upvotes: {{ doc.upvotes }} </small>
            <small class="mr-2"> Comments: {{ doc.comments }} </small>
            <small class="mr-2"> Added: {{ new Date(doc.createdAt).toLocaleDateString() }} </small>
          </div>
        </FeedCard>
      </div>
      <div v-if="docs?.length > 10" class="flex-center">
        <button
          v-if="filters.page > 0"
          title="Previous page"
          class="py-2 px-4 m-2 bg-thgreen1 btn-white"
          @click="filters.page -= 1"
        >
          {{ `<` }}
        </button>
        <button title="Previous page" class="py-2 px-4 m-2 bg-thgreen1 btn-white" @click="filters.page += 1">
          {{ `>` }}
        </button>
      </div>

      <Dialog :open="newDocumentModal" @close="newDocumentModal = false">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-[2px]" aria-hidden="true" />
        <div class="flex fixed inset-0 z-50 justify-center items-center p-4">
          <DialogPanel class="p-8 w-full bg-white rounded max-w-[40rem]">
            <AddNewModal
              :existingTags="tags.map(tag => ({ text: tag.title, value: tag.title }))"
              :gathering="gatheringSlug"
              @close-add-new-modal="doc => addedNewDoc(doc)"
            ></AddNewModal>
          </DialogPanel>
        </div>
      </Dialog>
      <Dialog :open="tipModal" @close="tipModal = false">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-[2px]" aria-hidden="true" />
        <div class="flex fixed inset-0 z-50 justify-center items-center p-4">
          <DialogPanel class="p-8 w-full bg-white rounded max-w-[40rem]">
            <TipModal />
          </DialogPanel>
        </div>
      </Dialog>

      <div
        v-if="newDocumentModal || tipModal"
        class="backdrop"
        @click="
          () => {
            newDocumentModal = false
            tipModal = false
          }
        "
      ></div>
    </template>
    <template #footer>
      <Footer />
    </template>
  </LayoutLight>
</template>
