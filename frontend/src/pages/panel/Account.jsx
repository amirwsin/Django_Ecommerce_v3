import {Box, Button, Grid, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Edit} from "@mui/icons-material";
import {useMutation} from "@tanstack/react-query";
import {UpdateUserApi} from "../../features/api/UserApi";
import {loadUser} from "../../features/actions/authActions";

const Account = () => {
    const {user, token} = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const prepData = JSON.parse(user)
    const [formData, setFormData] = useState({
        id: prepData.id,
        username: prepData.username,
        email: prepData.email,
        first_name: prepData.first_name,
        last_name: prepData.last_name,
    })
    const [editable, setEditable] = useState(false)
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const userMutation = useMutation({
        mutationFn: () => UpdateUserApi(formData)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        userMutation.mutate()
        if (userMutation.isSuccess) {
            dispatch(loadUser())
        }
    }
    const handleEdit = () => {
        setEditable(prevState => !prevState)
    }
    return (
        <Box className={"panel-box"} display={"grid"}>
            <Button variant={"text"} color={"info"} sx={{marginY: 2, justifySelf: "end"}} endIcon={<Edit/>}
                    onClick={handleEdit}>
                edit
            </Button>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField type={"text"} name={"username"} id={"username"} label={"Username"}
                                   variant={"standard"}
                                   color={"primary"}
                                   value={formData.username} fullWidth={true} autoComplete={"off"} disabled={true}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type={"email"} name={"email"} id={"email"} label={"Email"} variant={"standard"}
                                   color={"primary"}
                                   value={formData.email} fullWidth={true} autoComplete={"off"} disabled={!editable}
                                   onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type={"text"} name={"first_name"} id={"first_name"} label={"First Name"}
                                   variant={"standard"} color={"primary"}
                                   value={formData.first_name} fullWidth={true} autoComplete={"off"}
                                   disabled={!editable} onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type={"text"} name={"last_name"} id={"last_name"} label={"Last Name"}
                                   variant={"standard"} color={"primary"}
                                   value={formData.last_name} fullWidth={true} autoComplete={"off"}
                                   disabled={!editable} onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={"contained"} color={"black"}
                                sx={{color: "background.main", marginY: 1, visibility: editable ? "visible" : "hidden"}}
                                fullWidth={true}
                                type={"submit"}>
                            SAVE
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Account