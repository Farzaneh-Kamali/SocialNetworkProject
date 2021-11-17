import * as Yup from 'yup';

// export const registerValidateSchema = Yup.object().shape({
//     email: Yup.string().email('لطفا ایمیل را با فرمت صحیح وارد فرمایید').max(255).required('ورود ایمیل اجباریست!'),
//     password: Yup.string().min(8).max(255).required('ورود زمط عبور اجباریست!')
// })

export const registerValidateSchema = () => {
    return Yup.object().shape({
        email: Yup.string().email('لطفا ایمیل را با فرمت صحیح وارد فرمایید').max(255).required('ورود ایمیل اجباریست!'),
        password: Yup.string().min(8).max(255).required('ورود رمز عبور اجباریست!')
    })
}