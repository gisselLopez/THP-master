import { Image, Text ,StyleSheet, View, ScrollView,Picker,TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState, useEffect } from 'react';
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const uri = 'https://www.photos-elsoar.com/wp-content/images/Hotel-Bell-On-Counter.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'


export function GuardarPiso ({navigation}) {
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

  const [numPiso, setNumPiso] = useState(null)
  const [capacidad, setCapacidad] = useState(null)
  

  

  const guardarPiso = async () => {
  
    if (!numPiso || !capacidad  ) {
      console.log("Escriba los datos completos");
      Alert.alert("Trivago", "Escriba los datos completos");
    }
    else {
      try {
       
          const registrarPiso = await fetch(
            'http://' + global.ip + ':4002/api/piso/guardar', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              numPiso: numPiso,
              capacidad: capacidad,
        
            }),
  
        }

        );
         
          const json = await registrarPiso.json();
         
  
          if(json.data.id)
          {
      
            Alert.alert('Trivago', json.msj, [
                    
              { text: 'OK', onPress: () =>  {navigation.navigate('DashboardPiso');} },
            ]
            );
          }
          else
          {
            Alert.alert("Trivago",  json.msj);
          }
   
        }catch (error) {
        console.log(error);
         }
   }
};


  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

      <ScrollView>
        <BlurView intensity={30}>
          <View style={styles.factura}>
            <Text style={{ fontSize: 30, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Crear Piso</Text>
            
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Numero de piso</Text>
              <TextInput keyboardType={'numeric'} value={numPiso} onChangeText={setNumPiso} style={styles.input} placeholder="Numero de piso" />
            </View>

            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Capacidad</Text>
              <TextInput value={capacidad} keyboardType={'numeric'} onChangeText={setCapacidad} style={styles.input} placeholder="Capacidad" />
            </View>


            

            <TouchableOpacity onPress={guardarPiso} style={[styles.button, { backgroundColor: '#053378' }]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Crear Piso</Text>
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
    //alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  factura: {
    width: 380,
    height: 350,
    marginTop: 110,
    //borderColor: '#fff',
   // borderWidth: 2,
  //  borderRadius: 10,
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
  input2: {
    width: 200,
    height: 20,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: '#fff',
    borderWidth: 1
  }

});
