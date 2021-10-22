import React from "react";
import "../css/styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>Created by Alex Baranov</div>
      <div>Contact me at</div>
      <a
        href="https://github.com/SaltyByte"
        className="hyperlink"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
      <a
        className="hyperlink"
        href="https://www.linkedin.com/in/alex-baranov-6296591b2/"
        target="_blank"
        rel="noreferrer"
      >
        Linkedin
      </a>
      <a
        className="hyperlink"
        href="mailto: ab.alexbaranov@gmail.com"
        target="_blank"
        rel="noreferrer"
      >
        Send Email
      </a>
    </div>
  );
};

export default Footer;
