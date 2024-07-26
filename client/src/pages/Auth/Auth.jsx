import "./Auth.css";
import Banner from "../../img/collage.png";
import Logo from "../../img/app-logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
import toast, { Toaster } from "react-hot-toast";

const Auth = () => {
  const dispatch = useDispatch();

  // So this is basically how we can get values from our reducer-> which i think is the home place
  //If i want to get error state I'll say
  // const error = useSelector((state)=>state.authReducer.error)

  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.password.length && data.password === data.confirmpass) {
        dispatch(signUp(data));
        toast.success("Success! Welcome.", {
          position: "top-right",
          style: {
            background: "#d4edda",
          },
        });
        return;
      } else {
        setConfirmPass(false);

        toast.error("Invalid credentials!.", {
          position: "top-right",
          style: {
            background: "#f8d7da",
          },
        });
      }
    } else {
      if (data.username && data.password) {
        dispatch(logIn(data));
        toast.success("Success! Welcome.", {
          position: "top-right",
          style: {
            background: "#d4edda",
          },
        });
      } else {
        return toast.error("Invalid credentials!.", {
          position: "top-right",
          style: {
            background: "#f8d7da",
          },
        });
      }
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: "",
    });
  };
  return (
    <div className="Auth">
      <img className="Logo" src={Logo} alt="" />

      <div className="Content">
        <div className="a-left">
          <img src={Banner} alt="" />
        </div>

        <div className="a-right">
          <img className="Logo" src={Logo} alt="" />

          <form className="infoForm authForm" onSubmit={handleSubmit}>
            <h3>{isSignUp ? "SIgn up" : "Log In"}</h3>

            {isSignUp && (
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  onChange={handleChange}
                  value={data.firstname}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  onChange={handleChange}
                  value={data.lastname}
                />
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="User Name"
                className="infoInput"
                name="username"
                onChange={handleChange}
                value={data.username}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="infoInput"
                name="password"
                onChange={handleChange}
                value={data.password}
              />

              {isSignUp && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="infoInput"
                  name="confirmpass"
                  onChange={handleChange}
                  value={data.confirmpass}
                />
              )}
            </div>
            <span
              style={{
                display: confirmPass ? "none" : "block",
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              * Confirm Password is not same
            </span>
            <div>
              <span
                style={{ fontSize: "12px" }}
                className="auth-change-text"
                onClick={() => {
                  setIsSignUp((prev) => !prev);
                  resetForm();
                }}
              >
                {isSignUp
                  ? "Already have an account? Log In!"
                  : "Don't have an account? Sign Up"}
              </span>
            </div>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "...loading" : isSignUp ? "Signup" : "Log In"}
            </button>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Auth;
