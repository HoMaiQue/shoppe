import { defaultNS, defaultNS, resources } from './../i18n/i18n'
import 'i18next'

declare module 'i18next' {
  interface CustomeTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources['vi']
  }
}
