<template>
  <md-button
      class="md-fab md-primary"
      @click="$emit('openForm', true)">
      <md-icon>add</md-icon>
    </md-button>
</template>

<script>
export default {
  name: 'AddButton',
  emits: ['openForm']
}
</script>
