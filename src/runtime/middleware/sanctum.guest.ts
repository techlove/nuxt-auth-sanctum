import { useSanctumAuth } from '../composables/useSanctumAuth'
import { useSanctumConfig } from '../composables/useSanctumConfig'
import { defineNuxtRouteMiddleware, navigateTo, createError } from '#app'

export default defineNuxtRouteMiddleware(() => {
  const options = useSanctumConfig()
  const { isAuthenticated } = useSanctumAuth()

  if (isAuthenticated.value === false) {
    return
  }

  const endpoint = options.redirect.onGuestOnly

  if (endpoint === false) {
    throw createError({ statusCode: 403 })
  }

  return navigateTo(endpoint, { replace: true })
})
