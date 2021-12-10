<template>
  <md-toolbar
    :md-elevation="1"
    class="md-accent">
    <span class="md-title">
      <slot></slot>
    </span>
  </md-toolbar>
</template>

<script>
export default {
  name: 'SectionTitle'
}
</script>
