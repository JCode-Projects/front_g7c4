<template>
  <DashBoard :titulo="'Producto | ' + $route.params.id"> 
    <h2>{{producto.title}}</h2>
    <div class="image">
      <img v-if="producto.image" :src="producto.image" alt="Imagen del producto">
      <img v-else src="../assets/mockup.jpg" alt="Imagen del producto">
    </div>
    <div class="description">
      <p><span>Descripción:</span> {{ producto.description }}</p>
      <p><span>Fecha Publicacion:</span> {{ producto.date }}</p>
    </div>
  </DashBoard>
</template>

<script>
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import DashBoard from '../components/DashBoard.vue';

export default {
  name: 'Producto',
  data: function () {
    return {
      producto: {}
    }
  },
  components: {
    DashBoard
  },
  methods: {
    async getProducto() {
      try {
        const { data } = await this.$apollo.query({
          query: gql`
            query GetPublicationById($getPublicationByIdId: Int!) {
              getPublicationById(id: $getPublicationByIdId) {
                id
                user_id
                category
                image
                description
                title
                date
              }
            }
          `,
          variables: {
            getPublicationByIdId: Number(this.$route.params.id)
          }
        });

        this.producto = data.getPublicationById;
      } catch (error) {
        Swal.fire({
          type: 'error',
          title: 'Ha ocurrido un error',
          text: 'No se pudo obtener el producto.',
          icon: 'error'
        });
      }
    },
  },
  mounted: async function () {
    await this.getProducto();
    console.log(this.producto);
  },
}
</script>

<style>
.image {
  width: 100%;
}

.image img {
  width: 100%;
  object-fit: cover;
  transition: all .3s ease;
}

.image img:hover {
  cursor: pointer;
  transform: scale(1.05) rotate(5deg);
  filter: brightness(1.2) grayscale(0.2) drop-shadow(0 0 3px #ccc);
  border-radius: 25%;
}

.description {
  padding: 1rem;
}

.description p {
  color: #fff;
}

.description p span {
  font-weight: bold;
}
</style>