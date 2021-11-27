<template>
  <div>
    <md-list-item>
      <div class="md-list-item-text">
        <div class="md-title">{{employee.name}}</div>
        <div>{{employee.id}}</div>
      </div>
    </md-list-item>
  </div>
</template>

<script>

export default {
  props: ['employee']
}
</script>

<style>

</style>
