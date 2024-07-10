import Button from "../components/Button";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";
import FormInput from "../components/FormInput";

const Login = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-orange-300">
      <div className="flex rounded-md bg-white border w-128 h-128 text-center flex-col border-none  ">
        <div className="flex text-5xl text-black font-bold border-none pt-10 pl-9 pb-8 ">
          Login
        </div>
        <hr className="h-2 bg-black from-pink-600 to-galaxy-100 w-full "></hr>
        <div className="pt-8 pl-6 pr-8 pb-10">
          <FormInput name="Email" label="" placeholder="Email" className="outline-none border-none pt-5"/>
          <hr className="h-1 bg-gradient-to-r from-pink-600 to-galaxy-100 ml-4 mr-3 mb-2"></hr>
          <div className="inline-flex justify-start">
            <FormInput name="Password" label="" className="outline-none border-black  pt-5  mr-20 w-full " placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type={type} />
            <Icon className="" icon={icon} onClick={handleToggle} size={35}/>
          </div>
          <hr className="h-1 bg-gradient-to-r from-pink-600 to-galaxy-100 ml-4 mr-3 mb-8"></hr>
        </div>
        <div className="flex items-center justify-center ">
          <Button variant="login">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
