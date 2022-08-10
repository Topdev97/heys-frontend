<template>
  <div :style="state.unicode ? {} : {'color': textToColor(title) + ' !important', opacity: '0.7', filter: 'grayscale(70%)'}" class="mr-2 w-3">
    <svg v-if="!state.unicode" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus fa-w-14 max-h-full max-w-full"><path fill="currentColor" d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z" ></path></svg>
    <div v-else-if="state.unicode.includes('<img')" v-html="state.unicode" class="text-center h-4"></div>
    <div v-else class="text-center">{{state.unicode}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from 'vue';

export default defineComponent({
  props: {
    title: {type: String},
  },

  setup(props) {
    const state = reactive({
      unicode: ''
    })

    onBeforeMount(() => {
      if (props.title === 'resources') state.unicode = '📑'
      else if (props.title === 'tips') state.unicode = '📋'
      else if (props.title === 'recommendations') state.unicode = '📋'
      else if (props.title === 'politics') state.unicode = '🗳️'
      else if (props.title === 'art') state.unicode = '🎨'
      else if (props.title === 'data') state.unicode = '🗄️'
      else if (props.title === 'remotework') state.unicode = '💻'
      else if (props.title === 'food') state.unicode = '🍲'
      else if (props.title === 'films') state.unicode = '📽️'
      else if (props.title === 'movies') state.unicode = '📽️'
      else if (props.title === 'coronavirus') state.unicode = '😷'
      else if (props.title === 'games') state.unicode = '🎮️'
      else if (props.title === 'freelance') state.unicode = '🖥️️'
      else if (props.title === 'teaching') state.unicode = '👩‍🏫'
      else if (props.title === 'healthcare') state.unicode = '⚕️'
      else if (props.title === 'jobs') state.unicode = '👔️'
      else if (props.title === 'parenting') state.unicode = '👪️'
      else if (props.title === 'music') state.unicode = '🎵'
      else if (props.title === 'sport') state.unicode = '⚽️'
      else if (props.title === 'journalism') state.unicode = '📰️'
      else if (props.title === 'guide') state.unicode = 'ℹ️️'
      else if (props.title === 'animal crossing') state.unicode = '🌻️'
      else if (props.title === 'ACNH') state.unicode = '🌻'
      else if (props.title === 'finance') state.unicode = '💸️'
      else if (props.title === 'startup') state.unicode = '🦄️'
      else if (props.title === 'fitness') state.unicode = '💪️'
      else if (props.title === 'films') state.unicode = '📽️'
      else if (props.title === 'VC') state.unicode = '🦄️️'
      else if (props.title === 'climate') state.unicode = '🌍️'
      else if (props.title === 'recipe') state.unicode = '🍲'
      else if (props.title === 'recruitment') state.unicode = '👔️'
      else if (props.title === 'vegan') state.unicode = '🌱️'
      else if (props.title === 'aviation') state.unicode = '✈️'
      else if (props.title === 'theatre') state.unicode = '🎭'
      else if (props.title === 'history') state.unicode = '🏺'
      else if (props.title === 'reading') state.unicode = '📚'
      else if (props.title === 'technology') state.unicode = '⚙️'
      else if (props.title === 'socialism') state.unicode = '🌹️'
      else if (props.title === 'fact-check') state.unicode = '🔍'
      else if (props.title === 'protest') state.unicode = '✊️'
      else if (props.title === 'travel') state.unicode = '🧳️'
      else if (props.title === 'books') state.unicode = '📚️'
      else if (props.title === 'mental health') state.unicode = '💚️'
      else if (props.title === 'podcasts') state.unicode = '🎙️️'
      else if (props.title === 'contacts') state.unicode = '📝'
      else if (props.title === 'media') state.unicode = '🔊'
      else if (props.title === 'society') state.unicode = '🏛️'
      else if (props.title === 'research') state.unicode = '🔬'
      else if (props.title === 'LGBT') state.unicode = '🏳️‍🌈'
      else if (props.title === 'programming') state.unicode = '⌨️️️'
      else if (props.title === 'learning') state.unicode = '👩‍🏫'
      else if (props.title === 'AI') state.unicode = '🧠️️'
      else if (props.title === 'gender') state.unicode = '♀️️️'
      else if (props.title === 'UK') state.unicode = '<img class="h-full" src="data:image/png;base64,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"/>'
      else if (props.title === 'Hong Kong') state.unicode = '<img class="h-full" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABCElEQVQ4jcWRrW4CQRRGz8zObBMQYDoGsiFYBDwAwWLwGF6QR8CRoCBZVUlSsSgmhAQMYf+mYivaLAsthmPv/U7uD7wa8TGdfjaM8Z4Jn6zNVMMY773bDZ4cIJKVJa3Rkwlev3/XoCoLgwGy2cSdz/8T6PGYfL9H1Os4z4PrlbfZDBfHpMslubW/+ksrSGNQvV4RCEPwfdAaUashO53SBCVBsljgkgTZaiEuF1yWke92xPM56WbzWJBbS7pagRCo0QihNTIIkO32zRuUv+D7qOEQoTXucMAdj6BUscoNyl9IEtL1GoQgjyJwDuH7ZNvtHwXOFcEfpGF4MwygTtZmQFTZcYfv7Iv5AlBbXRDIBw+5AAAAAElFTkSuQmCC"/>'
      else if (props.title === 'USA') state.unicode = '<img class="h-full" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEWklEQVR4nO2aTWhcVRTH//e9mWnmvRBMiNF0ESgaPyoFE5MqdGMDops2RdSqC4kbdeNCFNGdq5AUq6CYxPjRRbsyuJKCINhiWxASbAnN+EFDtZJpmthO5mUyXy/zjouhZd67b74y794Z8f7gLOb+H/fjvHPvOXNnAIVCoVAoFAqFQvF/hJUTTly92nYlHp5aTEReWElpZtYp+2jDLI2uiug2A7AlEE3BXDvJ2MFtv4d8V3X80voDZ/6mi8uWboiYmZfYESEOKIEtoMCeYR0P3/QqmrfhgyWKnPmLLi5v6AYcQIoJh4ag0/dEpHsVzgH2Pyuzy0nNABFKbXJoA962UptoRJcCDWEr9oq3NeRtWFxMPkcdbXc+D99tozdawKG+LM6v7kI8o2NhPczph/uyuLADHQAKY1PBrLEq7DUAJ0pbuAi4Fu0yS8Pz0c48xoeTAIDx4SQGu/Ku8B3oakwvbgGSZM4+73o5B+S0kCs8v/jVQCxRfGOxRBizMcOlz8Ya04tbQJqZVR3gnVs0RLDyGo7+0Akrr8HQKVC9eATIdIIbLg0++OW6rFPpDr+9tCZtLGY+4lozHwFObTb5hNWQXmrNhMsCcCoHwP57bNxrOBjdk8X5lQiupzXM3wjXrLcaXARU20ID3TYmDlgAgIkDFga77br0GralVLgIqBaSM4sGnurLY1+3jdjNMGYWjbp0P5yxj+ubdYDwEeBQRTN0B8kcw/Pf3YVkjsHUnbp0X2ulLHD/JzekB+Xv596XNpY+97VrzT6HoLS5lNC8g4CLgPs+WvWdzfGRFN7+sb1sRx+OpPDODvUrr3PfUoXhrQP4CPAsf//ubexuL2C0P4efroUR39IxHw+59F6zgCP9OZzbgd5sfAohctlATx6TB1MAgGMjKTzWk3fpgz15HBvZuW7qza2EfLKA22YWolhaK76xpbUQpheiLn26Qb2/syB8kZXg6wDPFjAihGSO4dm5Drz1eAZGiLBls8D0Q/On4Zy+IGBptcEdgnvG49KO5L2ZOL7941OESV4U6N+cqnwIyvpysjcTx+yfXyFMvpe10qiaBYLEcHJ4KLuKwxu/4MVbP0t98+XgtgDlRVWCDuBkgUJaTPc1UvU+QBwaoBmAxt1KNRWJDrg94i7pQ1ZCvgNaDD4LvDsudsTUFmBZYseoA5+iXFAedBwgnQGsTTH97xAfBwSUBLI5IGkBheanukqIi4D/wOIBkXWAnQDQeg6QVwfoJgDu1+iWw6cUJoAF8G8QLVK0eiAC6Ha1KKQgTXkbfCLA4R6SBmOAFi1WjGK47G3gI+DN9+Zghl4VNYOacAh0fSvwbhnR5942PgISmTdgF9Jy/htTxsiBgN8E5gGc5Jzi5ykae7kf7dolhMXFYkU2bZBlB9cfYYGBPc3m5m55pbKnHY092YZI72cU0Y6yEMxADsZqbBMoXQA2A7kkSQO4zIhNY339FDt7trk3LwqFQqFQKBQKhaKl+BcKfK+DjLFuFAAAAABJRU5ErkJggg=="/>'
      else if (props.title === 'India') state.unicode = '<img class="h-full" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAE80lEQVR4nO3cT0wUVxzA8e/s/9kFg8C6VBYa/5z8ExJj9VCEdeOhIWj24g0jXpoIJ2+NNT3UxJh4IpGQ9NT1ahNCgo0HW1ixB7WJMbF70UjUBVawWYX9vzszPVAJsm1DL+4b+X1uvMzhLV/mzTDzsiCEEEIIIYQQQgghhBBCCCGE2Lq0jQPWD3yBQaAek9lynOS0r3m4fshVc5DJj2js+2iT2spMksD+9UOOOk1F/AsJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJohgJopiad+qVQ98/wel5U4/JbDlGOQ3ffTBUs+skl8v9AbLJ4SNJBgKBDzY51O46sRnDsFhaygMQDPpxOmv+xmzFlkEsC8bHnxKPJ0kk5mhsdAOQzVbo6WlncHA/sdheNBu2sd2SlU7nGBi4TTZbprt7J0NDXbjdTjQNymWD0dHH3Ls3T1OTlxs3viIU8td7yv+lZsmy1V1WOp0jGv2JYFBncjLG5ctfUiwaeDxOPB4npZLJlSvd3LoVo6nJSzR6k8XFfL2n/b/YJohlwcDAbbq6gly92k1zs48HD9LMz+fIZIpkMkXS6Rz376dpadG5dq2HgweDnDlzG8uq9+w3zzZBxsefks2WuX49SmfnNiYnn6PrLvL5KolEiqmpFIWCgc/nZHLyOeFwA6OjUTKZIhMTz+o9/U2zzUU9Hk/S3b2TQMDF9PQrtm/3cefOS4rFKqZpoWka8/NZfD4X0WgniUSKo0fbOHasnXg8SSy2t94fYVNscYYYhsXMzDxDQ13Mzi5jmhZv3xYpFqvougvTtDAME6/XRalUZWkpj2FYvHixwvnzXSQScxiGPdYtWwRZXMzj97vweJy0tPgIhxtYWFj9pWezFUZGHjEy8oh8vkKlYrKwkKOjo5GWFh9erxNdd679r6I6WyxZmgaWZa27OK/era+OaRuOff+ztXasZVnrxtVmiyDBoJ9CoUq5bJDNVpibyxIK+UmlVvD5XFy4cAjLAl13USoZtLX5SaWymCa43Q6KRYPWVr3eH2NTbLFkOZ0aPT1hxsYes2vXNpxOjeZmHz6fi0KhiqZpaBpUKga67iIUCuBwaHz+eSNjY4+JRDps80jFFkEAzp7dx8zMPLlclUikg0ymyPHjYQ4fDhEON9DRsY0jRz7jxIlOFhfz9PaGyecN7t6dY3BQ2QcPNWwTJBbbS1OTl+HhX3j5cpn+/t1UqxaBgJve3nYikfa1Jau/fzepVJahoTu0tvo4eXJPvae/abZ6lvX6dZ5o9CYHDrQyOhqlocHN7Owyzc0+NA3evCmwZ08Ty8tlhod/JZn8k6mp0wSDyl4/7P0sKxTyMzV1mnfvSvT1jXPp0m94PA4qFYNyefWZ1sWL9+jrG2dlpaR6jH9kqzPkPcuCiYlnxONJpqdTBAJuLMsin68SiYQ5d24/p07ZYpmqOUNsGWQ907TWnuju2OHH4bDH3dTfPr03hg6HRlvbp/M9BzVBvvn52yeFSkE2OXwEultPbxyrCfLw1e8HsNGSZXPJjQO2usvaCiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYiSIYmreqTsc5qBpOT6dbRwKc2hmrt5zEEIIIYQQQgghhBBCCCGEEEKo5C8lPKs7C4Z3SwAAAABJRU5ErkJggg=="/>'
    })

    const textToColor = (text) => {
      let hash = 0
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash)
      }
      const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16)
      return '#' + Array(6 - color.length + 1).join('0') + color
    }

    return {
      state,
      textToColor
    }
  }
})

</script>