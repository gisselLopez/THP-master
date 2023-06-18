import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity,Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import '../../global.js';
//
export function Pisos({id,numPiso, capacidad,estado, onPress,onPress2,navigation}) {
  
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
const eliminar = async() => {
  Alert.alert('Trivago', "¿Esta seguro que desea eliminar esta factura?", [
              
    { text: 'Si', onPress: () =>  {eliminarPiso()}},
    {text : 'No', onPress: () =>{}}

  ])
}

const eliminarPiso = async () => {
  
  

  try {
    
    const eliminarPiso = await fetch(
      'http://' + global.ip + ':4002/api/piso/desactivar?id='+id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    );
   
    const json2 = await eliminarPiso.json();
  

    if(json2.data)
    {
      

      Alert.alert('Trivago', json2.msj);
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

  } catch (error) {
    console.log(error);

  }

};

  return (
    <TouchableOpacity style={styles.buttonContainerStyle} onPress={onPress}>
        <View >
            <Text style={styles.factura}>Piso #{id} </Text>
            <Text>Numero de Piso: {numPiso}</Text>
            <Text>capacidad de personas: {capacidad}</Text>
            <Text>Estado: {estado} </Text>
        </View>
        <View >
           
          <Button title='Editar' onPress={onPress} />
          <Button style = {{backgroundColor : '#71EC4C'}  } title='Eliminar' onPress={eliminar}  /> 
        </View>
    </TouchableOpacity>
  );
}

//<Button style = {{backgroundColor : '#71EC4C'}} title='Ver' onPress={onPress2} />  

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
      height: 165,
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