export default [{
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        redirect: '/home/well'
    },
    {
        path: '/home/well',
        component: () => import('@/views/home'),
        children: [{
            path: '/',
            name: 'well',
            component: () => import('@/views/home/well'),
            
        }]
    },
    {
        path: '/home/product',
        component: () => import('@/views/home'),
        children: [{
            path: '/',
            name: 'product',
            component: () => import('@/views/home/product'),
            
        }]
    },
    {
        path: '/home/category',
        component: () => import('@/views/home'),
        children: [{
            path: '/',
            name: 'category',
            component: () => import('@/views/home/category'),
            
        }]
    },
    {
        path: '/home/order',
        component: () => import('@/views/home'),
        children: [{
            path: '/',
            name: 'order',
            component: () => import('@/views/home/order'),
            
        }]
    }
]