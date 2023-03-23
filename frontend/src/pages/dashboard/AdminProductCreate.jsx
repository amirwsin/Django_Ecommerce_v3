import {Box, Button, Container, Stack, Step, StepButton, StepLabel, Stepper, Typography} from "@mui/material";
import ProductMain from "../../components/dashboard/ProductMain";
import ProductInventory from "../../components/dashboard/ProductInventory";
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {ProductCreate} from "../../features/api/cmsApi";
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";


const steps = ['Main Section', 'Inventory Section', 'Finish'];

const AdminProductCreate = () => {
    const [formData, setFormData] = useState({})
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = (index) => {
        setActiveStep(index)
    };

    const productCreateMutation = useMutation({
        mutationFn: (data) => ProductCreate(data),
        onSuccess: (data) => {

            if (data?.response?.status === 400) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } if (data?.status === 200) {
                toast.success("product saved",{duration:5000})
                navigate(`/admin/products/${data.data.id}`)
            }

        },
        useErrorBoundary: (error) => {
            toast.error("error", {duration: 10000})
        },
        onError: error => toast.error("error", {duration: 10000})
    })

    const handleFinish = () => {
        productCreateMutation.mutate(formData)
    }


    return (
        <Container maxWidth={"xll"} sx={{
            paddingY: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "scroll"
        }}>
            <Toaster position="top-right" reverseOrder={false}/>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === 0 &&
            <Box className={"card"}>
                <Typography variant={"h3"}>Main Section</Typography>
                <hr/>
                <ProductMain setFormData={setFormData} handleNext={handleNext} formData={formData}/>
            </Box>}
            {activeStep === 1 &&
            <Box className={"card"}>
                <Typography variant={"h3"}>Inventory Section</Typography>
                <hr/>
                <ProductInventory setFormData={setFormData} formData={formData} handleNext={handleNext}/>
            </Box>}
            {activeStep === 2 &&
            <Box className={"card"} sx={{display: "flex", justifyContent: "center", alignItems: "center", padding: 4}}>
                <Stack direction={"column"} gap={2} textAlign={"center"}>
                    <Typography variant={"h2"} component={"p"} fontWeight={500}>
                        You Are Done !
                    </Typography>
                    <Typography variant={"caption"} component={"p"}>
                        click save button to save your data and you will redirect to product page and there you can add
                        media & stock/units or edit entire product
                    </Typography>
                    <Button onClick={handleFinish} variant={"contained"} color={"primary"}>
                        SAVE
                    </Button>
                </Stack>
            </Box>}
        </Container>
    )
}


export default AdminProductCreate