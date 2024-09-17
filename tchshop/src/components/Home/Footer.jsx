import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faInstagram, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faEnvelope, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialMediaLinks = [
    {
      icon: faTelegram,
      url: 'https://t.me/techshop', // placeholder URL
    },
    {
      icon: faInstagram,
      url: 'https://www.instagram.com/techshop', // placeholder URL
    },
    {
      icon: faTwitter,
      url: 'https://twitter.com/techshop', // placeholder URL
    },
    {
      icon: faTiktok,
      url: 'https://www.tiktok.com/@techshop', // placeholder URL
    },
    {
      icon: faEnvelope,
      url: 'mailto:help@tchshop.com?subject=Techshop%20Help', // email link with pre-populated subject
    },
  ];

  return (
    <footer className="absolute bottom-0 left-0 w-full py-4 text-center bg-gray-200">
      <div className="container mx-auto">
        {/* <div className="flex justify-center mb-4">
          {socialMediaLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 text-gray-600 transition duration-300 ease-in-out hover:text-gray-900"
            >
              <FontAwesomeIcon icon={link.icon} size="lg" />
            </a>
          ))}
        </div> */}
        <div className="text-sm text-gray-600">
          <FontAwesomeIcon icon={faCopyright} /> {currentYear} 
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className="mx-2 text-sm text-gray-600"
          />
          <span className="text-sm font-bold">
            <span className="overline">TECH</span>SHOP
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
