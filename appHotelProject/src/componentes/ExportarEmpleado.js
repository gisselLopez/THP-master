import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import '../../global.js';

export function Empleados({id,identidad,nombres,apellidos,telefono,correo,fechaNacimiento, usuario,estado, onPress,navigation}) {
  
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
  return (
      <View style={styles.componentContainerStyle}>
  <ScrollView>
  
    <TouchableOpacity style={styles.buttonContainerStyle} onPress={onPress}>
        <View >
            <Text style={styles.listados}>Empleado: {id}</Text>
            <Text>Identidad: {identidad}</Text>
            <Text>Nombres: {nombres}</Text>
            <Text>Apellidos: {apellidos}</Text>
            <Text>Telefono: {telefono}</Text>
            <Text>Correo: {correo}</Text>
            <Text>Fecha de nacimiento: {fechaNacimiento}</Text>
            <Text>Usuario: {usuario}</Text>
             <Text>Estado: {estado}</Text>
            
        </View>
    </TouchableOpacity>
    </ScrollView>
      </View>
  );
}

const styles = {
    componentContainerStyle: {
      flex: 1,
      backgroundColor: 'rgb(235,235,235)',
   
    },
    contentContainerStyle: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
    },
    buttonContainerStyle: {
      //Darle forma a la carta, altura y ancho
      height: '100%',
      marginTop: 11,
      width: '80%',
      backgroundColor: 'white',
      backgroundColor:'#FFFFFF',
      marginLeft:'auto',
      marginRight:'auto',
      
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      paddingBottom: 5,
      flexDirection: 'row',
      //color de la carta
      backgroundColor: 'white',
      borderWidth: Platform.OS === 'ios' ? .5 : 1,
      borderRadius: 2,
      borderColor:  Platform.OS === 'ios' ? 'rgb(225, 225, 225)' : 'rgba(0,0,0,.0)',
      
      
      // shadow
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 2.5,
  
      elevation: 2,
    },
  
    listados: {
      fontSize: 15,
      fontWeight: 'bold',
     
      
    },
     listados2: {
      fontSize: 15,
      fontWeight: 'bold',
      
      
    },
  
    detalle: {
      
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 120,
      color: 'blue'
      
    },
  
    detalle2: {
      
      
      color: '#a0a8a8'
      
    },
  }