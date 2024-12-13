import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import HeroTitle from "./HeroTitle";
import {  AnimatePresence, motion } from "framer-motion";
import { bannerImages } from "../assets/assets";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sliderImageIndex, setSlderImageIndex] = useState(1);
  const firstRender = useRef(true);
  let imageIntervalId;

  useEffect(()=>{
    firstRender.current = false
  },[])


  //    UPDATES BANNER IMAGES
  useEffect(() => {
    const imageUpdateInterval = 5000;
    const progressUpdateInterval = 50;
    const progressIncrement =
      (progressUpdateInterval / imageUpdateInterval) * 100;

    imageIntervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length
      );
      setSlderImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
      setProgress(0);
    }, imageUpdateInterval);

    const progressIntervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + progressIncrement, 100);
        return newProgress;
      });
    }, progressUpdateInterval);

    return () => {
      clearInterval(imageIntervalId);
      clearInterval(progressIntervalId);
    };
  }, [currentImageIndex]);

  //   PROGRESS BAR
  const getProgressStyle = (progress, start, range) => {
    if (progress === 100) return "0%";
    if (progress <= start) return "0%";
    if (progress <= start + range)
      return `${((progress - start) / range) * 100}%`;
    return "100%";
  };

  //   IMAGE INDEX DISPLAYING
  const getDisplayIndex = (sliderImageIndex, imageslength) => {
    return ((sliderImageIndex - 1 + imageslength) % imageslength) + 1;
  };

  //   NEXT CLICK
  const nextImage = () => {
    clearInterval(imageIntervalId);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    setSlderImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    setProgress(0);
  };

  return (
    <section className="w-screen h-screen relative overflow-hidden">
      <Navbar />
      <HeroTitle currImageIndex={currentImageIndex} />

      <div className="absolute z-10 bottom-[3rem] lg:bottom-[4rem] left-[5%] lg:left-[10%]">

        <div className=" flex gap-6 lg:gap-7 items-center ">
          <div className="w-[7rem] lg:w-[8.8rem] h-[7rem] lg:h-[8.8rem]">
            {/* SQUARE PROGRESS BAR */}
            <div className="w-full  h-full cursor-pointer relative">
              <div
                style={{ width: getProgressStyle(progress, 0, 25) }}
                className="absolute bg-white top-0 h-[0.5rem]"
              ></div>
              <div
                style={{ height: getProgressStyle(progress, 25, 25) }}
                className="absolute bg-white top-0 right-0 w-[0.5rem]"
              ></div>
              <div
                style={{ width: getProgressStyle(progress, 50, 25) }}
                className="absolute bg-white bottom-0 right-0 h-[0.5rem]"
              ></div>
              <div
                style={{ height: getProgressStyle(progress, 75, 25) }}
                className="absolute bg-white bottom-0 left-0 w-[0.5rem]"
              ></div>

              <div className="flex w-full h-full absolute top-0 left-0">
                <div
                  onClick={nextImage}
                  className="flex relative  items-center justify-center border-[#EEF4F9] border border-opacity-25 w-[95%] h-[95%] mx-auto my-auto"
                >
                  {/* SLIDER IMAGES */}
                  <div className="relative mx-auto my-auto w-[68%] h-[68%]">
                    <div
                      className={`w-full  h-full  absolute top-0 left-0 flex items-center`}
                    >
                      <motion.img
                        src={
                          bannerImages[
                            sliderImageIndex - 1 < 0
                              ? bannerImages.length - 1
                              : sliderImageIndex - 1
                          ]
                        }
                        key={sliderImageIndex - 1}
                        className=" w-full h-full object-cover"
                        alt="Banner image of nature,farms,beaches"
                      />
                    </div>

                    <div
                      className={
                        "w-full h-full  absolute top-0 left-0 flex items-center"
                      }
                    >
                      <motion.img
                        src={bannerImages[sliderImageIndex]}
                        key={sliderImageIndex}
                        initial={
                          firstRender.current
                            ? { height: "100%" }
                            : { height: 0 }
                        }
                        animate={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-full object-cover"
                        alt="Banner image of nature,farms,beaches"
                      />
                    </div>
                  </div>

                  {/* NEXT TEXT */}
                  <p className="absolute text-[#EEF4F9] text-[1rem] font-[350]">
                    Next
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* IMAGE INDEX DISPLAY */}
            <div className="flex gap-4 items-center justify-between text-[#EEF4F9] text-[1rem] font-light">
              <p>
                {"0" + getDisplayIndex(sliderImageIndex, bannerImages.length)}
              </p>
              <div className="h-px w-[6.4rem] bg-white"></div>
              <p>{"0" + bannerImages.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER IMAGE SLIDING */}
      <div className="h-screen w-screen relative overflow-hidden">
        <div className={`w-full  h-full z-0 absolute top-0 flex items-center`}>
          <motion.img
            src={
              bannerImages[
                currentImageIndex - 1 < 0
                  ? bannerImages.length - 1
                  : currentImageIndex - 1
              ]
            }
            key={currentImageIndex - 1}
            className=" w-full h-full object-cover"
            alt="Banner image of nature,farms,beaches"
          />
         
        </div>

        <div className={"w-full h-full z-0 absolute top-0 flex items-center"}>
          <motion.img
            src={bannerImages[currentImageIndex]}
            key={currentImageIndex}
            initial={firstRender.current ? { height: "100%" } : { height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut",delay:0.2 }}
            className="w-full object-cover"
            alt="Banner image of nature,farms,beaches"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
