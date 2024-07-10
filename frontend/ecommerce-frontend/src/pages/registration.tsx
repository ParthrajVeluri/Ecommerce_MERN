import Button from "../components/Button";
import FormInput from "../components/FormInput";
import NavBar from "../components/NavBar";
import nexusLogo from "../images/nexus-logo.png";
import { useState } from "react";

const Registration = () => {
    const [pass, setPass] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center h-screen">
            <img src={nexusLogo} alt="logo" className="mt-3 w-96 ml-auto mr-auto" />
            <div className="border-2 border-nexus rounded-md p-3 text-slate-700">
                <h3 className="text-4xl text-center font-bold text-nexus">Create your account</h3>
                <div className="flex justify-center">
                    <form className="flex flex-col align-center justify-center">
                        <div className="grid grid-cols-2">
                            <FormInput name="FirstName" label="First Name" placeholder="John" required></FormInput>
                            <FormInput name="LastName" label="Last Name" placeholder="Doe" required></FormInput>
                            <FormInput name="Address1" label="Country" pattern="\w{0,50}" title="Letters only" placeholder="Country" required></FormInput>
                            <FormInput name="Address2" label="City" pattern="\w{0,50}" title="Letters only" placeholder="City" required></FormInput>
                            <FormInput name="Postal" label="Postal Code" pattern="[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]" title="A1B 2C3 or A1B2C3 or A1B-2C3" placeholder="A1B 2C3" required></FormInput>
                            <FormInput name="Suite" label="Suite" title="Numbers only (Max len 8)" pattern="\d{0,8}" placeholder="Suite Number" required></FormInput>
                        </div>
                        <FormInput name="Phone" label="Phone" pattern="^\d{3}-\d{3}-\d{4}" title="123-456-7890" placeholder="Phone Number" required></FormInput>
                        <FormInput name="Email" type="email" label="Email" placeholder="JohnDoe@example.com" required></FormInput>
                        <FormInput name="Password" label="Password" type={visible ? "text" : "password"} placeholder="Password" required></FormInput>
                        <label className="flex justify-start mx-2 text-sm">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onClick={() => {
                                    setVisible(!visible);
                                }}
                                name="checkbox"
                                value="value"
                            />
                            Show password
                        </label>
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
