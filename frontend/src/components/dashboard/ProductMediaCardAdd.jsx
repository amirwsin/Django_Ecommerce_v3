import {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia,
    FormControlLabel,
    FormGroup, IconButton, Switch,
    TextField,
    Tooltip
} from "@mui/material";
import {AddPhotoAlternate, Restore, SaveAlt} from "@mui/icons-material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateMedia, UpdateMedia} from "../../features/api/cmsApi";
import toast from "react-hot-toast";
import {ERROR_LIST} from "../../ResponseStatus";

const ProductMediaCardAdd = ({id, productId}) => {

    const [media, setMedia] = useState({
        image: null,
        alt_text: "",
        is_feature: false,
        product_inventory: id ? id : null
    })
    const [previewImage, setPreviewImage] = useState("https://www.touchtaiwan.com/images/default.jpg")
    const [showSave, setShowSave] = useState(false)
    const queryClient = useQueryClient()
    const CheckData = () => {
        if (media.is_feature !== false || media.alt_text !== "" || media.image !== null) {
            setShowSave(true)
        } else {
            setShowSave(false)
        }
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setMedia({...media, image: e.target.files[0]})
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleIsFeature = (e) => {
        setMedia({...media, is_feature: !media.is_feature})
    }
    const handleAltChange = (e) => {
        setMedia({...media, alt_text: e.target.value})
    }
    const handleRestore = () => {
        setMedia({image: null, alt_text: "", is_feature: false, product_inventory: id})
        setPreviewImage("https://www.touchtaiwan.com/images/default.jpg")
    }

    useEffect(() => {
        CheckData()
        setMedia({...media, product_inventory: id})
    }, [media])


    const mediaMutation = useMutation({
        mutationFn: () => CreateMedia(media),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                handleRestore()
                toast.success("image saved")
                return queryClient.setQueryData(["products", parseInt(productId)], (old_data) => {
                    let readyData = {...old_data}
                    old_data.inventory.media.push(data)
                    readyData = {...readyData, inventory: old_data.inventory}
                    return readyData
                })
            }
        }
    })

    const handleSave = (e) => {
        e.preventDefault()
        mediaMutation.mutate()
    }


    return (
        <Card>
            <form onSubmit={handleSave}>
                <Tooltip arrow title={"upload picture"}>
                    <CardActionArea component={"label"} sx={{
                        display: "grid",
                        "& .MuiSvgIcon-root": {
                            position: "absolute",
                            justifySelf: "end",
                            alignSelf: "start",
                        }
                    }}>
                        <input required onChange={handleImageChange} hidden type={"file"}
                               accept={"image/*"}
                               id={"image-file"}
                               name={"image-file"}/>
                        <AddPhotoAlternate fontSize={"large"} color={"action"}/>
                        <CardMedia component={"img"} image={previewImage} alt={media.alt_text}
                                   sx={{height: 200, width: 250}}/>
                    </CardActionArea>
                </Tooltip>
                <CardContent>
                    <TextField required variant={"standard"} type={"text"} onChange={handleAltChange}
                               value={media.alt_text} label={"type your alternative text"}/>
                    <FormGroup>
                        <FormControlLabel control={<Switch color={"secondary"} checked={media.is_feature}
                                                           onChange={handleIsFeature}/>}
                                          label="cover image"/>
                    </FormGroup>
                </CardContent>
                <CardActions sx={{justifyContent: "space-between"}}>
                    <Box>
                        {showSave &&
                        <Tooltip arrow title={"save changes"}>
                            <IconButton type={"submit"} color={"success"} aria-label="save changes">
                                <SaveAlt/>
                            </IconButton>
                        </Tooltip>}
                        {showSave &&
                        <Tooltip arrow title={"restore"}>
                            <IconButton onClick={handleRestore} color={"default"} aria-label="save changes">
                                <Restore/>
                            </IconButton>
                        </Tooltip>}
                    </Box>
                </CardActions>
            </form>
        </Card>
    )
}
export default ProductMediaCardAdd