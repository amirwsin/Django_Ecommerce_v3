import React, {useState} from "react";
import {Box, Grid, Skeleton} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import {FreeMode, Navigation, Thumbs, Autoplay} from "swiper";

const ProductDetailGallery = ({data}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    let current = data?.inventory
    return (
        <Box sx={{position: "relative", height: "100%"}}>
            <Grid sx={{direction: "rtl", height: "100%"}} container spacing={1}>
                <Grid item xs={9} lg={9}>
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        spaceBetween={10}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                        className="mySwiper2"
                    >
                        {current?.media ? current?.media?.map(media => (
                            <SwiperSlide key={media?.id}>
                                <img src={media?.image} alt={media?.alt_text} loading={"lazy"}/>
                            </SwiperSlide>
                        )) : <SwiperSlide>
                            <Skeleton variant={"rectangular"} height={"100%"} animation={"wave"}/>
                        </SwiperSlide>}
                    </Swiper>
                </Grid>
                <Grid item xs={3} lg={3}>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {current?.media ? current?.media?.map(media => (
                            <SwiperSlide key={media?.id}>
                                <img src={media?.image} alt={media?.alt_text} loading={"lazy"}/>
                            </SwiperSlide>
                        )) : <SwiperSlide>
                            <Skeleton variant={"rectangular"} height={"100%"} animation={"wave"}/>
                        </SwiperSlide>}
                    </Swiper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductDetailGallery