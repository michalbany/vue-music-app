import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import cs from '@/locales/cs.json'

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    cs
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        
      }
    },
    cs: {
      currency: {
        style: 'currency',
        currency: 'CZK',

      }
    }
  }
})
