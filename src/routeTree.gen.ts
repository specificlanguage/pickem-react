// This file is auto-generated by TanStack Router

import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const SignupComponentImport = new FileRoute('/signup').createRoute()
const SettingsComponentImport = new FileRoute('/settings').createRoute()
const SessionComponentImport = new FileRoute('/session').createRoute()
const LoginComponentImport = new FileRoute('/login').createRoute()
const LeaderboardComponentImport = new FileRoute('/leaderboard').createRoute()
const GamesComponentImport = new FileRoute('/games').createRoute()
const IndexComponentImport = new FileRoute('/').createRoute()
const UserOnboardingComponentImport = new FileRoute(
  '/user/onboarding',
).createRoute()
const ProfileUsernameComponentImport = new FileRoute(
  '/profile/$username',
).createRoute()

// Create/Update Routes

const SignupComponentRoute = SignupComponentImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/signup.component'),
    'component',
  ),
})

const SettingsComponentRoute = SettingsComponentImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/settings.component'),
    'component',
  ),
})

const SessionComponentRoute = SessionComponentImport.update({
  path: '/session',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/session.component'),
    'component',
  ),
})

const LoginComponentRoute = LoginComponentImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/login.component'),
    'component',
  ),
})

const LeaderboardComponentRoute = LeaderboardComponentImport.update({
  path: '/leaderboard',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/leaderboard.component'),
    'component',
  ),
})

const GamesComponentRoute = GamesComponentImport.update({
  path: '/games',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/games.component'),
    'component',
  ),
})

const IndexComponentRoute = IndexComponentImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/index.component'),
    'component',
  ),
})

const UserOnboardingComponentRoute = UserOnboardingComponentImport.update({
  path: '/user/onboarding',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/user/onboarding.component'),
    'component',
  ),
})

const ProfileUsernameComponentRoute = ProfileUsernameComponentImport.update({
  path: '/profile/$username',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/profile/$username.component'),
    'component',
  ),
})

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexComponentImport
      parentRoute: typeof rootRoute
    }
    '/games': {
      preLoaderRoute: typeof GamesComponentImport
      parentRoute: typeof rootRoute
    }
    '/leaderboard': {
      preLoaderRoute: typeof LeaderboardComponentImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginComponentImport
      parentRoute: typeof rootRoute
    }
    '/session': {
      preLoaderRoute: typeof SessionComponentImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      preLoaderRoute: typeof SettingsComponentImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      preLoaderRoute: typeof SignupComponentImport
      parentRoute: typeof rootRoute
    }
    '/profile/$username': {
      preLoaderRoute: typeof ProfileUsernameComponentImport
      parentRoute: typeof rootRoute
    }
    '/user/onboarding': {
      preLoaderRoute: typeof UserOnboardingComponentImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexComponentRoute,
  GamesComponentRoute,
  LeaderboardComponentRoute,
  LoginComponentRoute,
  SessionComponentRoute,
  SettingsComponentRoute,
  SignupComponentRoute,
  ProfileUsernameComponentRoute,
  UserOnboardingComponentRoute,
])
