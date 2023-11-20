import React from 'react';
import '../styles/DescriptionPage.css';
import DarkModeButton from './DarkModeButton';
import CustomLogo from './CustomLogo';
import { useWindowSize } from '../hooks/useWindowSize';

const DescriptionPage = ({ location }) => {
  const [windowWidth, windowHeight] = useWindowSize();

  return (
    <div id="description">
      {/* <DarkModeButton position="absolute" /> */}
      <h1 className="welcome">Welcome to</h1>
      <div className="app-info">
        <CustomLogo width={windowWidth < 362 ? '30px' : '50px'} fontSize={windowWidth < 362 ? '3rem' : '4rem'} color="var(--clr-text-second)" />
        <p className="app-description">
          Manote is a simple note app to memorize all of your important information. Not only plain text, this app also offer a code snippet for programmers.
          <br />
          So you can easily write down the code before it slipped out of your mind.
        </p>
        <a className="to-auth" href="#authForm" style={{ display: windowWidth > 992 ? 'none' : 'block' }}>
          {location}
        </a>
      </div>
      <div className="contact-info">
        <a className="github" href="https://github.com/muhAzis" target="blank">
          <i className="bi bi-github"></i>
          {windowWidth > 576 && 'GitHub'}
        </a>
        {windowWidth > 576 && '|'}
        <a className="instagram" href="https://www.instagram.com/muh_abdulazis/" target="blank">
          <i className="bi bi-instagram"></i>
          {windowWidth > 576 && 'Instagram'}
        </a>
        {windowWidth > 576 && '|'}
        <a className="Linkedin" href="https://www.linkedin.com/in/muhabdulazis/" target="blank">
          <i className="bi bi-linkedin"></i>
          {windowWidth > 576 && 'LinekdIn'}
        </a>
      </div>
    </div>
  );
};

export default DescriptionPage;
