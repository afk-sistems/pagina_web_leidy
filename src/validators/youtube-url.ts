import { helpers } from '@vuelidate/validators'

export const youtubeUrl = helpers.withMessage(
  'Debe ser una URL válida de YouTube',
  (value: string) => {
    if (!value) return true // permite vacío (usa required si quieres obligatorio)

    try {
      const url = new URL(value)

      const isYoutubeDomain =
        url.hostname.includes('youtube.com') ||
        url.hostname.includes('youtu.be')

      if (!isYoutubeDomain) return false

      // Caso youtube.com/watch?v=...
      if (url.hostname.includes('youtube.com')) {
        return !!url.searchParams.get('v')
      }

      // Caso youtu.be/VIDEO_ID
      if (url.hostname.includes('youtu.be')) {
        return url.pathname.length > 1
      }

      return false
    } catch {
      return false
    }
  }
)