import logo from './logo.svg';
import styl from './Logo.styl';

function Logo() {
  return (
    <>
      <img src={logo} width="305" height="92" className={styl.logo} alt="" />
    </>
  );
}

export default Logo;
