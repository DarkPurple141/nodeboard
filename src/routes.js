import Play from './pages/Play'
import playGame from './pages/playGame'
import Home from './pages/Home'
import About from './pages/About'
import Proto from './pages/Proto'
import ErrorPage from './pages/Error'
import VueRouter from 'vue-router'
import HTTP from './http-config'

function guardRoute (to, from, next) {
  HTTP.get('user')
  .then(response => {
     if (response.status == 209) {
        next(false)
     } else {
        next()
     }
  })
  .catch(err => {
     next(`/error/?code=${err}`)
     console.error(err)
  })
}

const routes = [
   {
      path: '/',
      component: Home
   },
   {
      path: '/about',
      component: About
   },
   {
      path: '/proto',
      component: Proto
   },
   {
      path: '/error',
      component: ErrorPage
   },
   {
      path : '/play/',
      component: Play,
      meta: { needGuard: true }
   },
   {
      path: '/_=_',
      redirect: '/play/'
   },
   {
      path: '/play/:game/',
      component: playGame,
      meta: { needGuard: true }
   },
   {
      path: '/*/',
      redirect: '/'
   }
]

const router = new VueRouter({
   routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.needGuard)) {
    guardRoute(to, from, next)
  } else {
    next()
  }
})

export { router as default }
