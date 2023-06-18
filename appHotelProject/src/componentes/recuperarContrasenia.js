import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.js';
const uri = 'https://st.depositphotos.com/1897095/1642/i/600/depositphotos_16421123-stock-photo-blue-grunge-vignette.jpg';


export default function RecuperarContrasenia({navigation})
{
    const [correo, setCorreo] = React.useState(null)
    
    const enviarCorreo = async () =>
    {
      if(!correo)
      {
        console.log("¡Debe enviar el correo!");
        Alert.alert("Trivago", "¡Debe enviar el correo!");
      }
      else
      {
        try
        {
          const respuesta = await fetch(
            'http://' + global.ip + ':4002/api/autenticacion/recuperarContrasena', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                correo:correo
              }),
  
            }
  
          );

        const json = await respuesta.json();
          
         console.log(json);
          Alert.alert("Trivago", json.msj);
        } catch(error) {
          console.log(error);
          
        }
      }
    };

    return (
      <View style={styles.container}>
        
        <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
       
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
          <BlurView intensity={100}>
             
            <View style={styles.correoR}>
            <Text style={{fontSize: 30, marginBottom: 20, fontWeight: 'bold', color: 'white'}}>Recuperar contraseña</Text>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Correo</Text>
                <TextInput  value={correo} onChangeText = {setCorreo} style={styles.input} placeholder="Nombre de usuario"/>
              </View>
              
              <TouchableOpacity  onPress={enviarCorreo} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Recuperar</Text>
              </TouchableOpacity>
            
            </View>
          </BlurView>
        </ScrollView>
      </View>
    );
  }

  



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    correoR: {
      width: 350,
      height: 280,
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
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      borderColor: '#fff',
      borderWidth: 1,
    }
  
  });