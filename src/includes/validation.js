import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required) //form required
    defineRule('min', min) // min lenght
    defineRule('max', max) // max lenght
    defineRule('alphaSpaces', alphaSpaces) // only letters and spaces
    defineRule('email', email) // valid email
    defineRule('minVal', minVal) // min num value
    defineRule('maxVal', maxVal) // max num value
    defineRule('confirmed', confirmed) // two fields matches
  }
}
