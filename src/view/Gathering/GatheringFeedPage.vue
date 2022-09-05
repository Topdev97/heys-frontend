<script lang="ts" setup>
import { computed, defineComponent, onMounted, reactive, ref, toRef } from 'vue'
import LayoutLight from '@/layouts/LayoutLight.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import TagButton from '@/components/atoms/TagButton.vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Doc, MarketData, Tag } from '../../utils/types'
import useDocs from '../../composables/web2/useDocs'
import FeedCard from '../../components/atoms/FeedCard.vue'
import HeaderNav from '@/components/layoutElements/HeaderNav.vue'
import HeaderContent from '@/components/layoutElements/HeaderContent.vue'
import Footer from '@/components/layoutElements/Footer.vue'
import AddNewModal from '@/components/docs/AddNewModal.vue'
import TipModal from '@/components/payments/TipModal.vue'
import useTags from '../../composables/web2/useTags'
import { useRoute } from 'vue-router'

// consts
const route = useRoute()
const gatheringSlug = route.params.gatheringSlug.toString()
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
    <template v-slot:header-nav>
      <HeaderNav />
    </template>
    <template v-slot:header-content>
      <HeaderContent
        :nav-link="{ label: 'Govern', path: `/g/${gatheringSlug}/govern` }"
      />
    </template>
    <template v-slot:command-band>
      <div class="max-w-screen-md mx-auto mb-4 text-center flex-center">
        <SearchInput
          :feed="true"
          :initial-search="filters.search"
          :searching="false"
          :existing-tags="[]"
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
          class="btn-white px-4 py-2 m-2 bg-thgreen8"
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
        <button
          title="Tip"
          class="btn-white px-4 py-2 m-2 bg-thgreen8"
          @click="tipModal = true"
        >
          <span class="hidden sm:inline-block ml-2"> Tip </span>
        </button>
      </div>
      <div class="max-w-screen-md mx-auto text-center flex-center flex-wrap">
        <TagButton
          v-for="tag in (docs?.remindingTags?.length
            ? docs?.remindingTags
            : tags ?? []
          )
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
    <template v-slot:content>
      <div class="max-w-screen-md mx-auto mb-12">
        <div class="w-2/3 pt-6 sm:pt-12 pb-12 mx-auto flex items-center">
          <div class="flex-grow border-t-2 border-gray-200"></div>
          <span class="mb-0 px-4 uppercase font-extrabold">Results</span>
          <div class="flex-grow border-t-2 border-gray-200"></div>
        </div>
        <FeedCard
          v-for="(doc, did) in docs?.documents"
          :key="`doc-${did}`"
          :index="did"
        >
          <h5 class="mb-2">{{ doc.title }}</h5>
          <div class="mb-2">
            •
            <div
              v-for="tag in doc.tags.replace(/'/g, '').split(',')"
              :key="`tag-${did}-${tag}`"
              class="inline-block ml-1"
            >
              <span @click="toggleTags(tag)" class="link">
                {{ tag }}
              </span>
              •
            </div>
          </div>
          <p class="mb-2">{{ doc.description }}</p>
          <div class="mb-2">
            <small class="mr-2"> Upvotes: {{ doc.upvotes }} </small>
            <small class="mr-2"> Comments: {{ doc.comments }} </small>
            <small class="mr-2">
              Added: {{ new Date(doc.createdAt).toLocaleDateString() }}
            </small>
          </div>
        </FeedCard>
      </div>
      <div v-if="docs?.length > 10" class="flex-center">
        <button
          v-if="filters.page > 0"
          title="Previous page"
          class="btn-white px-4 py-2 m-2 bg-thgreen1"
          @click="filters.page -= 1"
        >
          {{ `<` }}
        </button>
        <button
          title="Previous page"
          class="btn-white px-4 py-2 m-2 bg-thgreen1"
          @click="filters.page += 1"
        >
          {{ `>` }}
        </button>
      </div>

      <Dialog :open="newDocumentModal" @close="newDocumentModal = false">
        <div
          class="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel class="w-full max-w-[40rem] rounded bg-white p-8">
            <AddNewModal
              :existing-tags="
                tags.map(tag => ({ text: tag.title, value: tag.title }))
              "
              :gathering="gatheringSlug"
              @close-add-new-modal="doc => addedNewDoc(doc)"
            ></AddNewModal>
          </DialogPanel>
        </div>
      </Dialog>
      <Dialog :open="tipModal" @close="tipModal = false">
        <div
          class="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel class="w-full max-w-[40rem] rounded bg-white p-8">
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
    <template v-slot:footer>
      <Footer />
    </template>
  </LayoutLight>
</template>
