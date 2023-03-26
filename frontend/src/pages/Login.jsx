import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Visibility} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {loadUser, login} from "../features/actions/authActions";
import toast from "react-hot-toast";

const Login = () => {


    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const [visibility, setVisibility] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value.trim(),})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password.length >= 2) {
            const result = dispatch(login(formData))
            result.then((res) => {
                if (res) {
                    const finalResult = dispatch(loadUser())
                    finalResult.then((res2) => {
                        if (res2) {
                            toast.success("welcome back")
                            navigate("/")
                        } else {
                            toast.error("something went wrong please try again !!!")
                        }
                    })
                } else {
                    toast.error("username or password is incorrect.")
                }
            })
        } else {
            toast.error("your password most be at least 8 character")
        }
    }

    const handleVisibility = () => {
        setVisibility(prevState => !prevState)
    }

    return (
        <Container maxWidth={"md"}
                   sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "75vh"}}>
            <Box className={"form-wrapper"}>
                <Typography variant={"h3"} component={"p"} sx={{textAlign: "center", fontWeight: "bold"}}>
                    Login
                </Typography>
                <Typography variant={"subtitle2"} component={"p"}
                            sx={{textAlign: "center", fontWeight: "lighter", color: "text.text"}}>
                    you have to login to your account so you can use our services
                </Typography>
                <form style={{display: "grid", gap: "2rem"}} onSubmit={handleSubmit}>
                    <TextField type={"text"} label={"username"} color={"primary"} placeholder={"your username"}
                               title={"username"}
                               aria-label={"username"} helperText={"Your Username That You Register With"}
                               fullWidth={true} required={true} name={"username"} id="username" autoComplete={"off"}
                               onChange={handleChange}/>
                    <TextField type={visibility ? "text" : "password"} label={"password"} color={"primary"}
                               placeholder={"your password"}
                               title={"password"}
                               aria-label={"password"} helperText={"Your Password That You Register With"}
                               fullWidth={true} required={true} name={"password"} id="password" autoComplete={"off"}
                               onChange={handleChange}
                               InputProps={{
                                   endAdornment: <Visibility color={"primary"} cursor={"pointer"}
                                                             onClick={handleVisibility}/>
                               }}/>

                    <Button variant={"contained"} color={"primary"} fullWidth={true} type={"submit"}>
                        Login To Your Account
                    </Button>
                </form>
                <Typography variant={"subtitle2"} component={"p"}>
                    dont have an account ? <Link to={"/register"}>register</Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default Login