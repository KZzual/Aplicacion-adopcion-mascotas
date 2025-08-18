import { FormBuilder, FormGroup } from "@angular/forms";

export class LoginPageForm{

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
    }

    createForm() : FormGroup{
        return this.formBuilder.group({
            email: ['']
        });
    }
}