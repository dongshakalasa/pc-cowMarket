// 引入路由组件
import Home from '@/view/Home'
import Search from '@/view/Search'
import Cart from '@/view/Cart'
import Detail from '@/view/Detail'
import Login from '@/view/Login'
import Register from '@/view/Register'
import Pay from '@/view/Pay'
import Paysuccess from '@/view/PaySuccess'
import Person from '@/view/Person'

// 子组件
import Code from '@/view/Login/Code'
import Account from '@/view/Login/Account'

export default [
    {
        path:'/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name:'search'
    },
    {
        path: '/cart',
        component: Cart,
        meta: { show: true }
    },
    {
        path: '/detail/:id?',
        component: Detail,
        meta: { show: true },
        name: "detail",
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false },
        children:[
            {
                path: 'code',
                component: Code
            }, {
                path: 'account',
                component: Account
            },
            {
                path: '/login',
                redirect: '/login/code'
            }
        ]
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: false }
    },
    {
        path: '/paysuccess',
        component: Paysuccess,
        meta: { show: false }
    },
    {
        path: '/person',
        component: Person,
        meta: { show: false }
    },
    {
        path: '/*',
        redirect: '/home',
    }
]