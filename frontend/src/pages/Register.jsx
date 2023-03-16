import {Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography} from "@mui/material";
import {Link,useNavigate } from "react-router-dom";
import {Visibility} from "@mui/icons-material";
import {useContext, useState} from "react";
import {AlertContext} from "../AlertContext";
import {useDispatch} from "react-redux";
import {register} from "../features/actions/authActions";

const Register = () => {

    const {setAlertState} = useContext(AlertContext)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checkBox, setCheckBox] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const dispatch = useDispatch()
  const navigate = useNavigate();
    const handleCheckBox = () => {
        setCheckBox(prevState => !prevState)
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value.trim(),})
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleVisibility = () => {
        setVisibility(prevState => !prevState)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password.length >= 8) {
            if (confirmPassword === formData.password) {
                const result = dispatch(register(formData))
                result.then((res) => {
                    if (res) {
                        setAlertState({
                            "open": true,
                            "msg": JSON.stringify(res),
                            "color": "info"
                        })
                        if (res == "Your Account Created Successfully") {
                            navigate("/login")
                        }
                    }
                })
            } else {
                setAlertState({
                    "open": true,
                    "msg": "Make Sure You Typed Exact Match Of Your Passwords",
                    "color": "error"
                })
            }
        } else {
            setAlertState({
                "open": true,
                "msg": "Your Password Most Be at least 8 Character",
                "color": "error"
            })
        }
    }

    return (
        <Container maxWidth={"md"} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box className={"form-wrapper"}>
                <Typography variant={"h3"} component={"p"} sx={{textAlign: "center", fontWeight: "bold"}}>
                    Register
                </Typography>
                <Typography variant={"subtitle2"} component={"p"}
                            sx={{textAlign: "center", fontWeight: "lighter", color: "text.text"}}>
                    you have to have an account to use our services
                </Typography>
                <form style={{display: "grid", gap: "2rem"}} autoComplete={"off"} onSubmit={handleSubmit}>
                    <TextField type={"text"} label={"username"} color={"primary"} placeholder={"your username"}
                               title={"username"}
                               aria-label={"username"} helperText={"username that you want to register"}
                               fullWidth={true} required={true} name={"username"} id="username" autoComplete={"off"}
                               onChange={handleChange}/>
                    <TextField type={"email"} label={"Email"} color={"primary"} placeholder={"example@gmail.com"}
                               title={"email"}
                               aria-label={"email"} helperText={"an valid email like mack@gmail.com"}
                               fullWidth={true} required={true} name={"email"} id="email" autoComplete={"off"}
                               onChange={handleChange}/>
                    <TextField type={visibility ? "text" : "password"} label={"password"} color={"primary"}
                               placeholder={"your password"}
                               title={"password"}
                               aria-label={"password"}
                               helperText={"type an strong password that are more then 8 character"}
                               fullWidth={true} required={true} name={"password"} id="password" autoComplete={"off"}
                               onChange={handleChange}
                               InputProps={{
                                   endAdornment: <Visibility color={"primary"} cursor={"pointer"}
                                                             onClick={handleVisibility}/>
                               }}/>

                    <TextField type={visibility ? "text" : "password"} label={"confirm password"} color={"primary"}
                               placeholder={"retype your password"}
                               title={"confirm password"}
                               aria-label={"cpassword"}
                               helperText={"retype your password so we know you didnt make any mistakes"}
                               fullWidth={true} required={true} name={"cpassword"} id="cpassword" autoComplete={"off"}
                               onChange={handleConfirmPassword} value={confirmPassword}
                               InputProps={{
                                   endAdornment: <Visibility color={"primary"} cursor={"pointer"}
                                                             onClick={handleVisibility}/>
                               }}/>

                    <FormControlLabel control={<Checkbox checked={checkBox} onChange={handleCheckBox}/>}
                                      label="accept term and policy"/>
                    <Button variant={"contained"} color={"primary"} fullWidth={true} type={"submit"}
                            disabled={!checkBox ? true : false}>Submit</Button>
                </form>
                <Typography variant={"subtitle2"} component={"p"}>
                    already have an account ? <Link to={"/login"}>login</Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default Register