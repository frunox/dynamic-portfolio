import React from "react";
import ContactComp from "../components/Contact";
import HomeNav from "../components/HomeNav";

function Contact() {
  return (
    <div className='home'>
      <HomeNav />
      <ContactComp></ContactComp>
    </div>
  );
}

export default Contact;
