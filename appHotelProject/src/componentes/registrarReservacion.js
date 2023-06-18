import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {useEffect} from 'react';

import DatePicker from 'react-native-datepicker'
const uri = 'https://www.photos-elsoar.com/wp-content/images/Hotel-Bell-On-Counter.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'


export function RegistrarReservacion ({navigation}) {
  
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

  const [fechaEntrada, setFechaEntrada] = useState(null)
  const [fechaSalida, setFechaSalida] = useState(null)
  const [observacion, setObservacion] = useState(null)


  
  const guardarReservacion = async () => {
    console.log(fechaEntrada +  ' ' + fechaSalida)
    if (!fechaEntrada || !fechaSalida) {
      console.log("Escriba los datos completos");
      Alert.alert("Trivago", "Escriba los datos completos");
    }
    else {
      try {
        var idCliente = JSON.parse(await AsyncStorage.getItem('Cliente'));
        var token = JSON.parse(await AsyncStorage.getItem('Token'));
        const registrarReservacion = await fetch(
          'http://' + global.ip + ':4002/api/reservacion/guardar', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({
            idCliente: idCliente,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida,
            impuesto: 0.15,
            observacion: observacion,
            estado: "En proceso"
          }),

        }

        );
       
        const json = await registrarReservacion.json();
        console.log(json);

        if(json.data != "")
        {
    
          Alert.alert('Trivago', 'Ahora escogerá las habitaciones disponibles', [
                  
            { text: 'OK', onPress: () =>  {navigation.navigate('RoomsList', {
              fechaEntradaP: fechaEntrada,
              fechaSalidaP: fechaSalida
            });} },
          ]);
      }
      else
      {
        
        
        Alert.alert("Trivago",  json.msj);
       
      }

      } catch (error) {
        console.log(error);

      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

      <ScrollView>
        <BlurView intensity={30}>
          <View style={styles.reservacion}>
            <Text style={{ fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Crear Reservacion</Text>
            <View> 
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Fecha Entrada</Text>
            <DatePicker
              style={{width: 250,
                height: 40,
                marginBottom: 20,
                marginVertical: 10,
                backgroundColor: '#ffffff90',
                }}
              mode="date"
              placeholder="Seleccione una fecha de Entrada"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={fechaEntrada} onDateChange={setFechaEntrada}
            />
            </View>

            <View> 
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Fecha Salida</Text>
            <DatePicker
              style={{width: 250,
                height: 40,
                marginBottom: 20,
                marginVertical: 10,
                backgroundColor: '#ffffff90'
                }}
              mode="date"
              placeholder="Seleccione una fecha de Entrada"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={fechaSalida} onDateChange={setFechaSalida}
            />
            </View>
            
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Observacion</Text>
              <TextInput value={observacion} onChangeText={setObservacion} style={styles.input} placeholder="Observaciones" />
            </View>


            <TouchableOpacity onPress={guardarReservacion} style={[styles.button, { backgroundColor: '#053378' }]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Crear Reservacion</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reservacion: {
    width: 400,
    height: 450,
    marginTop: 110,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1
  }

});
