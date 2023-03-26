import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent, Checkbox, FormControlLabel,
    Grid,
    IconButton, TextField, Tooltip,
    Typography
} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    ChangeUserAddressDefaultApi,
    CreateUserAddressApi,
    DeleteUserAddressApi,
    GetUserAddressApi, UpdateUserAddressApi
} from "../../features/api/UserApi";
import {useSelector} from "react-redux";
import {Add, Delete, Edit} from "@mui/icons-material";
import {useContext, useState} from "react";
import toast from "react-hot-toast";

const Address = () => {
    const {user} = useSelector(state => state.authReducer)
    const readyData = JSON.parse(user)
    const [showForm, setShowForm] = useState(false)
    const [editData, setEditData] = useState(null)


    const addressQuery = useQuery({
        queryKey: ["address"],
        queryFn: () => GetUserAddressApi(readyData.id),
    })

    return (
        <Box className={"panel-box"} display={"grid"}>
            <Grid container spacing={2}>
                {showForm &&
                <Grid item xs={12} borderBottom={"1px solid grey"}><Form data={editData} user={readyData}/></Grid>}

                {addressQuery.data ? addressQuery.data.map(item => <Grid key={item.id} item xs={12} md={6}
                                                                         lg={4}><AddressCard setShowForm={setShowForm}
                                                                                             setEditData={setEditData}
                                                                                             data={item}/></Grid>) : "empty"}

                <Grid item xs={12} md={6} lg={4}>
                    <AddCard setShowForm={setShowForm} count={addressQuery.data?.length}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export const Form = ({user, data}) => {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        id: data ? data.id : null,
        user: user.id,
        contact_name: data ? data.contact_name : "",
        street: data ? data.street : "",
        apartment: data ? data.apartment : "",
        city: data ? data.city : "",
        zip_code: data ? data.zip_code : "",
        contact_phone: data ? data.contact_phone : "",
        is_default: data ? data.is_default : false,

    })
    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            setFormData({...formData, is_default: !formData.is_default})
        } else {
            setFormData({...formData, [e.target.name]: e.target.value})
        }

    }

    const createAddressMutation = useMutation({
        mutationFn: () => data ? UpdateUserAddressApi(formData.id, formData) : CreateUserAddressApi(user.id, formData),
        onSuccess: () => {
            toast.success("new address added")
            queryClient.setQueryData(["address"], (old_data) => {
                return [...old_data, formData]
            })
        },
        onError: () => {
            toast.error("something went wrong. please try later")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createAddressMutation.mutate()
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField type={"text"} name={"contact_name"} id={"contact_name"} variant={"standard"}
                               label={"Contact Person Name"} fullWidth={true} onChange={handleChange}
                               value={formData.contact_name} required/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"text"} name={"street"} id={"street"} variant={"standard"}
                               label={"Street"} fullWidth={true} onChange={handleChange} value={formData.street}
                               required/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"text"} name={"apartment"} id={"apartment"} variant={"standard"}
                               label={"Apartment"} fullWidth={true} onChange={handleChange} value={formData.apartment}
                               required/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"text"} name={"city"} id={"city"} variant={"standard"}
                               label={"City & State"} fullWidth={true} onChange={handleChange} value={formData.city}
                               required/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"text"} pattern="[0-9]{5}" name={"zip_code"} id={"zip_code"} variant={"standard"}
                               label={"zip code"} fullWidth={true} onChange={handleChange} value={formData.zip_code}
                               required/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"tel"} pattern="[0-9]" name={"contact_phone"}
                               id={"contact_phone"} variant={"standard"}
                               label={"Mobile Number"} fullWidth={true} onChange={handleChange}
                               value={formData.contact_phone} required/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        control={<Checkbox name={"is_default"} checked={formData.is_default} onChange={handleChange}/>}
                        label="is default address ?"/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant={"contained"} color={"black"}
                            sx={{color: "background.main", marginY: 1}}
                            fullWidth={true}
                            type={"submit"}>
                        SAVE
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export const AddCard = ({setShowForm, count}) => {

    const handleClick = () => {
        setShowForm(prevState => !prevState)
    }
    if (count >= 3) {
        return (
            <Box className={"address-card-add"}>
                <Typography variant={"caption"} component={"p"}>You Cant Have More Then 3 Address</Typography>
            </Box>
        )
    }
    return (
        <Box className={"address-card-add"} onClick={handleClick}>
            <Add sx={{justifySelf: "center", fontSize: "3rem"}}/>
        </Box>
    )
}

export const AddressCard = ({data, setShowForm, setEditData}) => {
    const queryClient = useQueryClient()
    const addressMutation = useMutation({
        mutationFn: () => ChangeUserAddressDefaultApi(data.id),
        onSuccess: (newData) => {
            toast.success("changes saved")
            queryClient.setQueryData(['address'], (old_data) => {
                let prevDefault = old_data.filter(item => {
                    return item.is_default === true
                })
                prevDefault[0].is_default = false
                let newDefault = old_data.filter(item => {
                    return item.id === newData.id
                })
                newDefault[0].is_default = true
            })
        },
        onError: () => {
            toast.error("something went wrong. please try later")
        }
    })

    const addressDeleteMutation = useMutation({
        mutationFn: () => DeleteUserAddressApi(data.id),
        onSuccess: () => {
            toast.success("address deleted")
            queryClient.setQueryData(['address'], (old_data) => {
                let key;
                old_data.filter((item, index) => {
                    key = index
                    return item.id === data.id
                })
                old_data.splice(key, 1)
            })
        }
    })


    const {setAlertState} = useContext(AlertContext)
    const handleDefault = () => {
        addressMutation.mutate()
    }
    const handleDelete = () => {
        addressDeleteMutation.mutate()
    }
    const handleEdit = () => {
        setShowForm(prev => !prev)
        setEditData(data)
    }

    return (<Card sx={{height: "100%", width: "100%"}} className={"address-card"}>
            <CardContent>
                <Box className={"address-card-details"}>
                    <Typography variant={"body1"} letterSpacing={"-0.2px"} component={"p"} fontWeight={550}>
                        Contact Person Name :
                    </Typography>
                    <Typography variant={"subtitle1"} component={"p"} marginLeft={2}>
                        {data.contact_name}
                    </Typography>
                </Box>
                <Box className={"address-card-details"}>
                    <Typography variant={"body1"} letterSpacing={"-0.2px"} component={"p"} fontWeight={550}>
                        Street :
                    </Typography>
                    <Typography variant={"subtitle1"} component={"p"} marginLeft={2}>
                        {data.street}
                    </Typography>
                </Box>
                <Box className={"address-card-details"}>
                    <Typography variant={"body1"} letterSpacing={"-0.2px"} component={"p"} fontWeight={550}>
                        Apartment :
                    </Typography>
                    <Typography variant={"subtitle1"} component={"p"} marginLeft={2}>
                        {data.apartment}
                    </Typography>
                </Box>
                <Box className={"address-card-details"}>
                    <Typography variant={"body1"} letterSpacing={"-0.2px"} component={"p"} fontWeight={550}>
                        City & State :
                    </Typography>
                    <Typography variant={"subtitle1"} component={"p"} marginLeft={2}>
                        {data.city}
                    </Typography>
                </Box>
                <Box className={"address-card-details"}>
                    <Typography variant={"body1"} letterSpacing={"-0.2px"} component={"p"} fontWeight={550}>
                        zip code :
                    </Typography>
                    <Typography variant={"subtitle1"} component={"p"} marginLeft={2}>
                        {data.zip_code}
                    </Typography>
                </Box>
                <Box className={"address-card-details"}>
                    <Typography variant={"body1"} letterSpacing={"-0.2px"} component={"p"} fontWeight={550}>
                        Mobile Number :
                    </Typography>
                    <Typography variant={"subtitle1"} component={"p"} marginLeft={2}>
                        {data.contact_phone}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <Tooltip title={"Edit"} arrow>
                        <IconButton color={"text"} onClick={handleEdit}>
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                        <IconButton color={"error"} onClick={handleDelete}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </div>
                {!data.is_default && <Button onClick={handleDefault} variant={"text"} color={"black"}>
                    set default
                </Button>}
            </CardActions>
        </Card>
    )
}
export default Address