import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const faqData = [
  {
    question: 'Shipping & Packaging Information',
    answer: (
      <>
        <p>Techshop engagement is to get your orders to you as quickly as possible in perfect condition. All packages are insured to 100% of the value, and Techshop Delivery Protection can be used to ensure immediate re-shipment if a package is lost or damaged.</p>
        <p>All orders are securely packaged. Orders are further protected in an untearable polyurethane satchel, ensuring that your package is not tampered with during delivery.</p>
        <p>To ensure privacy and reduce theft, all packages are anonymous - there is no mention of product contents or Techshop branding on the outside of the packaging.</p>
      </>
    ),
  },
  {
    question: 'Shipping Options',
    answer: (
      <>
        <p>Techshop provides three types of shipping options:</p>
        <ul className="list-disc list-inside">
          <li>Standard Shipping Delivery [deliveryTime: 7-9 days]</li>
          <li>Express Shipping Delivery [deliveryTime: 2-5 days]</li>
          <li>Overtime Shipping Delivery [deliveryTime: 14-21 day]</li>
        </ul>
        <p>Standard Shipping and Overtime Shipping Delivery is our default shipping option: fast and reliable delivery via courier, depending on the destination.</p>
        <p>Express Shipping Delivery uses the fastest possible delivery method: UPS Express, FedEx Express, DHL Express, or Chronopost Express.</p>
      </>
    ),
  },
  {
    question: 'Do you ship internationally?',
    answer: <p>Yes, we ship discretely worldwide ensuring that all logistical or legal restrictions are bypassed.</p>,
  },
  {
    question: 'When will my order be dispatched?',
    answer: (
      <>
        <p>All orders placed before 12PM GMT+1 will be dispatched the same day. All orders placed after this cutoff time will be dispatched the next business day.</p>
        <p>For example:</p>
        <ul className="list-disc list-inside">
          <li>An order placed Friday, 9AM GMT+1 will be dispatched the same day.</li>
          <li>An order placed on Friday, 6PM GMT+1 will be dispatched Saturday.</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Is my delivery protected?',
    answer: <p>All Techshop shipments are insured with the carrier.</p>,
  },
  {
    question: 'My order has missing / incorrect products.',
    answer: (
      <>
        <p>Please contact customer support immediately. For your protection, all orders are photographed before leaving the warehouse. In the case of missing or incorrect products, we will compare a photograph of products received vs. products sent. If the warehouse photo confirms the missing or incorrect product, we will immediately replace or refund the error.</p>
      </>
    ),
  },
  {
    question: 'My parcel was opened / damaged.',
    answer: (
      <>
        <p>Do not accept a shipment that is damaged or opened. Techshop packages are securely prepared in double-wall boxes with an anti-tear shipping satchel. Accidental opening of packages is not possible. If your package is damaged or opened, refuse the parcel.</p>
        <p>If you accept a parcel that has been damaged or opened in transit, Techshop is unable to provide any recourse.</p>
      </>
    ),
  },
  {
    question: 'What are your payment options?',
    answer: <p>Payment can be made through Ramp, our trusted payment partner, enabling efficient order processing  with a variety of payment methods. </p>,
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto mt-11 mb-44">
      <h1 className="mb-8 text-3xl font-semibold text-center">Frequently Asked Questions</h1>
      <div className="my-4 space-y-4">
        {faqData.map((item, index) => (
          <div key={index}>
            <motion.div
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between p-4 border-b cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-lg font-medium">{item.question}</span>
              <FontAwesomeIcon icon={activeIndex === index ? faChevronUp : faChevronDown} />
            </motion.div>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="p-4 space-y-2"
              >
                {item.answer}
              </motion.div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
