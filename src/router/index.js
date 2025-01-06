import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { getUserRole } from '@/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/galery',
      name: 'galery',
      component: () => import('../views/GaleryView.vue'),
    },
    {
      path: '/instructors',
      name: 'instructors',
      component: () => import('../views/InstructorsView.vue'),
      meta: {
        requiresAuth: 'editor',
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: {
        requiresAuth: 'admin',
      },
    },
  ],
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      user => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()
  const userRole = await getUserRole(user.uid)
  if (to.matched.some(record => record.meta.requiresAuth === 'admin')) {
    // User is logged in\
    if (userRole === 'admin') {
      console.log('User is role ' + userRole)
      next()
    } else {
      alert('You need to be an admin to access')
      next({ name: 'home' })
    }
  } else if (to.matched.some(record => record.meta.requiresAuth === 'editor')) {
    if (userRole === 'editor' || userRole === 'admin') {
      console.log('User is role ' + userRole)
      next()
    } else {
      alert('You need to be an instructor to access')
      next({ name: 'home' })
    }
  } else if (to.matched.some(record => record.meta.requiresAuth === 'viewer')) {
    if (user) {
      console.log('User is role ' + userRole)
      next()
    } else {
      alert('Log in to access')
      next({ name: 'home' })
    }
  } else {
    next()
  }
})
export default router
