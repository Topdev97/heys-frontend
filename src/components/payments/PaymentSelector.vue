<script lang="ts" setup>
// composable

// state

// methods
</script>

<template>
  <div class="sm:flex gap-4">
    <div class="mb-3 sm:w-2/3 form-group">
      <input
        id="token-input"
        type="text"
        class="px-3 pt-5 pb-3 mb-0 w-full text-default bg-gray-200 rounded outline-none"
        filled
        required
      />
      <label for="token-input" class="text-default">Amount</label>
    </div>
    <div class="mb-3 sm:w-1/3 form-group">
      <select
        id="token-type"
        class="px-3 pt-5 pb-3 mb-0 w-full text-default bg-gray-200 rounded outline-none"
        style="min-height: 56px"
        filled
      >
        <option selected>MATIC</option>
        <option>USDC</option>
      </select>
    </div>
  </div>
</template>
