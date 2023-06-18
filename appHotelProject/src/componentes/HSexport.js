import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import '../../global.js';
//
export function Habitacion({id,tipoHabitacion, imagen,descripcion, precio, numPiso, estado, onPress,onPress2, navigation}) {
  
  /*
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
*/

const uri = 'http://' + global.ip + ':4002/tipoHabitacion/img/' +  imagen;
  return (
    <TouchableOpacity style={styles.card} >
    <Image
      style={styles.thumb}
      source={{ uri}}
   
    />
    <View style={styles.infoContainer}>
      
      <Text style={styles.name}>Habitacion#{id}</Text>
      <Text style={styles.price}>Piso:{numPiso}</Text>
      <Text style={styles.price}>Tipo:{tipoHabitacion}</Text>
      <Text style={styles.price}>Descripcion:{descripcion}</Text>
      <Text style={styles.price}>Precio: L{precio}</Text>
      <Text style={styles.price}>Estado:{estado}</Text>
    </View>
    <View  >
          
          <Button style = {{backgroundColor : '#71EC4C'}} title='Ver Servicios' onPress={onPress2}  />   
          <Button style = {{backgroundColor : '#71EC4C'}} title='Agregar Servicios'  onPress={onPress} /> 
        </View>
  </TouchableOpacity>
  );
}

const styles = {
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
      thumb: {
        height: 260,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
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

  }