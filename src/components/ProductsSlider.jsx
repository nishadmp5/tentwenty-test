import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, easeIn, easeInOut, motion } from "framer-motion";
import { productsDetails } from "../assets/assets";

const ProductsSlider = () => {
  // ANIMATION RELATED VARIABLES
  const [motionConstants, setMotionConstants] = useState(
    productsDetails.map(
      (product, index) => index - Math.floor(productsDetails.length / 2)
    )
  );
  const [xMotionConstant, setXMotionConstant] = useState(0);
  const [xMotionDistance,setXMotionDistance] = useState(0)
  const [textIndex, setTextIndex] = useState(
    Math.floor(productsDetails.length / 2)
  );
  const [showDragSign,setShowDragSign] = useState(true);

  //SCREENSIZE FETCH VARIABLES
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  //DRAGGING RELATED VARIABLES
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const slidersContainerRef = useRef();

  //SCREEN SIZE DETECTION
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth >= 1024) {
      setIsLargeScreen(true);
    } else {
      setIsLargeScreen(false);
    }

    if (slidersContainerRef.current) {
      const sliderContainerWidth = slidersContainerRef.current.offsetWidth; 
      setXMotionDistance(sliderContainerWidth/productsDetails.length)
    }
  }, [screenWidth]);

  // DRAG RELATED FUNCTIONS
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const currentX = e.pageX || e.touches[0].pageX;
    console.log(currentX, "startx");
    setStartX(currentX);
  };

  const handleDragMove = (e) => {
    e.preventDefault();
    if (!isDragging) return;
    const currentX = e.pageX || e.touches[0].pageX;
    console.log(currentX, "endx");
    setEndX(currentX);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    if (!isDragging) return;
    setIsDragging(false);
    if (endX != 0) {
      const dragDistance = endX - startX;
      setEndX(0);
      if (Math.abs(dragDistance) > 20) {
        setShowDragSign(false);
        if (dragDistance > 0) {
          if (
            motionConstants[Math.floor(motionConstants.length / 2)] !=
            Math.floor(motionConstants.length / 2)
          ) {
            setMotionConstants((prev) => prev.map((item) => item + 1));
            setXMotionConstant((prev) => prev + 1);
            setTextIndex((prev) => prev - 1);
          }
        } else if (dragDistance < 0) {
          if (
            motionConstants[Math.floor(motionConstants.length / 2)] !=
            -Math.floor(motionConstants.length / 2)
          ) {
            setMotionConstants((prev) => prev.map((item) => item - 1));
            setXMotionConstant((prev) => prev - 1);
            setTextIndex((prev) => prev + 1);
          }
        } else {
          return;
        }
      }
    }
  };

  return (
    <div className="h-auto pb-24 pt-4 lg:pt-14 relative w-full ">

      {/* SLIDES */}
      <div className="w-full h-auto overflow-hidden">
        <div
          className="flex cursor-grab  justify-center py-[2rem] lg:py-[5rem] gap-10 lg:gap-[10rem] overflow-hidden "
          ref={slidersContainerRef}
          onMouseDown={handleDragStart}
          onMouseMove={isDragging ? handleDragMove : null}
          onMouseUp={isDragging ? handleDragEnd : null}
          onMouseLeave={isDragging ? handleDragEnd : null}
          onTouchStart={handleDragStart}
          onTouchMove={isDragging ? handleDragMove : null}
          onTouchEnd={isDragging ? handleDragEnd : null}
        >
          {productsDetails.map((product, index) => {
            return (
              <motion.div
                className="w-[14.5rem] lg:w-[27.1rem] h-[20.7rem] lg:h-[38.7rem] flex-shrink-0 z-10 "
                animate={
                  isLargeScreen
                    ? {
                        translateX: xMotionConstant * 3.7 * xMotionDistance,
                        rotate: motionConstants[index] * 10,
                        translateY: Math.abs(motionConstants[index]) * 50,
                      }
                    : {
                        translateX: xMotionConstant * 6.8 * xMotionDistance,
                        rotate: motionConstants[index] * 8,
                        translateY: Math.abs(motionConstants[index]) * 20,
                      }
                }
                transition={{ duration: 0.8, ease: easeInOut }}
                key={index}
              >
                <img className="w-full h-full" src={product.image} alt="" />
              </motion.div>
            );
          })}
        </div>
      </div>

        {/* DRAG SIGN */}
      <div className={`${showDragSign ? "lg:flex" : "lg:hidden"} absolute hidden items-center justify-center bg-white w-16 h-16 rounded-full left-1/2 top-[30rem] transform -translate-x-1/2  text-center z-20`}>
        <p>Drag</p>
      </div>


      {/* TEXT */}
      <div className="absolute bottom-10 left-0 w-full text-center z-20">
          <motion.h3
            key={textIndex}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="text-[1.5rem] z-10 lg:text-[2.25rem]"
          >
            {productsDetails[textIndex].client}
          </motion.h3>

        <AnimatePresence>
          <motion.h4
            key={textIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="text-[1rem] lg:text-[1.5rem] text-productsTitle mt-3"
          >
            {productsDetails[textIndex].place}
          </motion.h4>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsSlider;
