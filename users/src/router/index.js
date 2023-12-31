import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import AboutView from '../views/AboutView.vue'
import EditView from '../views/EditView.vue'
import axios from 'axios'



function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios.post("http://localhost:8686/validate",{},req).then(res => {
      console.log(res);
      next();
    }).catch(err => {
      console.log(err.response);
      next("/");
    });
  }else{
    next("/login");
  }
}


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },

{
  path: '/register',
  name: 'register',
  // Rename the component key to something else
  componentImport: RegisterView,
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
},
{
  path: '/login',
  name: 'Login',
  // Rename the component key to something else
  componentImport: LoginView,
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
},
{
  path: '/admin/users',
  name: 'UsersView',
  component: UsersView,
  beforeEnter: AdminAuth
},
{
  path: '/admin/users/edit/:id',
  name: 'EditView',
  component: EditView,
  beforeEnter: AdminAuth
},
 {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    componentImport: AboutView,    
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

/*
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
*/

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router