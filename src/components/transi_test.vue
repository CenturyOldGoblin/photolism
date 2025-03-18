<template>
  <div class="app">
    <button @click="triggerTransition" class="trigger-button">
      Trigger Transition
    </button>

    <NintendoSwitchTransition :switch2="cur_page">
      <template #first>
        <div class="page page-1">
          <h1>First Page</h1>
          <p>This is the content of the first page</p>
        </div>
      </template>

      <template #second>
        <div class="page page-2">
          <h1>Second Page</h1>
          <p>This is the content of the second page</p>
        </div>
      </template>
    </NintendoSwitchTransition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NintendoSwitchTransition from './NintendoSwitchTransition.vue';
const cur_page = ref(1);
const isTransitioning = ref(false);

function triggerTransition() {
  cur_page.value = cur_page.value === 1 ? 2 : 1;

}
</script>

<style>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.trigger-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #FF6600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.page-1 {
  background-color: #f0f0f0;
}

.page-2 {
  background-color: #e0e0e0;
}
</style>
