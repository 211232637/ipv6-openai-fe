import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './core/store.js';


Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./views/authentication/AuthComponent.vue'),
    meta: {
      breadcrumb: 'Login',
      requiresAuth: false
    }
  },
  {
    path: '',
    component: () => import('./views/layouts/home/LayoutHome.vue'),
    meta: {
      hideBreadcrumb: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('./views/pages/home/Home.vue'),
        meta: {
          hideBreadcrumb: true
        }
      },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('./views/layouts/dashboard/LayoutDashboard.vue'),
    meta: {
      hideBreadcrumb: true,
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('./views/pages/dashboard/Dashboard.vue'),
        meta: {
          hideBreadcrumb: true,
          title: 'Dashboard'
          // requiresAuth: true
        }
      },
      {
        path: 'convertIPv4',
        name: 'convertIPv4',
        component: () => import('./views/pages/convertIP6/ConvertIP6.vue'),
        meta: {
          hideBreadcrumb: true,
          title: 'Net AI Copilot'
          // requiresAuth: true
        }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('./views/pages/convertIP6/ConvertIP6.vue'),
        meta: {
          hideBreadcrumb: true,
          title: 'Settings'
          // requiresAuth: true
        }
      },
      {
        path: '/pipeline',
        component: () => import('./views/pages/pipeline/BasePipeline.vue'),
        meta: {
          hideBreadcrumb: true,
          title: 'Pipeline'
          // requiresAuth: true
        },
        children: [
          {
            path: '',
            name: 'pipeline',
            component: () => import('./views/pages/pipeline/Pipeline.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
          {
            path: 'create',
            name: 'create-pipeline',
            component: () => import('./views/pages/pipeline/CreatePipeline.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
          {
            path: 'update/:id',
            name: 'update-pipeline',
            component: () => import('./views/pages/pipeline/CreatePipeline.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
        ]
      },
      {
        path: '/inventory',
        component: () => import('./views/pages/inventory/BaseInventory.vue'),
        meta: {
          hideBreadcrumb: true,
          title: 'Inventory'
          // requiresAuth: true
        },
        children: [
          {
            path: '',
            name: 'inventory',
            component: () => import('./views/pages/inventory/Inventory.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
          {
            path: 'create',
            name: 'create-inventory',
            component: () => import('./views/pages/inventory/CreateInventory.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
          {
            path: 'update/:id',
            name: 'update-inventory',
            component: () => import('./views/pages/inventory/CreateInventory.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
        ]
      },
      {
        path: '/playbook',
        component: () => import('./views/pages/playbook/BasePlaybook.vue'),
        meta: {
          hideBreadcrumb: true,
          title: 'Playbook'
          // requiresAuth: true
        },
        children: [
          {
            path: '',
            name: 'playbook',
            component: () => import('./views/pages/playbook/Playbook.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
          {
            path: 'create',
            name: 'create-playbook',
            component: () => import('./views/pages/playbook/CreatePlaybook.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
          {
            path: 'update/:id',
            name: 'update-playbook',
            component: () => import('./views/pages/playbook/CreatePlaybook.vue'),
            meta: {
              hideBreadcrumb: true,
            }
          },
        ]
      }
    ]
  },
  { path: "/403", name: 'restricted', component: () => import('./views/RestrictedPageComponent.vue') },
  { path: "/:catchAll(.*)", component: () => import('./views/NotFoundPageComponent.vue') },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRoles = to.meta.requiredRoles;
  if (requiresAuth) {
    if (!store.getters.isAuthenticated) {
      next('/auth');
    } else {
      // const userRoles = store.getters.getUser.roles.map(ro => ro.id);
      if (requiredRoles && Array.isArray(requiredRoles)) {
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        if (hasRequiredRole) {
          next();
        } else {
          next('/403');
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
