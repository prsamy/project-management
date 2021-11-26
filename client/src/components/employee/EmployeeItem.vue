<template>
  <div>
      <md-list-item>
        <md-avatar>
          <img src="" alt="People">
        </md-avatar>

        <div class="md-list-item-text">
          <span>{{employee.name}}</span>
          <p>{{employee.id}}</p>
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
