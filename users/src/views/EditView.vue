<template>
  <div>
    <h2>Edição de Usuário!</h2>
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
       
        <hr>
        <button class="button is-success" @click="update">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  created(){

      var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
      }

    axios.get("http://localhost:8686/user/" + this.$route.params.id, req).then(res => {
      console.log(res);

      this.nome = res.data.nome;
      this.email = res.data.email;
      this.id = res.data.id;

    }).catch(err => {
      console.log(err.response);
       this.$router.push({ name: 'UsersView' });
    })

  },

  data() {
    return {
      nome: '',
      email: '',
      id: -1,
      error: undefined
    };
  },
  methods: {
    update() {

    var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
    }


  axios.put("http://localhost:8686/user", {
  nome: this.nome,
  email: this.email,
  id: this.id
}, req).then(() => {
  // Atualizar o estado do componente
  this.$router.push({ name: 'UsersView' });
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
