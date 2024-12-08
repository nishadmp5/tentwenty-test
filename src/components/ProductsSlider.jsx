import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productsDetails } from "../assets/assets";

const ProductsSlider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [dragSide, setDragSide] = useState("null");
  const [currImageIndex, setCurrImageIndex] = useState(3);

  //DRAG RELATED FUNCTIONS

  const handleDragStart = (e) => {
    setIsDragging(true);
    const currentX = e.pageX || e.touches[0].pageX;
    setStartX(currentX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX || e.touches[0].pageX;
    setEndX(currentX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const dragDistance = endX - startX;
    if (dragDistance > 0) {
      setDragSide("right");
      console.log(dragSide, " right");
    } else if (dragDistance < 0) {
      setDragSide("left");
      console.log(dragSide, " left");
    } else {
      console.log("No significant drag");
    }
  };

  //IMAGE CHANGE DEPENDING DRAGGING SIDE
  useEffect(() => {
    if (dragSide == "right") {
      setCurrImageIndex((prev) => (prev > 1 ? prev - 1 : prev));
      console.log(currImageIndex);
    }
    if (dragSide == "left") {
      setCurrImageIndex((prev) =>
        prev < productsDetails.length - 2 ? prev + 1 : prev
      );
      console.log(currImageIndex);
    }
    setDragSide("null");
  }, [dragSide]);

  return (
    <div className="h-auto w-screen ">
      <div className="w-screen py-28 pb-60 flex justify-center relative h-auto overflow-hidden">
        <motion.div
          initial={dragSide == "left" ? { x: 50 } : { x: -50 }}
          animate={{ x: 0 }}
          className="inline-flex  h-auto gap-[3rem] lg:gap-[11.5rem]"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* PRODUCTS IMAGES */}
          <motion.div
            key={currImageIndex - 1}
            initial={() =>
              dragSide === "right"
                ? { rotate: 0, y: 75, x: -10 }
                : { rotate: -15, y: 75, x: 10 }
            }
            animate={{ rotate: -10, y: 55, x: 0 }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="w-[14.5rem] lg:w-[27.1rem] h-[20.7rem] lg:h-[38.7rem] "
          >
            <img
              className="w-full h-full"
              src={productsDetails[currImageIndex - 1].image}
              alt="Image of plants,models,farming,flowers"
            />
          </motion.div>

          <motion.div
            key={currImageIndex}
            initial={
              dragSide == "right"
                ? { rotate: -5, y: 0, x: -100 }
                : { rotate: 5, y: 0, x: 100 }
            }
            animate={{ rotate: 0, y: 0, x: 0 }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="w-[14.5rem] lg:w-[27.1rem] h-[20.7rem] lg:h-[38.7rem] "
          >
            <img
              className="w-full h-full"
              src={productsDetails[currImageIndex].image}
              alt="Image of plants,models,farming,flowers"
            />
          </motion.div>

          <motion.div
            key={currImageIndex + 1}
            initial={
              dragSide == "right"
                ? { rotate: 0, y: 0, x: 0 }
                : { rotate: 15, y: 75, x: 10 }
            }
            animate={{ rotate: 10, y: 55, x: 0 }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="w-[14.5rem] lg:w-[27.1rem] h-[20.7rem] lg:h-[38.7rem] "
          >
            <img
              className="w-full h-full"
              src={productsDetails[currImageIndex + 1].image}
              alt="Image of plants,models,farming,flowers"
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-20 lg:bottom-20 text-center">
          <AnimatePresence>
            <motion.h3
              key={currImageIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0 }}
              className="text-[1.5rem] lg:text-[2.25rem]"
            >
              {productsDetails[currImageIndex].client}
            </motion.h3>
          </AnimatePresence>
          <AnimatePresence>
            <motion.h4
              key={currImageIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
              className="text-[1rem] lg:text-[1.5rem] text-productsTitle mt-3"
            >
              {productsDetails[currImageIndex].place}
            </motion.h4>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
