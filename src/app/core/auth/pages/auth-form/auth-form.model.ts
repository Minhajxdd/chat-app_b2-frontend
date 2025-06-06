import { FormControl } from '@angular/forms';

export interface authFormTemplateModel {
    fullname?: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    repassword?: FormControl<string | null>;
}

export interface DataModel {
    fullName?: string;
    email: string;
    password: string;
}


export interface RegisterResponseModel {
    status: string;
    message: string;
    data: {
        full_name: string;
        email: string;
        _id: string;
    };
    access_token: string;
}