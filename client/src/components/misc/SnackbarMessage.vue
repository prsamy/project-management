<template>
  <md-snackbar
      md-persistent
      md-position="left"
      :md-duration="5000"
      :md-active.sync="$store.state.showSnackbar">
      <span>{{$store.state.snackbarMessage}}</span>
    </md-snackbar>
</template>

<script>
export default {
  name: 'SnackbarMessage'
}
</script>
