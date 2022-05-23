import { createContext, useState } from 'react';

//create a context, with createContext api
export const flashContext = createContext();

const FlashContextProvider = props => {
  // this state will be shared with all components
  const [flash, setFlash] = useState();

  return (
    // this is the provider providing state
    <flashContext.Provider value={{ flash, setFlash }}>
      {props.children}
    </flashContext.Provider>
  );
};

export default FlashContextProvider;
