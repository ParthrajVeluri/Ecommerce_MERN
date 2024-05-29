import Button from "../components/Button";
import FormInput from "../components/FormInput";
import nexusLogo from "../images/nexus-logo.png";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";

const Registration = () => {
    const [pass, setPass] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center h-screen">
            <img src={nexusLogo} alt="logo" className="w-96 ml-auto mr-auto" />
            <div className="border-2 border-nexus rounded-md p-3 text-slate-700">
                <h3 className="text-4xl text-center font-bold text-nexus">Create your account</h3>
                <div className="flex justify-center">
                    <form className="flex flex-col align-center justify-center">
                        <div className="flex flex-row">
                            <FormInput name="FirstName" label="First Name" placeholder="John"></FormInput>
                            <FormInput name="LastName" label="Last Name" placeholder="Doe"></FormInput>
                        </div>
                        <div className="flex flex-row">
                            <FormInput name="Address1" label="Country" placeholder="Country"></FormInput>
                            <FormInput name="Address2" label="City" placeholder="City"></FormInput>
                        </div>
                        <FormInput name="Postal" label="Postal Code" placeholder="ABC 123"></FormInput>
                        <FormInput name="Phone" label="Phone" placeholder="Phone Number"></FormInput>
                        <FormInput name="Email" label="Email" placeholder="JohnDoe@example.com"></FormInput>
                        <div className="flex flex-row items-center">
                            <FormInput name="Password" label="Password" type={visible ? "text" : "password"} placeholder="Password"></FormInput>
                            <div
                                onClick={() => {
                                    setVisible(!visible);
                                }}
                                className="flex items-end h-10"
                            >
                                {visible ? <Icon size={"8%"} icon={eye}></Icon> : <Icon size={"8%"} icon={eyeOff}></Icon>}
                            </div>
                        </div>

                        <Button type="submit" variant="default">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
