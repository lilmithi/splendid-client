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
      <div className="flex items-center w-full">
        <div className="flex flex-col w-full gap-3 justify-around items-center pb-2 border-b">
          <h3 className="text-white my-4 font-bold text-xl">Splendid Events</h3>
          <div className="flex justify-center items-center gap-6">
            <input
              type="text"
              placeholder="Enter your Mail"
              className="p-4 rounded-lg"
            />
            <button className="h-full bg-purple-600 text-white p-4 rounded-lg">
              Subscribe
            </button>
          </div>
          <div className="flex justify-around mt-2 gap-12 items-center text-white">
            <p>Home</p>
            <p>About</p>
            <p>Services</p>
            <p>Get in touch</p>
            <p>FAQs</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Footer;
