import { InputHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const FormInput: FC<FormInputProps> = ({ name, label, className, ...props }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mx-2">
                {label}
            </label>
            <input className={twMerge("w-40 sm:w-72 h-10 border mx-2 px-2 text-sm border-gray-400 hover:border-gray-600 rounded-md mb-2", className)} {...props} id={name}></input>
        </div>
    );
};

export default FormInput;
