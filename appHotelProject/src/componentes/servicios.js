import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import  {useState, useEffect} from 'react';
const uri = 'https://s2.best-wallpaper.net/wallpaper/1920x1200/1201/Long-bridge-leading-to-another-island-beach_1920x1200.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegistrarServicio({navigation})
{
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

    const [servicio, setServicio] = useState(null)
    const [descripcion, setDescripcion] = useState(null)
    const [precio, setPrecio] = useState(null)


    const guardarServicio = async () =>
    {
      if(!servicio || !descripcion || !precio )
      {
        console.log("Escriba los datos completos");
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      else
      {
        try
        {
          const guardarServicio = await fetch(
            'http://' + global.ip + ':4002/api/servicios/guardar', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                servicio: servicio,
                descripcion: descripcion,
                precio: precio
              }),
  
            }
  
          );
  
            const json = await guardarServicio.json();
            console.log(json);
            var mensaje = "";
            mensaje += json.msj;
              for(var i = 0; i < json.length; i++)
              {
                mensaje += (i+1) + '.' + json[i].msg + "\n";
              }
              Alert.alert("Trivago",  mensaje);
              console.log(mensaje);
          
        } catch(error) {
        console.log(error);
          
        }
      }
    };

    return(
        <View style={styles.container}>
        <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
       
        <ScrollView> 
          <BlurView intensity={30}>
            <View style={styles.cliente}>
              <Text style={{fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white'}}>Crear Servicio</Text>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Servicio</Text>
                <TextInput value={servicio} onChangeText = {setServicio} style={styles.input} placeholder="Servicio"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Descripcion</Text>
                <TextInput value={descripcion} onChangeText = {setDescripcion}   style={styles.input}  placeholder="Descripcion"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Precio</Text>
                <TextInput value={precio} keyboardType={'numeric'} onChangeText = {setPrecio}  style={styles.input}  placeholder="Precio"/>
              </View>
    
              <TouchableOpacity onPress={guardarServicio} style={[styles.button, {backgroundColor: '#053378'}]}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Crear</Text>
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
    cliente: {
      width: 400,
      height: 900,
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
  