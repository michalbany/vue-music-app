import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from "vee-validate";
import { required, min, max, alpha_spaces as alphaSpaces } from "@vee-validate/rules";


export default {
    install(app) {
        app.component("VeeForm", VeeForm);
        app.component("VeeField", VeeField);
        app.component("ErrorMessage", ErrorMessage)
    
        defineRule('required', required); //form required
        defineRule('min', min); // min lenght
        defineRule('max', max); // max lenght
        defineRule('alphaSpaces', alphaSpaces) // only letters and spaces
    },
    
}