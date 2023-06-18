import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import '../../global.js';
//
export function Habitaciones({id,tipoHabitacion, estado, precio, onPress,navigation}) {
  
  /*
useEffect(() => {
    
  buscarCliente();

}, [true]);

const buscarCliente = async () => {
var idCliente = JSON.parse(await AsyncStorage.getItem('Cliente'));
if(!idCliente){
    console.log("Usuario no autenticado");
    
    Alert.alert('Trivago', "Debe iniciar sesion", [
            
      { text: 'OK', onPress: () =>  {navigation.navigate('Login');} },
    ]);
      
}
};
*/

  return (
    <TouchableOpacity style={styles.buttonContainerStyle} onPress={onPress}
        >
        <View >
            <Text style={styles.servicio}>Habitacion#{id}</Text>
            <Text>Tipo Habitación:{tipoHabitacion}</Text>
            <Text>Precio:{precio}</Text>
            <Text>Estado:{estado}</Text>
           
            
            
        </View>
     
    </TouchableOpacity>
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
      height: 100,
      marginTop: 11,
      width: '70%',
      backgroundColor: 'white',
      backgroundColor:'#FFFFFF',
      marginLeft:'auto',
      marginRight:'auto',
      
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      paddingBottom: 3,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderWidth: Platform.OS === 'ios' ? .5 : 0,
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
  
    servicio: {
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