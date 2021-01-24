import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'Acceuil',
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('jwt') != null) {
        next({ name: 'MainPage' });
      } else {
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('jwt') != null) {
        next({ name: 'MainPage' });
      } else {
        next();
      }
    }
  },
  {
    path: '/main',
    name: 'MainPage',
    component: () => import('../views/MainPage.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('jwt') == null) {
        next({ name: 'Acceuil' });
      } else {
        next();
      }
    }
  },
  {
    path: '/ForumTexte',
    name: 'ForumTexte',
    component : () => import('../views/ForumTexte.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('jwt') == null) {
        next({ name: 'Acceuil' });
      } else {
        next();
      }
    }
  },
  {
    path: '/ForumGif',
    name: 'ForumGif',
    component : () => import('../views/ForumGif.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('jwt') == null) {
        next({ name: 'Acceuil' });
      } else {
        next();
      }
    }
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('jwt') == null) {
        next({ name: 'Acceuil' });
      } else {
        next();
      }
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
