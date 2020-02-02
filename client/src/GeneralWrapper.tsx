import React from 'react';
import { useSelector } from 'react-redux';

import { State } from './store';
import Loader from './components/Loader';
import Booting from './components/Booting';
import Router from './Router';

const GeneralWrapper: React.FC = () => {
  const isBooting = useSelector((state: State) => state.app.isBooting);

  if (isBooting) {
    return (<Booting />);
  }

  return (<>
    <Loader />
    <Router />
  </>);
}

export default GeneralWrapper;
