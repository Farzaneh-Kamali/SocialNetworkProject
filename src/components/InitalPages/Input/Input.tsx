import React, {useState} from "react";
// import React from "react";
import './Input.style.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faLock, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {ErrorMessage, Field} from 'formik';

interface StringInputType {
    name: string;
    placeholder: string;
    dir: string;
}

export const StringInput = (props:StringInputType) => {
    return (
        <div className={"string_input"}>

            <Field type="text" dir={props.dir}  placeholder={props.placeholder}
                   id={props.name} name={props.name} />

        </div>
    );
};


export const PictureInput = (props:{name:string}) => {

    return (
        <div className={"file_input"}>

            <Field
                type={"file"} name={"user_picture"}
            />

        </div>
    );
};
const ChoiceYearInput = (props:{name:string;}) => {
    const years = []
    for (let year = 1340; year < 1400; year++) {
        years.push(<option value={ year }>{ year }</option>)
    }
    return (
        <div className={"choice_input input_time_year"}>
            <Field as="select" name={props.name} className={"field_choice_input"}>
                { years }
            </Field>
        </div>
    );
};

const ChoiceMonthInput = (props:{name:string;}) => {
    return (
        <div className={"choice_input input_time_month"}>
            <Field as="select"  name={props.name} className={"field_choice_input"}>
                <option value="فروردین">فروردین</option>
                <option value="اردیبهشت">اردیبهشت</option>
                <option value="خرداد">خرداد</option>
                <option value="تیر">تیر</option>
                <option value="مرداد">مرداد</option>
                <option value="شهریور">شهریور</option>
                <option value="دی">دی</option>
                <option value="بهمن">بهمن</option>
                <option value="اسفند">اسفند</option>
            </Field>
        </div>
    );
};

export const ChoiceTimeInput = (props:{name:string; id:string;}) => {
    return (
        <div className={"time_input"}>
            <span className={"input_time_title"}>{props.name}</span>
            <ChoiceYearInput name={props.id + "Year"} />
            <ChoiceMonthInput name={props.id + "Month"} />
        </div>


    )
}
export const Input = (labelProp: { input_holder: string }) => {
    return (
        <div>
            <label htmlFor="" className="text-sm font-bold text-grey-600 block">{labelProp.input_holder}</label>
            <input type="text" className="w-full p-2 border border-grey-300 rounded mt-1"/>
        </div>
    );
};


export const EmailInput = () => {
    return (
        <div className={"email_input"}>
            <i className="mx-2">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            </i>

            <Field type="text" dir={"ltr"} placeholder={"Email"}
                   id={"email"} name={"email"}/>

        </div>
    );
};

const usePasswordToggle = () => {

    const [visible, setVisibility] = useState(false);
    const Icon = (
        <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={() => setVisibility(visible => !visible)}></FontAwesomeIcon>

    )
    const InputType = visible ? "text" : "password";
    return [InputType, Icon]

};
export const PassInput = () => {

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    return (
        <div className={"password_input"}>

            <i className="mx-2 lockIcon">
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
            </i>

            <Field type={PasswordInputType} dir={"ltr"}  placeholder={"Password"} id={"password"} name={"password"}/>

            <i className="eyeIcon">
                {ToggleIcon}
            </i>


        </div>
    );
};

export const CheckBoxInput = () => {

    return (
        <div className={"checkbox_input"}>

            <label htmlFor={"is_vendor"}>
                <Field type="checkbox"  id={"is_vendor"} name={"is_vendor"} />
                <span>اکانت شرکتی</span>
            </label>

        </div>
    );
};