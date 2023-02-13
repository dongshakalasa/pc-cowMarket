export default [
    {
        path:'/roll',
        component:()=>import("@/views/System/Roll")
    },
    {
        path: '/platform',
        component: () => import("@/views/System/Platform")
    },
    {
        path: '/brand',
        component: () => import("@/views/System/Brand")
    },
    {
        path: '/announcement',
        component: () => import("@/views/System/Announcement")
    },
    {
        path: '/information',
        component: () => import("@/views/System/Information")
    },
    {
        path: '/message',
        component: () => import("@/views/System/Message")
    },
    {
        path: '/user',
        component: () => import("@/views/User")
    },
    {
        path: '/product',
        component: () => import("@/views/Business/Product")
    },
    {
        path: '/order',
        component: () => import("@/views/Business/Order")
    },
    {
        path: '/orderRate',
        component: () => import("@/views/Business/OrderRate")
    }
]