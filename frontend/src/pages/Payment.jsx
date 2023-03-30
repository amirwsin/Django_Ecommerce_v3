import React, {useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import {Box, CircularProgress, Container, Divider, Grid, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {GetClientSecretApi} from "../features/api/PaymentsApi";
import {ERROR_LIST} from "../ResponseStatus";
import toast from "react-hot-toast";

const stripePromise = loadStripe("pk_test_51MrHupIOqCK98Pr5lLt1rA2u4IaJyUmuvm8y4GbkUAREwjCdoNMScDxZbmsPnP6m7ikE3L0b4l8rUf6THFI3GkxC00x96PPYhf");

const Payment = ({price, address, delivery}) => {
    const [clientSecret, setClientSecret] = useState("");

    const clientSecretQuery = useQuery({
        queryKey: ['clientSecret'],
        queryFn: () => GetClientSecretApi({
            "price": price,
            "address": address,
            "delivery": delivery.id
        }),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data.status)) {
                toast.error('something went wrong : please try later')
            } else {
                setClientSecret(data.data.clientSecret)
            }
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Box sx={{
            position: "relative",
            display: "block",
            backgroundColor: "background.main",
            padding: 3,
            width: "100%",
            borderRadius: "7px",
            boxShadow: "0px 2px 6px var(--box-shadow-color)"
        }}>
            <Typography variant={"h3"} component={"p"} fontWeight={"600"} textAlign={"center"}
                        marginY={2}>PAYMENT</Typography>
            <CircularProgress/>
            {!clientSecretQuery.isLoading && clientSecret &&
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>}

        </Box>
    )
}
export default Payment