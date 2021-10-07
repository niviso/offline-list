import React,{useContext,useEffect,useState} from 'react';
import { Text, TouchableOpacity, View,ScrollView,Image,TextInput} from 'react-native';
import {AppContext} from '../contexts/appContext'
import StarNoFillIcon from '../assets/star_nofill.png';
import StarFillIcon from '../assets/star_fill.png';



function ListItem(props) {
    const {item,index} = props;
    const [state,setState] = useContext(AppContext);
    const [swiping,setSwiping] = useState(false);
    const ToggleStar = () => {
      console.log("toggle");
        let listCopy = JSON.parse(JSON.stringify(state.lists));
        listCopy[state.selectedListIndex].items[index].star = !listCopy[state.selectedListIndex].items[index].star;
        setState({...state,lists:listCopy});
    }

    useEffect(() => {
      console.log("updated");
    },[state]);
    return (
        <View key={index} style={{display: 'flex',opacity: item.done ? 0.2 : 1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width: '100%',backgroundColor:index % 2 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.0)',padding: 20}}>
        <TouchableOpacity onPress={ToggleStar} style={{textAlign:'left',width:'33%'}}>
        <Image resizeMode="contain" source={item.star ? StarFillIcon : StarNoFillIcon} style={{flex:1,width: 50,height:50}} />
        </TouchableOpacity>
        <Text style={{textAlign:'center',fontSize: 20,width:'33%'}}>
        {item.title}
        </Text>
        <Text style={{textAlign:'right',width:'33%',opacity: 0.2,fontSize: 10}}>
        {item.created}
        </Text>
      </View>
    )
}

export default function List(props) {
    const {route,setRoute} = props;
    const [state,setState] = useContext(AppContext);

    useEffect(() => {
       // setRoute({title: route.name});
    });
  return (
    <>
    <ScrollView style={{height:'100%',width:'100%'}}>
    <View style={{minHeight: 500}}>
    <View style={{padding: 10,backgroundColor:'gray',opacity:0.8,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <Text style={{color:'white',width:'50%',textAlign:'center'}}>Active items</Text>
    <Text style={{color:'white',width:'50%',textAlign:'center'}}>History</Text>
    </View>
    {
    state.lists[state.selectedListIndex].items.map((item,index) => {
      return(
          !item.done && <ListItem key={index} item={item} state={state} setState={setState} index={index}/>
      )
      }
    )
    }
    </View>
    <View style={{padding: 20,backgroundColor:'lightgray'}}>
    <Text style={{fontSize: 25}}>🎤</Text>
    <TextInput style={{borderBottomWidth:2,borderBottomColor:'black',fontSize:14,textAlign:'center',padding:10}} placeholder="new item"/>
    </View>
{
    state.lists[state.selectedListIndex].items.map((item,index) => {
      return(
          item.done && <ListItem key={index} item={item} state={state} setState={setState} index={index}/>
      )
      }
    )
    }
    </ScrollView>
    </>
  );
}


