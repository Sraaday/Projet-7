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
  {
    path: '/listeUtilisateur',
    name: 'ListUtilisateur',
    component: () => import('../views/ListeUtilisateurs.vue'),
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('jwt') == null) {
        next({ name: 'Acceuil' });
      } else {
        const token = sessionStorage.getItem('jwt');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const tokenParsed = JSON.parse(jsonPayload);
        if (!tokenParsed.isAdmin) {
          next({ name: 'MainPage' });
        } else {
          next();
        }
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
