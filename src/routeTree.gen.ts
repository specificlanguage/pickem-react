// This file is auto-generated by TanStack Router

import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const SignupComponentImport = new FileRoute('/signup').createRoute()
const LoginComponentImport = new FileRoute('/login').createRoute()
const GamesComponentImport = new FileRoute('/games').createRoute()
const IndexComponentImport = new FileRoute('/').createRoute()
const UserOnboardingComponentImport = new FileRoute(
  '/user/onboarding',
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

const LoginComponentRoute = LoginComponentImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/login.component'),
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
    '/login': {
      preLoaderRoute: typeof LoginComponentImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      preLoaderRoute: typeof SignupComponentImport
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
  LoginComponentRoute,
  SignupComponentRoute,
  UserOnboardingComponentRoute,
])
