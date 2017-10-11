import Home from './Home'
import Play from './Play'
import playGame from './playGame'

export const routes = [
   {
      path: '/',
      component : Home,
   },
   {
      path: '/play',
      component : Play,
      children: [
         {
            path: '/:game/',
            name: 'game-list',
            component: playGame
         }
      ]
   }
]
