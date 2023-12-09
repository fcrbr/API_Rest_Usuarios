<template>
  <div>
    <h2>Registro de Usuário!</h2>
    <hr>
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error !== undefined">
          <div class="notification is-danger">{{error}}</div>
        </div>
        <p>Nome</p>
        <input type="text" placeholder="Nome do usuário" class="input" v-model="nome">
        <p>E-mail</p>
        <input type="email" placeholder="email@email.com" class="input" v-model="email">
        <p>Senha</p>
        <input type="password" placeholder="******" class="input" v-model="senha">
        <hr>
        <button class="button is-success" @click="register">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nome: '',
      senha: '',
      email: '',
      error: undefined
    };
  },
  methods: {
    register() {
  axios.post('http://localhost:8686/user', {
  nome: this.nome,
  password: this.senha,
  email: this.email,
}).then(() => {
  // Atualizar o estado do componente
  this.$router.push({ name: 'home' });
}).catch((err) => {
  if (err.response && err.response.data && err.response.data.err) {
    var msgErro = err.response.data.err;
    this.error = msgErro;
  } else {
    this.error = "Erro desconhecido"; // Defina uma mensagem padrão para erros não esperados
  }
}); 

    },
  },
};
</script>

<style scoped>
  /* Estilos específicos do componente */
</style>
