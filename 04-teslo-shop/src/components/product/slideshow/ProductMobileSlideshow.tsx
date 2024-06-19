'use client'


import Image from 'next/image';

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react"  //Install:  npm install swiper
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css'



interface Props{
    images: string[];
    title: string;
    className?: string
}

//snipett rafc
//Documentación: https://swiperjs.com/react#usage
//https://codesandbox.io/p/devbox/swiper-react-thumbs-gallery-k3cyyc?file=%2Fsrc%2FApp.jsx%3A17%2C2-17%2C58
export const ProductMobileSlideshow = ({images, title, className}:Props) => {


  return (
      <div className={className}>
        <Swiper
          style={{
            width: '100vw',
            height: '500px'
          }}
          pagination
          autoplay={{delay:2500}}
          modules={[FreeMode, Autoplay, Pagination]}
          className="mySwiper2"
        >
          {
            images.map(image=>(
                <SwiperSlide key={image}>
                    <Image 
                            width={600}
                            height={500} 
                            src={`/products/${image}`} 
                            alt={title}
                            className="object-fill"
                      />
                </SwiperSlide>
            ))
          }

      </Swiper>
   </div>
  )
}

