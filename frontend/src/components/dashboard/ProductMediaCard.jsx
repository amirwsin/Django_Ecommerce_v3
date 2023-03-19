import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DeleteMedia, UpdateMedia} from "../../features/api/cmsApi";
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, FormControlLabel,
    FormGroup,
    IconButton, Switch,
    TextField,
    Tooltip
} from "@mui/material";
import {AddPhotoAlternate, Delete, Restore, SaveAlt} from "@mui/icons-material";
import {useParams} from "react-router-dom";

const ProductMediaCard = ({data}) => {
    const [media, setMedia] = useState({
        id: data.id,
        image: data.image,
        alt_text: data.alt_text,
        is_feature: data.is_feature,
        product_inventory: data.product_inventory
    })
    const {id} = useParams()
    const [previewImage, setPreviewImage] = useState(data.image)
    const [showSave, setShowSave] = useState(false)
    const queryClient = useQueryClient()

    const CheckData = () => {
        if (media.is_feature !== data.is_feature || media.alt_text !== data.alt_text || media.image !== data.image) {
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
        setMedia({image: data.image, alt_text: data.alt_text, is_feature: data.is_feature})
    }

    useEffect(() => {
        CheckData()
    }, [media])


    const mediaMutation = useMutation({
        mutationFn: () => UpdateMedia(media),
        onSuccess: (newData) => {
            setShowSave(false)
            queryClient.setQueryData(["products", {id}], (old_data) => {
                let prevData = old_data.inventory.media.filter((media) => {
                    return media.id === newData.id
                })
                prevData[0].image = newData.image
                prevData[0].alt_text = newData.alt_text
                prevData[0].is_feature = newData.is_feature

                console.log(newData)
                console.log(prevData)

            })
        }
    })

    const mediaDeleteMutation = useMutation({
        mutationFn: () => DeleteMedia(media.id),
    })

    const handleDelete = () => {
        mediaDeleteMutation.mutate()
    }

    const handleSave = (e) => {
        e.preventDefault()
        mediaMutation.mutate()
    }
    return (
        <Card sx={{maxWidth: 350}} variant={"elevation"}>
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
                        <input onChange={handleImageChange} required value={data.image.name} hidden type={"file"}
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
                               value={media.alt_text} label={"click to change alt text"}/>
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
                    <Tooltip arrow title={"delete image"}>
                        <IconButton onClick={handleDelete} color={"error"}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </form>
        </Card>
    )
}


export default ProductMediaCard