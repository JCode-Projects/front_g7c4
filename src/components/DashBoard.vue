<template>
  <div class="dashboard-body">
    <div class="dashboard-content" :class="{ 'expand': expand }">
      <header class="dh-header">
        <div class="dh-icon">
          <img class="icon-menu" src="../assets/icons/Menu.svg" width="50" height="50" alt="Icono del menu toggle." loading="lazy" @click="toggle" />
          <h3 class="dh-title-h3">DashBoard</h3>
          <div class="search">
            <img src="../assets/icons/Search.svg" width="24" height="24" alt="Incono del buscador." loading="lazy" />
            <input type="search" name="search" id="search" placeholder="Buscar..." />
          </div>
        </div>
        <div class="dh-user">
          <div class="user">
            <p>Camilo</p>
            <img src="../assets/icons/User.svg" width="45" height="45" alt="Imagen del usuario." loading="lazy" />
          </div>
        </div>
      </header>
      <!-- NavBar Dashboard -->
      <main class="dh-content">
        <div class="">
          <slot></slot>
        </div>
      </main>
      <!-- Content Dashboard -->
      <aside class="dh-sidebar">
        <div class="links">
          <router-link to="/inicio" class="option-link">
            <img src="../assets/icons/Add.svg" width="50" height="50" alt="Inicio del dashboard." loading="lazy" />
            <p>Inicio</p>
          </router-link>
          <router-link to="/productos" class="option-link">
            <img src="../assets/icons/Add.svg" width="50" height="50" alt="Inicio del dashboard." loading="lazy" />
            <p>Productos</p>
          </router-link>
        </div>
        <div class="config">
          <a href="/admin/configuracion" class="option-link">
            <img src="../assets/icons/Settings.svg" width="50" height="50" alt="Visualizador de ventas." loading="lazy" />
            <p>Configuración</p>
          </a>
        </div>
      </aside>
      <!-- Sidebar Dashboard -->
    </div>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  data: function() {
    return {
      expand: localStorage.getItem("expand") ? localStorage.getItem("expand") == 't' ? true : false : false
    };
  },
  methods: {
    toggle() {
      this.expand = !this.expand;
      localStorage.setItem("expand", this.expand ? "t" : "f");
    },
  },
  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
  created: function() {
    document.title = this.titulo;
  },
};
</script>

<style>
.dh-title-h3 {
  color: #ffffff;
  font-weight: 600;
}
.dashboard-body {
  overflow: hidden;
}
.dashboard-content {
  background: linear-gradient(
    139deg,
    rgba(61, 83, 103, 1) 14%,
    rgba(49, 80, 107, 1) 54%,
    rgba(24, 85, 139, 1) 94%
  );
  background-repeat: no-repeat;
  padding: 2rem;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  column-gap: 1rem;
  row-gap: 2rem;
  height: 100vh;
  max-height: 100vh;
}
.dashboard-content.expand .dh-content {
  grid-column: 2 / 3;
  animation: show-content 0.5s backwards;
}
.dashboard-content.expand .dh-sidebar {
  transform: translateX(0);
  animation: show-sidebar 0.5s backwards;
}
@media (min-width: 768px) {
  .dashboard-content.expand .dh-sidebar {
    width: 24rem;
  }
}
@media (min-width: 768px) {
  .dashboard-content.expand .option-link.active {
    background-color: #008551;
  }
}
@media (min-width: 768px) {
  .dashboard-content.expand .option-link {
    border-radius: 1rem;
  }
  .dashboard-content.expand .option-link:hover {
    background-color: #008551;
  }
}
.dashboard-content.expand .option-link img img {
  background-color: #ff6486;
}
@media (min-width: 768px) {
  .dashboard-content.expand .option-link img {
    background-color: unset !important;
  }
}
.dh-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 1 / 3;
  height: min-content;
}
.dh-header .dh-icon {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  column-gap: 2rem;
  align-items: center;
}
.dh-header .dh-icon .icon-menu {
  filter: invert(100%);
  width: 5rem;
  border-radius: 50%;
  padding: 0.5rem;
  transition: background-color 0.5s ease;
}
.dh-header .dh-icon .icon-menu:hover {
  cursor: pointer;
  background-color: #ff6486;
}
.dh-header .dh-icon .icon-admin {
  width: 16.4rem;
}
.dh-header .search {
  position: relative;
  display: none;
}
@media (min-width: 768px) {
  .dh-header .search {
    display: block;
  }
}
.dh-header .search > img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1rem;
  margin: auto 0;
  filter: invert(80%);
}
.dh-header .search > input[type="search"] {
  padding: 1rem 1rem 1rem 4rem;
  background-color: rgba(0, 158, 96, 0.1);
  color: #fff;
  border: 2px solid #283845;
  border-radius: 2rem;
  outline: none;
  font-weight: 300;
}
.dh-header .search > input[type="search"]::placeholder {
  color: #fff;
}
.dh-header .dh-user {
  display: none;
}
@media (min-width: 480px) {
  .dh-header .dh-user {
    display: block;
  }
}
.dh-header .dh-user .user {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  column-gap: 1rem;
}
.dh-header .dh-user .user p {
  margin: 0;
  color: #fff;
  font-weight: 500;
  text-transform: capitalize;
  transition: color 0.5s ease;
  display: none;
}
@media (min-width: 768px) {
  .dh-header .dh-user .user p {
    display: block;
  }
}
.dh-header .dh-user .user p:hover {
  cursor: pointer;
  color: #eb1f48;
}
.dh-header .dh-user .user img {
  width: 4.5rem;
  border: 1px solid #283845;
  border-radius: 50%;
}
.dh-header .dh-user .user img:hover {
  cursor: pointer;
}
.dh-content {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  background-color: rgba(40, 56, 69, 0.8);
  border-radius: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 1.5rem 2rem 1.5rem;
  color: #fff;
  animation: show-content 0.5s backwards;
}
@media (min-width: 768px) {
  .dh-content {
    grid-column: 2 / 3;
  }
}
.dh-content::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 0;
}
.dh-sidebar {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  overflow-x: hidden;
  transform: translateX(-20rem);
  width: 6rem;
  transition: transform 0.5s ease, width 0.5s ease;
  scrollbar-width: thin;
}
@media (min-width: 768px) {
  .dh-sidebar {
    animation: show-sidebar 0.5s backwards;
    transform: translateX(0);
  }
}
.dh-sidebar::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 0.5rem;
}
.dh-sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(40, 56, 69, 0.4);
  border-radius: 2rem;
  transition: 0.3s ease-in;
}
.dh-sidebar .option-link {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
  transition: background-color 0.5s ease;
}
@media (min-width: 768px) {
  .dh-sidebar .option-link.active {
    border-radius: 1rem;
    background-color: unset;
  }
}
.dh-sidebar .option-link.active img {
  background-color: #ff6486;
}
.dh-sidebar .option-link img {
  filter: invert(100%);
  width: 5rem;
  border-radius: 50%;
  padding: 0.5rem;
  transition: background-color 0.5s ease;
}
.dh-sidebar .option-link img:hover {
  cursor: pointer;
  background-color: #ff6486;
}
.dh-sidebar .option-link p {
  margin: 0;
  color: #fff;
  font-weight: 300;
}
.empty {
  padding: 0 1rem;
  grid-column: 1 / 2;
  overflow: hidden;
  text-align: center;
}
@media (min-width: 768px) {
  .empty {
    grid-column: 1 / 3;
  }
}
@media (min-width: 1024px) {
  .empty {
    grid-column: 2 / 3;
  }
}
.empty img {
  display: inline-block;
}
.empty h2 {
  word-wrap: break-word;
  font-size: 2rem;
}
@media (min-width: 1024px) {
  .empty h2 {
    font-size: 2.5rem;
  }
}
@keyframes show-content {
  0% {
    transform: translateX(200rem);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes show-sidebar {
  0% {
    transform: translateX(-200rem);
  }
  100% {
    transform: translateX(0);
  }
}
.modal-config-user {
  position: fixed;
  top: 9rem;
  right: -20rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  transition: right 0.5s ease;
}
.modal-config-user.show {
  right: 2rem;
}
.modal-config-user p {
  color: #283845;
  margin: 0 0 1rem 0;
}
</style>
