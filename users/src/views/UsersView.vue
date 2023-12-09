<template>
  <div>
    <h1>Painel Adm</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Cargo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.nome }}</td>
          <td>{{ user.email }}</td>
          <td>{{ getProcessedRole(user.role) }}</td>
          <td>
            <router-link :to="{name: 'EditView', params:{id: user.id}}"><button class="button is-success">Editar</button></router-link>
            <button class="button is-danger" @click="showModalUser(user.id)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>

        <div :class="{modal: true, 'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
           

                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                            Você quer realmente deletar este usuário?
                            </p>
                          <!--  <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>-->
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <p>Confirme a exclusão do usuário?</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                           <!-- <a href="#" class="card-footer-item">Save</a> -->
                            <a href="#" class="card-footer-item"  @click="hideModal()">Cancelar</a>
                            <a href="#" class="card-footer-item" @click="deleteUser()">Delete</a>
                        </footer>
                    </div>

            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
        </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      showModal: false,
      deleteUserId: -1
    };
  },
  created() {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };

    axios.get("http://localhost:8686/user", req)
      .then(res => {
        console.log(res);
        this.users = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    console.log("OLÁ");
  },
  methods: {
    getProcessedRole(role) {
      if (role === 0) {
        return "Usuário comum!";
      } else if (role === 1) {
        return "Admin";
      }
      return "Outro papel";
    },

    hideModal(){
        this.showModal = false;
    },
    showModalUser(id){
        console.log("Id do user: "+ id);
        this.deleteUserId = id;
        this.showModal = true;
    },
    deleteUser(){

         var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.delete("http://localhost:8686/user/"+this.deleteUserId, req).then(res => {
            console.log(res);
            this.showModal = false;
            this.users = this.users.filter(u => u.id != this.deleteUserId);
        }).catch(err => {
            console.log(err);
            this.showModal = false;
        });
    }
  }
};
</script>

<style scoped>
</style>
