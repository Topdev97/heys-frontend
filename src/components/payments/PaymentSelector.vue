<script lang="ts" setup>
// composable

// state

// methods
</script>

<template>
  <div class="sm:flex gap-4">
    <div class="form-group sm:w-2/3 mb-3">
      <input
        type="text"
        id="token-input"
        class="bg-gray-200 rounded w-full outline-none px-3 pt-5 pb-3 text-default mb-0"
        filled
        required
      />
      <label for="token-input" class="text-default">Amount</label>
    </div>
    <div class="form-group sm:w-1/3 mb-3">
      <select
        id="token-type"
        class="bg-gray-200 rounded w-full outline-none px-3 pt-5 pb-3 text-default mb-0"
        style="min-height: 56px"
        filled
      >
        <option selected>MATIC</option>
        <option>USDC</option>
      </select>
    </div>
  </div>
</template>
