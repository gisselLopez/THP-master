import React, {useEffect, useState, dispatch} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Room } from './Rooms.js';
import '../../global.js';




export function DetalleReservacion ({route, navigation}) {
  
  useEffect(() => {
      
    buscarUsuario();
    
    }, [true]);
  
    const buscarUsuario = async () => {
      var logeado = JSON.parse(await AsyncStorage.getItem('Token'));
    if(!logeado){
        console.log("Usuario no autenticado");
        
        Alert.alert('Trivago', "Debe iniciar sesion", [
                
          { text: 'OK', onPress: () =>  {navigation.navigate('Login');} },
        ]);
          
    }
  };

  const { idR} = route.params;
  console.log(idR);
  function renderRoom({item: room}) {
    return (
      <Room {...room} 
          onPress={() => {
            navigation.navigate('DetalleHabitacion', {
              id: room.idHabitacion,
              
            });
            
          }}
      
      />
    );
  }
  
  const [rooms, setRooms] = useState([]);
    const listarHabitaciones = async () => {
      try {
        var token = JSON.parse(await AsyncStorage.getItem('Token'));
        let response = await fetch('http://' + global.ip +':4002/api/reservacion/listarHabitacionesXR?id=' + idR, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
         
      });
        let json = await response.json();

        setRooms(json);
   
        
      } catch (error) {
        console.error(error);
      }
    };

    useState(() => 
    { 
      listarHabitaciones();
    }, []);

  
  
  return (

    <View>
      
    
    <FlatList 
    nestedScrollEnabled = {true}
      style={styles.roomsList}
      contentContainerStyle={styles.roomsListContainer}
      data={rooms}
      //onRefresh={onRefresh}
      //refreshing={isFetching}
      renderItem={renderRoom}
      //keyExtractor={room=> room.id}
     
    />
    </View>
    
    
  
    
  );
}

const styles = StyleSheet.create({
  roomsList: {
    backgroundColor: '#eeeeee',
  },
  roomsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  fab: { 
    position: 'absolute', 
    width: 70, 
    height: 70, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#03A9F4', 
    borderRadius: 50, 
    elevation: 8 
    }, 
    fabIcon: { 
      fontSize: 14, 
      color: 'white' 
    }
});
