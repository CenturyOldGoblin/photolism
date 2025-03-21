<script setup lang="ts">
import { NMessageProvider } from 'naive-ui';
import potato_clock from './components/potato_clock.vue';
import misson_list from './components/misson_list.vue';
import misson_l from './components/misson_l.vue';
import transi_test from './components/transi_test.vue';
import NintendoSwitchTransition from './components/NintendoSwitchTransition.vue';
import { ref } from 'vue'
import { defineExpose } from 'vue'
</script>

<template>
<n-message-provider>
  <NintendoSwitchTransition
    ref="transitionRef"
    class="full-screen"
    :slotCount="2"
  >
    <template #slot1>
      <misson_l />
    </template>
    <template #slot2>
      <potato_clock  />
    </template>
  <!-- <potato_clock  /> -->
  <!-- <misson_list /> -->
   <!-- <misson_l /> -->
</NintendoSwitchTransition>
</n-message-provider>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.full-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
