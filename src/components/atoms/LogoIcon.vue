<template>
  <div>
    <router-link
      :to="{ path: '/' }"
      class="flex items-center opacity-90 active:opacity-75 transition duration-200 hover:scale-105"
      title="heystacks"
    >
      <svg
        alt="heystacks logo"
        style="width: 14px; margin-bottom: -4px"
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        viewBox="0 0 900.000000 900.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="100" y="100" width="850" height="800" fill="#7b4848"></rect>
        <rect x="10" y="10" width="700" height="700" fill="white"></rect>
        <g
          transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)"
          fill="#d96d1a"
          stroke="none"
        >
          <path
            d="M0 4000 l0 -4000 4000 0 4000 0 0 4000 0 4000 -4000 0 -4000 0 0 -4000z m6740 1695 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z m-870 -1730 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z"
          />
        </g>
      </svg>
      <h1 class="hidden xs:inline-block ml-1 text-xl font-medium">heystack</h1>
    </router-link>
  </div>
</template>
