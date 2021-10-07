import React,{useEffect, useState,useContext} from 'react';
import {AppContext} from '../contexts/appContext'
import List from './list';
import { Text, TouchableOpacity, View,Dimensions,Image,Alert } from 'react-native';
import SwipeList from './swipeList';

function Overview(props){
    const [state,setState] = useContext(AppContext);
    const SelectList = (index) => {
        setState({...state,selectedListIndex:index});
        props.goto('list',"test",true);
    }
    return (
    <>
    {
    state.lists.map((list,index) => {
    return (<TouchableOpacity key={index} style={{padding: 20,height: 100,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:index % 2 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.0)'}} onPress={() => SelectList(index)}>
    <Text style={{fontSize: 22}}>{list.name}</Text>
    <Text style={{opacity:0.5}}>{list.items.length} items</Text>
    </TouchableOpacity>
    )
    })
    }
    </>
    )
}

export default function Route(){
    const [route,setRoute] = useState({
        title: 'Title',
        name: 'overview',
        history: [],
        action: null,
        routes: [],
        goBack: false
    });

    useEffect(() => {
        goto(route.name);
    },[]);
    
    const UpdateRouter = (obj) => {
        setRoute({...route,...obj});
    }

    const goto = (name,title,goBack=false) => {
        setRoute({...route,name:name,title:title ? title : name,history:[route.name,...route.history],goBack:goBack});
    }

    const goBack = () => {
        if(route.history.length > 0){
            setRoute({
                ...route,
                title: route.history[0],
                name: route.history[0],
                history: [...route.history.slice(1,route.history.length)],
                goBack: false
            });
        }
    }

    


    const Route = (props) => {
        //Add to routes list and generate menu from that
        const {Component,name} = props;
        return route.name == name ? <Component route={route} setRoute={UpdateRouter} goto={goto}/> : null
    }


    const Add = () => {
        Alert.prompt(
          "New list item",
          "",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "Add",
              onPress: password => console.log("OK Pressed, password: " + password)
            }
          ],
        );
      }
    

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    const header = height * 0.15;
    const body = height * 0.85;

    return (
        <View style={{display:'flex'}}>
            <View style={{height: header,padding: 10,width:'100%',backgroundColor:'gray',display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={goBack} style={{width:'30%'}}><Text style={{fontSize: 18,color: 'white',width:'60%', textAlign:'center'}}>{route.goBack ? 'Back' : null}</Text></TouchableOpacity>
                <Text style={{fontSize: 32,color: 'white',width:'40%', textAlign:'center'}}>{route.title}</Text>
                <TouchableOpacity style={{width:'30%'}} onPress={Add}><Text style={{fontSize: 32,color: 'white', textAlign:'right'}}>+</Text></TouchableOpacity>
            </View>
            <View style={{height: body}}>
                <Route name="overview" Component={Overview}/>
                <Route name="list" Component={List}/>
            </View>

        </View>
    )

}