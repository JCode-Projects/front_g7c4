<template>
  <div class="container-logout">
    <h2>Cerrando Sesión</h2>
    <img class="text-center" src="../assets/icons/undraw_edit_photo_re_ton4.svg" alt="Cerrar Sesión">
  </div>
</template>

<script>

export default {
  name: 'Logout',
  methods: {
    logout() {
      setTimeout(() => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('logged');

        this.$router.push('/login');
      }, 800);
    }
  },
  mounted() {
    this.logout();
  }
}
</script>

<style>
.container-logout {
  width: 60%;
  margin: 0 auto;
}
</style>