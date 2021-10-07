
import React, { useState } from 'react';

const AppContext = React.createContext([{}, () => {}]);
const AppProvider = (props) => {
  const [AppState, setAppState] = useState(
    {
    selectedListIndex: 0,
    lists: [
      {
        name: 'Mat vecka 32',
        items: [{
          title: 'Lista nr 1',
          created: '2021-09-26T19:48',
          done: false,
          star:false
        },
        {
          title: 'Lista nr 1',
          created: '2021-09-26T19:48',
          done: false,
          star:false
        }]
      },
      {
        name: 'Att göra innan flytten',
        items: [{
          title: 'List nr 2',
          created: '2021-09-26T19:48',
          done: false,
          star:false
        },
        {
          title: 'List nr 2',
          created: '2021-09-26T19:48',
          done: false,
          star:false
        }]
      }
    ]
    }
  );
  return (
    <AppContext.Provider value={[AppState, setAppState]}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };