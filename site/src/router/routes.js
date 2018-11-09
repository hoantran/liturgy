import Error404Page from '@/pages/public/error/Error404Page.vue'
// import IndexPage from '@/pages/public/IndexPage.vue'
import AccountDashboardPage from '@/pages/account/AccountDashboardPage.vue'
import ProfileSettingsPage from '@/pages/account/ProfileSettingsPage.vue'
import LiturgyListPage from '@/pages/liturgy-list/LiturgyListPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import LiturgyPage from '@/pages/liturgy/LiturgyPage.vue'
import HuyPage from '@/pages/huy/HuyPage.vue'
import SleepingPage from '@/pages/sleeping/SleepingPage.vue'
import PopulatePage from '@/pages/populate/PopulatePage.vue'
import UpdateSongURLsPage from '@/pages/updatesongurls/UpdateSongURLsPage.vue'

const meta = {
  public: {
    section: 'public',
    layout: 'PublicLayout'
  },
  account: {
    section: 'account',
    layout: 'AccountLayout',
    auth: true // it's here only for eexample and really not handled in this sandbox
  },
  magic: {
    section: 'magic',
    layout: 'MagicLayout'
  },
  login: {
    section: 'login',
    layout: 'LoginLayout'
  },
  liturgy: {
    section: 'liturgy',
    layout: 'MagicLayout'
  }

}

/**
 * Application routes configuration
 * @type {Array.<object>}
 */
const routes = [
  {
    name: 'index',
    path: '/',
    component: LiturgyListPage,
    meta: {
      ...meta.magic,
      requiresAuth: true
    }
  },
  {
    name: 'liturgy',
    path: '/liturgy/:id',
    component: LiturgyPage,
    meta: {
      ...meta.magic,
      requiresAuth: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: {
      ...meta.login
    }
  },
  {
    name: 'updatesongurls',
    path: '/updatesongurls',
    component: UpdateSongURLsPage,
    meta: {
      ...meta.magic,
      requiresAuth: true
    }
  },
  {
    name: 'populate',
    path: '/populate',
    component: PopulatePage,
    meta: {
      ...meta.magic,
      requiresAuth: true
    }
  },
  {
    name: 'huy',
    path: '/huy',
    component: HuyPage,
    meta: {
      ...meta.magic,
      requiresAuth: true
    }
  },
  {
    name: 'sleeping',
    path: '/sleeping',
    component: SleepingPage,
    meta: {
      ...meta.magic,
      requiresAuth: true
    }
  },
  {
    name: 'account-index',
    path: '/account',
    component: AccountDashboardPage,
    meta: {
      ...meta.account
    }
  },
  {
    name: 'profile',
    path: '/account/profile',
    component: ProfileSettingsPage,
    meta: {
      ...meta.account
    }
  },
  {
    name: 'not-found',
    path: '*',
    component: Error404Page,
    meta: {
      ...meta.public
    }
  }
]

export default routes
