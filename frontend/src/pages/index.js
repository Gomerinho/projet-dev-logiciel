import { useEffect, useState, useContext } from 'react';
import Button from '../components/Button/Button';
import TitlePage from '../components/TitlePage';
import { flashContext } from '../context/FlashProvider';

export default function Home() {
  const flash = useContext(flashContext);

  return (
    <div className='page__home'>
      <TitlePage title='Home Page' />
    </div>
  );
}
