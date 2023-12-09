<template>
  <div>
    <h2>Login</h2>
    <hr>
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error !== undefined">
          <div class="notification is-danger">{{error}}</div>
        </div>
        <p>E-mail</p>
        <input type="email" placeholder="email@email.com" class="input" v-model="email">
        <p>Senha</p>
        <input type="password" placeholder="******" class="input" v-model="senha">
        <hr>
        <button class="button is-success" @click="login">Logar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      senha: '',
      email: '',
      error: undefined
    }
  },
  methods: {
    login() {
       axios.post('http://localhost:8686/login', {
  password: this.senha,
  email: this.email,
}).then(res => {
  console.log('Response received:', res); // Adiciona este log para depurar a resposta
  localStorage.setItem('token', res.data.token);
  // Atualizar o estado do componente
  
  this.$router.push({ name: 'UsersView' });
}).catch((err) => {
  var msgErro = err.response.data.err;
  this.error = msgErro;
  console.error('Error occurred:', err); // Adiciona este log para depurar o erro
});
    }
  }
}
</script>

<style scoped>
  /* Estilos específicos do componente */
</style>
