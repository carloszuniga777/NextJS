'use client'

import { useState } from "react";
import Image from 'next/image';

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react"  //Install:  npm install swiper
import {Swiper as SwiperObject } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css'



interface Props{
    images: string[];
    title: string;
    className?: string
}

//snipett rafc
//Documentación: https://swiperjs.com/react#usage
//https://codesandbox.io/p/devbox/swiper-react-thumbs-gallery-k3cyyc?file=%2Fsrc%2FApp.jsx%3A17%2C2-17%2C58
export const ProductSlideshow = ({images, title, className}:Props) => {


    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();


  return (
        <div className={className}>
           <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{delay:2500}}
        thumbs={{ 
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
          {
            images.map(image=>(
                <SwiperSlide key={image}>
                    <Image 
                            width={1024}
                            height={800} 
                            src={`/products/${image}`} 
                            alt={title}
                            className="rounded-lg object-fill"
                      />
                </SwiperSlide>
            ))
          }

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
       {
            images.map(image=>(
                <SwiperSlide key={image}>
                    <Image 
                            width={300}
                            height={300} 
                            src={`/products/${image}`} 
                            alt={title}
                            className="rounded-lg object-fill"
                      />
                </SwiperSlide>
            ))
          }

      </Swiper>
        </div>
  )
}

