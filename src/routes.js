import Play from './pages/Play'
import playGame from './pages/playGame'

export default [
   {
      path : '/',
      component: Play
   },
   {
      path: '/_=_',
      redirect: '/'
   },
   {
      path: '/play/:game',
      component: playGame
   }
]
