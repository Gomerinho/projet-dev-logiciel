import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      <Link href={'/legals'}>Mentions légales</Link>
      <p>© GOMES VITORINO Marvin , 2022</p>
      <Link href={'/contact'}>Contact </Link>
    </footer>
  );
};

export default Footer;
