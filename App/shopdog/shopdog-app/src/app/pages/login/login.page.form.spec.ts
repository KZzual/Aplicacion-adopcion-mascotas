import { FormBuilder } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {

    it('should create login form empty', () => {
        const LoginPageForm = new LoginPageForm(new FormBuilder());
        const form = loginPageForm.createForm();

        expect().not.toBeNull();
        expect(form.get(('email')).not.toBeNull();
    })


})