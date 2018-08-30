import Error404Page from '@/pages/public/error/Error404Page.vue'
// import IndexPage from '@/pages/public/IndexPage.vue'
import AccountDashboardPage from '@/pages/account/AccountDashboardPage.vue'
import ProfileSettingsPage from '@/pages/account/ProfileSettingsPage.vue'
import LiturgyListPage from '@/pages/liturgy-list/LiturgyListPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import LiturgyPage from '@/pages/liturgy/LiturgyPage.vue'

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
      ...meta.magic
    }
  },
  {
    name: 'liturgy',
    path: '/liturgy/:id',
    component: LiturgyPage,
    meta: {
      ...meta.magic
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
