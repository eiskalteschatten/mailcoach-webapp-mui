import React from 'react';
import { useSelector } from 'react-redux';

import { State } from './store';
import Loader from './components/Loader';
import Booting from './components/Booting';
import Main from './components/Main';

const GeneralWrapper: React.FC = () => {
  const isBooting = useSelector((state: State) => state.app.isBooting);

  if (isBooting) {
    return (<Booting />);
  }

  return (<>
    <Loader />
    <Main />
  </>);
}

export default GeneralWrapper;
