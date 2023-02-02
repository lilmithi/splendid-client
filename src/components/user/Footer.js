import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full h-[40vh] bg-[#0A075F] mt-auto">
      <div className="flex justify-between items-center bg-[#6f42c1] p-4">
        <h3 className="text-white">
          Get connected with us on our social networks
        </h3>
        <div className="text-white flex items-center gap-4">
          <a href="https://www.facebook.com">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com">
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/martin-mithi-487a39210/">
            <FaLinkedin />
          </a>
          <a href="https://www.github.com/lilmithi">
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <h3>Splendid Events</h3>
          <p>lorem</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
