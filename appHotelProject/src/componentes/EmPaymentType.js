import { Image, Text ,StyleSheet, View, ScrollView,Picker,TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState,useEffect } from 'react';
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const uri = 'https://www.photos-elsoar.com/wp-content/images/Hotel-Bell-On-Counter.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'


export function GuardarTipoPago ({navigation}) {
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


  const [tipoPago, setTipoPago] = useState("Efectivo")


    console.log("************");
    console.log(tipoPago);
  const GuardarTipoPago = async () => {
  
    if (!tipoPago ) {
      console.log("Escriba los datos completos");
      Alert.alert("Trivago", "Escriba los datos completos");
    }
    else {
      try {
       
          const registrarTipoPago = await fetch(
            'http://' + global.ip + ':4002/api/tipopago/guardar', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
              tipoPago: tipoPago,
            }),
  
        }

        );
         
          const json = await registrarTipoPago.json();
         
  
          if(json.data.id)
          {
      
            Alert.alert('Trivago', json.msj, [
                    
              { text: 'OK', onPress: () =>  {navigation.navigate('DashboardTipoPago');} },
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

            <View>
          <Text style={{ fontSize: 30, marginBottom: 10, fontWeight: 'bold', color: 'white' }}>Tipo Pago</Text>
          <Picker
            selectedValue={tipoPago}
            style= {[styles.input , { color: 'white' }]} 
            onValueChange={(itemValue, itemIndex) => setTipoPago(itemValue)}
           >
            <Picker.Item  label="Efectivo" value= "Efectivo"/> 
            <Picker.Item  label="Tarjeta" value= "Tarjeta"/>
          </Picker>
           </View>

            <TouchableOpacity onPress={GuardarTipoPago} style={[styles.button, { backgroundColor: '#053378' }]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Crear Tipo Pago</Text>
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
  factura: {
    width: 350,
    height: 450,
    marginTop: 80,
    padding: 10,
    alignItems: 'center',
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
