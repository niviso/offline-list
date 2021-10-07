import React,{useState} from 'react';
import { AppProvider } from "./contexts/appContext";
import { StatusBar } from 'expo-status-bar';
import Route from './views/index';


export default function App() {
  const [state,setState] = useState(
    [
      {
        name: 'test',
        items: ['Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum','Lorem ipsum']
      }
    ]
  );


  return (
    <AppProvider>
    <Route/>
    <StatusBar style="light"/>
    </AppProvider>
  );
}


