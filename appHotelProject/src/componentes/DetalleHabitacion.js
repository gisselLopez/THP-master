import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,
  Alert
  } from 'react-native';
//import { getProduct } from '../services/ProductsService.js';
//import { CartContext } from '../CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import '../../global.js';


export function DetalleHabitacion({route,navigation}) {
  
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

  const { id } = route.params;

   
  const [room, setRoom] = useState([]);

    const listarHabitaciones = async () => {
      try {
        var token = JSON.parse(await AsyncStorage.getItem('Token'));
        let response = await fetch('http://' + global.ip + ':4002/api/habitacion/listarUnahabitacion/?id=' + id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
         
      });
        let json = await response.json();

        setRoom(json);
       // console.log(json);
      } catch (error) {
        console.error(error);
      }
    };

    useState(() => 
    { 
      listarHabitaciones();
    }, []);
    const [service, setService] = useState([]);
    const listarServicios = async () => {
        try {
          var token = JSON.parse(await AsyncStorage.getItem('Token'));
          let response = await fetch('http://' + global.ip + ':4002/api/habitacion/listarservicioshabitacion?id=' + id, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
           
        });
          let json = await response.json();
  
          setService(json);
         // console.log(json);
        } catch (error) {
          console.error(error);
        }
      };
  
      useState(() => 
      { 
        listarServicios();
      }, []);

     console.log(service)
    
    var servicios = "";
   
    if(service.msj)
    {
      if(service.msj != "Null")
      {
        for(var i = 0; i < service.msj.length; i++)
        {
            servicios += (i+1) + '.' + service.msj[i].servicio + ":\n";
            servicios += "\t" + service.msj[i].descripcion + "\n";
            servicios += "\tPrecio: L." + service.msj[i].precio + "\n\n";
        }

      }
      else
      {
        servicios = "No existen servicios para esta habitación";
      }
      

    }
    
   
    //console.log(servicios)

   
    const uri = 'http://' + global.ip + ':4002/tipoHabitacion/img/' + room.imagen;
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
          source={{ uri }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Tipo de habitación: {room.tipoHabitacion}</Text>
          <Text style={styles.description}> Descripción: {room.descripcion}</Text>
          <Text style={styles.price}>Precio: L.{room.precio}</Text>          
          <Text style={styles.description}>Estado: {room.estado}</Text>
          <Text style={styles.name}>Servicios: </Text>
          <Text style={styles.description}>{servicios}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});