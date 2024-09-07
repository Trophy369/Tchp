import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <section className="relative flex items-center  z-10 mb-4 justify-center h-[26vh] md:h-[35vh] bg-red-100/20 overflow-hidden">
      {/* SVG Background */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="1440"
        height="560"
        viewBox="0 0 1440 560"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 object-cover w-full h-full"
      >
        <g mask="url(#SvgjsMask1037)" fill="none">
          <path d="M100 341L-385 340" strokeWidth="10" stroke="url(#SvgjsLinearGradient1038)" strokeLinecap="round" className="Left"></path>
          <path d="M238 45L1016 44" strokeWidth="10" stroke="url(#SvgjsLinearGradient1038)" strokeLinecap="round" className="Left"></path>
          <path d="M345 421L1128 420" strokeWidth="10" stroke="url(#SvgjsLinearGradient1039)" strokeLinecap="round" className="Left"></path>
          <path d="M1432 288L796 287" strokeWidth="10" stroke="url(#SvgjsLinearGradient1038)" strokeLinecap="round" className="Left"></path>
          <path d="M332 217L-547 216" strokeWidth="8" stroke="url(#SvgjsLinearGradient1040)" strokeLinecap="round" className="Right"></path>
          <path d="M685 50L306 49" strokeWidth="10" stroke="url(#SvgjsLinearGradient1040)" strokeLinecap="round" className="Right"></path>
          <path d="M1049 331L2082 330" strokeWidth="6" stroke="url(#SvgjsLinearGradient1040)" strokeLinecap="round" className="Right"></path>
          <path d="M1221 476L717 475" strokeWidth="6" stroke="url(#SvgjsLinearGradient1040)" strokeLinecap="round" className="Right"></path>
          <path d="M156 533L-778 532" strokeWidth="6" stroke="url(#SvgjsLinearGradient1040)" strokeLinecap="round" className="Right"></path>
          <path d="M969 346L1505 345" strokeWidth="10" stroke="url(#SvgjsLinearGradient1039)" strokeLinecap="round" className="Left"></path>
          <path d="M1020 281L1520 280" strokeWidth="6" stroke="url(#SvgjsLinearGradient1039)" strokeLinecap="round" className="Left"></path>
          <path d="M312 422L-561 421" strokeWidth="6" stroke="url(#SvgjsLinearGradient1040)" strokeLinecap="round" className="Right"></path>
          <path d="M79 274L659 273" strokeWidth="6" stroke="url(#SvgjsLinearGradient1041)" strokeLinecap="round" className="Right"></path>
          <path d="M741 29L-306 28" strokeWidth="10" stroke="url(#SvgjsLinearGradient1040)" strokeLinecap="round" className="Right"></path>
        </g>
        <defs>
          <mask id="SvgjsMask1037">
            <rect width="1440" height="560" fill="#ffffff"></rect>
          </mask>
          <linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="SvgjsLinearGradient1038">
            <stop stopColor="rgba(150, 89, 104, 0)" offset="0"></stop>
            <stop stopColor="rgba(150, 89, 104, 1)" offset="1"></stop>
          </linearGradient>
          <linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="SvgjsLinearGradient1039">
            <stop stopColor="rgba(194, 208, 57, 0)" offset="0"></stop>
            <stop stopColor="rgba(194, 208, 57, 1)" offset="1"></stop>
          </linearGradient>
          <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="SvgjsLinearGradient1040">
            <stop stopColor="rgba(150, 89, 104, 0)" offset="0"></stop>
            <stop stopColor="rgba(150, 89, 104, 1)" offset="1"></stop>
          </linearGradient>
          <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="SvgjsLinearGradient1041">
            <stop stopColor="rgba(194, 208, 57, 0)" offset="0"></stop>
            <stop stopColor="rgba(194, 208, 57, 1)" offset="1"></stop>
          </linearGradient>
        </defs>
      </svg> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 mx-4 text-center text-yellow-900 ">
        <motion.h1
          className="mb-3 text-lg font-extrabold md:text-3xl lg:text-4xl animate-heartbeat"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          WELCOME TO{' '}
          <FontAwesomeIcon icon={faScrewdriverWrench} className="mx-2 text-yellow-900 text- xl md:text-3xl lg:text-4xl" />
          <span className="text-2xl font-extrabold md:text-3xl lg:text-4xl">
            <span className="overline">TECH</span>SHOP
          </span>
        </motion.h1>
        <motion.p
          className="mb-2 text-sm font-bold tracking-widest text-black md:text-base lg:text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
           CREATE EXPLORE INNOVATE DOMINATE
        </motion.p>
        
        <motion.p
          className="text-sm italic font-semibold text-yellow-700 md:text-base lg:text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Get the right tools & devices here. Discrete Deliveries Worldwide.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
