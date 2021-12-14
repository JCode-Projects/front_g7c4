<template>
  <DashBoard titulo="Productos"> 
      <h2>Productos</h2>
      <div class="actions">
        <h4>{{this.publications.length}} Publicaciones</h4>
        <button type="button" class="btn btn-success" @click="showTogleForm">Agregar Producto</button>
      </div>
      <div class="publications-list">
        <div class="publication" v-for="(publication, key) in publications" :key="key">
            <div class="image">
              <img v-if="publication.image" :src="publication.image" alt="Imagen de la publicación">
              <img v-else src="../assets/mockup.jpg" alt="Imagen de la publicación">
            </div>
            <div class="content">
              <h3>{{ publication.title }}</h3>
              <p>{{ publication.description }}</p>
              <div class="text-center">
                <router-link class="btn btn-primary" :to="`/publicacion/${publication.id}`">Ver más</router-link>
              </div>
            </div>   
        </div>
      </div>
  </DashBoard>
  <div class="formulario" :class="{ 'hidden': hiddenForm }">
    <h2>Agregar Producto</h2>
    <form action="/" @submit.prevent="insertProduct">
      <div class="field">
        <label>Titulo:</label>
        <input type="text" v-model="userInput.title" placeholder="Ejm. Verduras">
      </div>
      <div class="field">
        <label>Descripción:</label>
        <textarea v-model="userInput.description" placeholder="Ejm. Las mejores verduras del país."></textarea>
      </div>
      <div class="field">
        <label>Categoría:</label>
        <select v-model="userInput.category" id="">
          <option value="" selected disabled>Seleccione una opción</option>
          <option v-for="(categorie, key) in categories" :key="key" :value="categorie.id">{{categorie.name}}</option>
        </select>
      </div>
      <div class="actions-buttons">
        <button type="button" class="btn btn-error" @click="showTogleForm">Cancelar</button>
        <button type="submit" class="btn btn-success">Agregar</button>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Swal from 'sweetalert2'

import DashBoard from '../components/DashBoard.vue';

export default {
  name: 'Productos',
  components: {
    DashBoard
  },
  data: function() {
    return {
      publications: [],
      userInput: {
        title: '',
        description: '',
        category: '',
        user_id: JSON.parse(localStorage.getItem('user')).id
      },
      categories: [],
      hiddenForm: true
    }
  },
  methods: {
    getPublications: async function() {
      try {
        const query = await this.$apollo.query({
          query: gql`
            query GetPublicationList {
              getPublicationList {
                id
                title
                description
                date
                image
                category
                user_id
              }
            }
          `
        });
      
        this.publications = query.data.getPublicationList;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'No se pudo obtener la lista de publicaciones.'
        });
      }
    },

    getCategories: async function() {
      try {
        const query = await this.$apollo.query({
          query: gql`
            query getCategoryList {
              getCategoryList {
                id
                name
                description
                image
                user_id
              }
            }
          `
        });
      
        this.categories = query.data.getCategoryList;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'No se pudo obtener la lista de getCategoryList.'
        });
      }
    },

    showTogleForm: function() {
      this.hiddenForm = !this.hiddenForm;
    },

    insertProduct: async function() {
      try {
        const mutate = await this.$apollo.mutate({
          mutation: gql`
            mutation Mutation($userInput: PublicationInput) {
              createPublication(userInput: $userInput) {
                id
                title
                description
                date
                image
                category
                user_id
              }
            }
          `,
          variables: {
            userInput: this.userInput
          }
        });

        if (mutate.data.createPublication) {
          Swal.fire({
            icon: 'success',
            title: 'Publicación creada',
            text: 'La publicación se ha creado correctamente.'
          });
          
          this.publications = [...this.publications, mutate.data.createPublication];

          this.showTogleForm();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'No se pudo insertar el producto, recuerda llenar todo el formulario.'
        });
      }
    }
  },
  created: async function() {
    await this.getPublications();
    await this.getCategories();
  },
}
</script>

<style>
.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
}

.actions h4 {
  margin: 0;
}

.publications-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.publication {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #e1e1e1;
}

.publication .image {
  height: 200px;
  overflow: hidden;
}

.publication .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.publication .content {
  padding: 0 1rem 1.5rem 1rem;
}

.publication .content h3 {
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.publication .content p {
  color: #e1e1e1;
  text-align: center;
  margin-top: 0.2rem;
}
</style>