import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import '../../global.js';
//
export function Reservaciones({id,nombreCliente,identidad,fechaEntrada, fechaSalida,subtotal,impuesto,estado, onPress, onPress2,navigation}) {
  
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

const eliminar = async() => {
  Alert.alert('Trivago', "¿Esta seguro que desea cancelar esta reservacion?", [
              
    { text: 'Si', onPress: () =>  {cancelarReservacion()}},
    {text : 'No', onPress: () =>{}}

  ])
}

const cancelarReservacion = async () => {


  try {
    
    if(estado == "En proceso")
      {
    const eliminarReservacion = await fetch(
      'http://' + global.ip + ':4002/api/reservacion/cancelar?id='+id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    );
   
    const json2 = await eliminarReservacion.json();
    console.log("************");
    console.log(estado);

    if(json2.data)
    {
      
      Alert.alert('Trivago',json2.msj);
      
    
  }
  else
  {
    
        var mensaje = "";
          for(var i = 0; i < json2.length; i++)
          {
            mensaje += (i+1) + '.' + json2[i].msj + "\n";
          }
          Alert.alert("Trivago",  mensaje);
          console.log(mensaje);
        
        
  }
      }
      else
      {
        Alert.alert("Trivago",  "Solo puede cancelar las reservaciones que aun estan en proceso");
      }
  } catch (error) {
    console.log(error);

  }

};


  return (
    <TouchableOpacity style={styles.buttonContainerStyle} onPress={onPress}
        >
        <View >
        <Text style={styles.reservacion}>Reservacion #{id} - {estado}  </Text>
            <Text>De {fechaEntrada} a {fechaSalida}</Text>
            <Text>Cliente: {nombreCliente} - {identidad}</Text>
            <Text>Impuesto: {impuesto*100}%</Text>
            <Text>Total: L.{(subtotal*impuesto) + subtotal}</Text>
            
        </View>
        <View  >
         
          <Button style = {{backgroundColor : '#71EC4C'}} title='Ver' onPress={onPress} />   
          <Button title='Cancelar' onPress={eliminar} />
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
      height: 110,
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