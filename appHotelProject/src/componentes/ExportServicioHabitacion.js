import React from 'react';
import {Text,Alert, Image, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';
import '../../global.js';
import { CurrentRenderContext } from '@react-navigation/native';
//
export function ServicioHabitacion({idHabitacion, id, servicio, descripcion, precio, navigation}) {
 
/*useEffect(() => {
    
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
const eliminar = async() => {
  Alert.alert('Trivago', "¿Esta seguro que desea eliminar esta factura?", [
              
    { text: 'Si', onPress: () =>  {eliminarDetalleServicio()}},
    {text : 'No', onPress: () =>{}}

  ])
}

const eliminarDetalleServicio = async () => {
  
  

  try {
    
    const eliminarDetalleServicio = await fetch(
      'http://' + global.ip + ':4002/api/destalleservicios/eliminar?idHabitacion='+idHabitacion + '&id=' + id,{
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    );
   
    const json2 = await eliminarDetalleServicio.json();
  

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
    <TouchableOpacity style={styles.card} >
  
    <View style={styles.infoContainer}>
      
      <Text style={styles.name}>{servicio}</Text>
      <Text style={styles.price}>{descripcion}</Text>
      <Text style={styles.price}>Precio: L{precio}</Text>
 
    </View>
    <View  >
          
          <Button style = {{backgroundColor : '#71EC4C'}} title='Eliminar Servicio' onPress={eliminar} /> 
        </View>
  
  </TouchableOpacity>
  );
}

const styles = {
  card: {
      marginTop:19,
      width:300,
      justifyContent: 'center',
      backgroundColor: 'white',
      backgroundColor:'#FFFFFF',
      justifyContent:'center',
      marginLeft:'auto',
      marginRight:'auto',
      
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 1,
      marginVertical: 20,
    },
    thumb: {
      height: 200,
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
      textAlign: 'center'
      
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
     
    },

}