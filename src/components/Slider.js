import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the index of the next slide
      const nextSlide = (current + 1) % slides.length;
      setCurrent(nextSlide);
    }, 2000); // Change slide every 3000 milliseconds (3 seconds)

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, [current, slides.length]);

  const prev = () => {
    const isFirstSlide = current === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : current - 1;
    setCurrent(newIndex);
  };

  const next = () => {
    const isLastSlide = current === slides.length - 1;
    const newIndex = isLastSlide ? 0 : current + 1;
    setCurrent(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  return (
    <div className="w-full md:max-w-[900px] lg:max-w-[1400px] pt-5 ml-10 sm:max-w-[500px] slider">
      <div className="relative">
        <div
          style={{
            backgroundImage: `url(${slides[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          className="h-[300px] md:h-[500px] lg:h-[500px] duration-500 sm:h-[200px] "
        ></div>

        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 cursor-pointer px-10 text-white">
          <BsChevronCompactLeft
            onClick={prev}
            size={30}
            className="bg-black opacity-70 rounded-full"
          />
        </div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 cursor-pointer px-10 text-white">
          <BsChevronCompactRight
            onClick={next}
            size={30}
            className="bg-black opacity-70 rounded-full"
          />
        </div>
      </div>

      <div className="flex top-5 justify-center py-5">
        {slides.map((slide, slideIndex) => (
          <div
            className="text-2xl cursor-pointer "
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slider;
