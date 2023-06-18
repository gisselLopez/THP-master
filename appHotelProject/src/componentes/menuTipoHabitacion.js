import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

import  {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function DashboardTipoHabitacion({navigation}) {

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
  
  
const cerrarSesion = async() => 
{
  await AsyncStorage.removeItem('Cliente');
  await AsyncStorage.removeItem('Token');
  Alert.alert('Trivago', 'Gracias por usar la aplicacion', [
                
    { text: 'OK', onPress: () =>  {navigation.navigate('Login');} },
  ])
}

  return (
    <View style={styles.container}>
        <View style={styles.btnLayout} >
         
          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: '#6eccfc' }]}
            onPress={() => navigation.navigate('TipoHabitacion') }
            >
            <Image 
              source={require('../iconos/Piso2.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Crear Tipo habitacion</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.buttonContainer, { backgroundColor: '#0ae299'}]}
            onPress={() => navigation.navigate('TiposHabitaciones')}
            >
            <Image 
            source={require('../iconos/Piso2.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Tipos de Habitaciones</Text>
          </TouchableOpacity>


        </View>
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 2,
    width: '100%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  },
  menuImg: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
  },
  userContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  avatarImg: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backgroundImg: {
    zIndex: -1,
    position: 'absolute',
    width: '100%',
  },
  btnLayout: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
    marginTop:20
  },
  buttonContainer: {
    width: '80%',
    height: '25%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }, 
  buttonContainer2: {
    width: '80%',
    height: '10%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },  
});
