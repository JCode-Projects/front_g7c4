<template>
  <router-view/>
</template>

<style>
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  font-family: "Montserrat", sans-serif;
  font-size: 1.6rem;
}
p {
  color: #283845;
  font-size: 1.8rem;
}
.container {
  width: 95%;
  max-width: 120rem;
  margin: 0 auto;
}
.container h2 {
  margin-bottom: 3rem;
  font-weight: 500;
}
.container h2 span {
  color: #dc143c;
  font-weight: 700;
}
a {
  text-decoration: none;
}
img,
picture {
  max-width: 100%;
  display: block;
}
h1,
h2,
h3 {
  font-family: "Montserrat", sans-serif;
  margin: 2rem;
  font-weight: 300;
  text-align: center;
  word-break: break-word;
}
h1 {
  font-size: 3.8rem;
}
h2 {
  font-size: 3.4rem;
}
h3 {
  font-size: 3rem;
}
h4 {
  font-size: 2.6rem;
}

.text-center {
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #136ab1;
  color: #fff;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #0d4c8b;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background-color: #1d7e34;
}

.btn-error {
  background-color: #dc143c;
  color: #fff;
  transition: all 0.3s ease;
}

.btn-error:hover {
  background-color: #b91317;
}

.formulario {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(24, 24, 24, 0.9);
  padding: 2rem;
}

.formulario h2 {
  margin-bottom: 2rem;
  font-weight: 500;
  color: #fff;
}

.formulario form {
  max-width: 50rem;
  margin: 0 auto;
}

.formulario form .field {
  color: #fff;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
}

.formulario form .field label {
  font-weight: 500;
}

.formulario form .field input {
  border: 1px solid #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.6rem;
  width: 100%;
  background-color: transparent;
  outline: none;
  color: #fff;
}

.formulario form .field input:focus {
  border: 2px solid rgb(17, 94, 209);
}

.formulario form .field textarea {
  border: 1px solid #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.6rem;
  width: 100%;
  background-color: transparent;
  outline: none;
  color: #fff;
  height: 14rem;
}

.formulario form .field textarea:focus {
  border: 2px solid rgb(17, 94, 209);
}

.formulario form .field select {
  border: 1px solid #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.6rem;
  width: 100%;
  background-color: transparent;
  outline: none;
  color: #fff;
}

.formulario form .field select option {
  background-color: #ccc;
  color: #000;
}

.formulario form .field select:focus {
  border: 2px solid rgb(17, 94, 209);
}

.formulario form .actions-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.formulario.hidden {
  display: none;
}
</style>
