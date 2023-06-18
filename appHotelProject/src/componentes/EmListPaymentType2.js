import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity,Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import '../../global.js';

//
export function TiposPagos({id, tipoPago, onPress,onPress2,navigation}) {
  
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
};*/

  return (
    <TouchableOpacity style={styles.buttonContainerStyle} >
        <View >
            <Text style={styles.factura}>Tipo Pago #{id} - {tipoPago} </Text>
                 
        </View>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
    title : 'Prueba'
  },
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
      height: 50,
      marginTop: 11,
      width: '100%',
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
  
    reservacion: {
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