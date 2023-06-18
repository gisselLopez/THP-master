import React, {useEffect, useState, dispatch} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Room } from './Rooms.js';
import '../../global.js';




export function RoomsList ({route, navigation}) {
  
  
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

  const { fechaEntradaP, fechaSalidaP, data} = route.params;

  function renderRoom({item: room}) {
    return (
      <Room {...room} 
          onPress={() => {
            navigation.navigate('RoomsDetails', {
              id: room.id,
              fechaEntrada: fechaEntradaP,
              fechaSalida :  fechaSalidaP,
            });
            
          }}
      
      />
    );
  }
  
  const [rooms, setRooms] = useState([]);
    const listarHabitaciones = async () => {
      try {
        var token = JSON.parse(await AsyncStorage.getItem('Token'));

        let response = await fetch('http://' + global.ip +':4002/api/reservacion/listarHabitacionesDisponibles', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({
            fechaEntrada: fechaEntradaP,
            fechaSalida: fechaSalidaP

          }),

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

    

    useEffect(() => {
      let interval
  
      const updateCounter = () => {
        listarHabitaciones();
      }
  
      interval = setInterval(() => {
        updateCounter()
      }, 1000)
  
      return () => {
        // Clear the interval when component is unmounted
        clearInterval(interval)
      }
    }, [])

    
  
 /* const [isFetching, setIsFetching] = useState(false);

 
  const onRefresh = () => {

    setIsFetching(true);
    listarHabitaciones();
    setIsFetching(false);

  };*/

  const EliminarReservacionSinHabitacion = async () => 
  {
    if(!data)
    {
      var token = JSON.parse(await AsyncStorage.getItem('Token'));

      let eliminar = await fetch(
        'http://' + global.ip + ':4002/api/reservacion/eliminarReservacionSinHabitacion', {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        }
      );
    }
   
    
    Alert.alert('Trivago', 'Usted esta saliendo al Menu Principal', [
                
      { text: 'OK', onPress: () =>  {navigation.navigate('Dashboard');} },
    ]);
  }
 
  
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
      keyExtractor={room=> room.id}
     
    />
    <View style={styles.container}>
       
        <TouchableOpacity onPress={EliminarReservacionSinHabitacion} style={styles.fab}>
          <Text style={styles.fabIcon}>Regresar</Text>
        </TouchableOpacity>
      </View>
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
