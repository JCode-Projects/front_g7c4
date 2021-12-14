<template>
  <div class="contenedor">
    <div class="modelo-contenedor">
      <div class="banner-contenedor">
        <p>MISIÓN TIC</p>
        <div class="img-contenedor">
          <img src="../assets/50426.jpg" alt="Imagen inicio de sesión." />
        </div>
        <div class="informacion-banner">
          <p>Un nuevo sistema.</p>
        </div>
      </div>
      <div class="formulario-contenedor">
        <div class="bienvenido">
          <h2>¡Buenos días!</h2>
          <h2>Inicia sesión para acceder a nuestro sistema.</h2>
        </div>
        <div class="informacion-formulario">
          <p>Dijite sus credenciales de acceso para continuar.</p>
        </div>
        <form action="">
          <div class="input-div primero">
            <div class="icono">
              <em class="fas fa-user"></em>
            </div>
            <div>
              <h5 class="Usuario">Usuario</h5>
              <input v-model="credentials.username" type="text" class="input" />
            </div>
          </div>
          <div class="input-div segundo">
            <div class="icono">
              <em class="fas fa-lock"></em>
            </div>
            <div>
              <h5 class="Contraseña">Contraseña</h5>
              <input v-model="credentials.password" type="password" class="input" />
            </div>
          </div>
          <router-link to="/registro">No tengo una cuenta</router-link>
          <input @click.prevent="processLogin" type="submit" value="Iniciar Sesión" class="btn" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import gql from 'graphql-tag';

export default {
  name: "Login",
  data: function() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      user: {}
    };
  },
  methods: {
    initFunction() {
      const inputs = document.querySelectorAll(".input");
      inputs.forEach(input => {
        input.addEventListener("focus", function() {
          let parent = this.parentNode.parentNode;
          parent.classList.add("focus");
        });

        input.addEventListener("blur", function() {
          let parent = this.parentNode.parentNode;
          if(this.value == ""){
            parent.classList.remove("focus")
          }
        });
      });
    },

    async processLogin() {
      try {
        const mutation = await this.$apollo.mutate({
          mutation: gql`
            mutation($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.credentials
          }
        });

        const token = mutation.data.logIn;
        this.processTokens(token);
      } catch(error) {
        Swal.fire({
          title: "Accedo Denegado",
          text: "No se pudo iniciar sesión, verifica las credenciales de acceso e intenta nuevamente.",
          icon: "error",
        });
      }
    },

    async processTokens(token) {
      localStorage.setItem("access", token.access);
      localStorage.setItem("refresh", token.refresh);
      localStorage.setItem("logged", true);
      localStorage.setItem("user", JSON.stringify(await this.getUserInfoSesion(token.access)));
      this.$router.push("/inicio");
    },

    async getUserInfoSesion(access) {
      let tokenData = this.parseJwt(access);

      try {
        const query = await this.$apollo.query({
          query: gql`
            query GetUserList {
              getUserList {
                id
                username
                name
                document
                email
                city
                address
                phone
                image
              }
            }
          `
        });

        let users = query.data.getUserList;
        return users.find(user => user.id == tokenData.user_id);
      } catch(error) {
        Swal.fire({
          title: "Error Inesperado",
          text: "No se pudo obtener la información de su perfil.",
          icon: "error",
        });
      }
    },

    parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },

    validateLogin() {
      if(localStorage.getItem("logged") == "true") {
        this.$router.push("/inicio");
        Swal.fire({
          title: "¡Bienvenido!",
          text: "¡Ya puedes comenzar a trabajar!",
          icon: "success",
        });
      }
    }
  },

  mounted() {
    this.validateLogin();
    this.initFunction();
  }
};
</script>

<style scoped>
body {
  background: #f3f4fd;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contenedor {
  margin: 40px;
}

.modelo-contenedor {
  border-radius: 20px;
  max-width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.25);
}

.banner-contenedor {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 40px;
  display: block;
  justify-content: center;
  background: linear-gradient(to right, #5a70e8, #3947de, 5a70e8);
  grid-column: 1/4;
}

img {
  max-width: 60vh;
  width: 100%;
}

.img-contenedor {
  display: flex;
  justify-content: center;
}

.banner-contenedor > p {
  color: #0066ff;
  text-transform: uppercase;
  font-weight: 900;
}

.informacion-banner {
  text-align: center;
  margin-top: 30px;
}

.informacion-banner p {
  color: #0066ff;
  font-weight: 300;
}

.formulario-contenedor {
  padding: 40px 50px 20px 50px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background: #373844;
  grid-column: 4/6;
}

.formulario-contenedor h2 {
  color: #ebe5e5;
  line-height: 1.4;
}

.bienvenido {
  margin-top: 10px;
}

.informacion-formulario {
  margin-top: 30px;
}

.informacion-formulario p {
  color: #ebe5e5;
  line-height: 1.6;
}

form {
  margin-top: 40px;
}

.input-div {
  position: relative;
  display: grid;
  grid-template-columns: 8% 92%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #f3f4fd;
}

.input-div.primero {
  margin-top: 20px;
}

.input-div.segundo {
  margin-bottom: 4px;
}

.icono {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icono em {
  color: #ebe5e5;
  transition: 0.3s;
}

.input-div > div {
  position: relative;
  height: 40px;
}

.input-div > div h5 {
  position: absolute;
  top: 0;
  left: 10px;
  transform: translateY(-50%);
  color: #999;
  font-size: 14px;
  font-weight: 300;
  transition: 0.3s;
}

.input-div > div > input {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  background: none;
  padding: 1.3rem 1.3rem;
  font-size: 1.6rem;
  color: #8481b3;
}

a {
  display: block;
  text-align: right;
  margin-top: 10px;
  text-decoration: none;
  color: #ad8e8e;
  font-size: .8em;
  transition: -3s;
  font-weight: 400;
}

a:hover {
  color: #0066ff;
}

.btn {
  margin-top: 40px;
  display: block;
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  color: #373844;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  transition: 0.5s;
  font-weight: bold;
}

.btn:hover {
  background: #c3c2da;
}

.input-div.focus .icono em {
  color: #0066ff;
}

.input-div.focus div h5 {
  top: -5px;
  font-size: 13px;
  margin: 0;
  position: relative;
}

.input-div::after,
.input-div::before {
  content: " ";
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #484266;
  transition: 0.4s;
}

.input-div::before {
  right: 50%;
}

.input-div::after {
  left: 50%;
}

.input-div.focus::after,
.input-div.focus::before {
  width: 50%;
}

@media screen and (max-width: 1080px) {
  .modelo-contenedor {
    grid-template-columns: 1fr;
  }

  .banner-contenedor {
    display: none;
  }

  .formulario-contenedor {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
  }
}

@media screen and (max-width: 768px) {
  .modelo-contenedor {
    max-width: 500px;
  }

  .formulario-contenedor {
    padding: 50px;
  }
}

@media screen and (max-width: 500px) {
  .modelo-contenedor {
    max-width: 350px;
  }

  .formulario-contenedor {
    padding: 30px;
  }
}
</style>
