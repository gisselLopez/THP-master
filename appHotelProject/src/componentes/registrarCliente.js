import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import  {useState, useEffect} from 'react';
const uri = 'https://s2.best-wallpaper.net/wallpaper/1920x1200/1201/Long-bridge-leading-to-another-island-beach_1920x1200.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'
import '../../global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegistrarCliente({navigation})
{
    const [identidad, setIdentidad] = useState(null)
    const [nombres, setNombres] = useState(null)
    const [apellidos, setApellidos] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [correo, setCorreo] = useState(null)
    const [direccion, setDireccion] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const [contrasenia, setContrasenia] = useState(null)

    const guardarCliente = async () =>
    {
      if(!identidad || !nombres || !apellidos || !telefono || !correo || !direccion || !usuario || !contrasenia)
      {
        console.log("Escriba los datos completos");
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      else
      {
        try
        {
          const registrarUser = await fetch(
            'http://' + global.ip + ':4002/api/usuarios/guardar', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                usuario: usuario,
                contrasenia: contrasenia,
                idTipo: 1
              }),
  
            }
  
          );
  
          const json = await registrarUser.json();
       console.log(json);
          if(json.data != "")
          {

            const registrarCuenta = await fetch(
              'http://' + global.ip + ':4002/api/clientes/guardar/', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  identidad:identidad,
                  nombres: nombres,
                  apellidos: apellidos,
                  telefono:telefono,
                  correo:correo,
                  direccion:direccion

                }),
    
              }
    
            );
           
            console.log(json.data.id);
            const json2 = await registrarCuenta.json();
            
           if(json2.data != "")
           {
             console.log("--------------");
             console.log(json2);
            const clienteP = JSON.stringify(json2.data.id);
            console.log(clienteP);
            
            
            await AsyncStorage.setItem('Cliente', clienteP);

              Alert.alert('Trivago', json2.msj, [
                              
                { text: 'OK', onPress: () =>  {navigation.navigate('Login');} },
              ])
           }
           else
           {
            const eliminarUsuario = await fetch(
              'http://' + global.ip + ':4002/api/usuarios/eliminar?id=' + json.data.id, {
                method: 'Delete',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },

                
              }
    
            );

              await eliminarUsuario.json();
              console.log(json2);
              var mensaje = "";
              mensaje += json2.msj + "\n";
              for(var i = 0; i < json2.length; i++)
              {
                mensaje += (i+1) + '.' + json2[i].msg + "\n";
              }
              Alert.alert("Trivago",  mensaje);
              console.log(mensaje);
           }
              //Alert.alert("Trivago", json2.msj);
            
            
              //Alert.alert("Trivago", json2[0].msg);
              //console.log(json2[0].msg);
          }
          else{
            var mensaje = "";
            mensaje += json.msj;
              for(var i = 0; i < json.length; i++)
              {
                mensaje += (i+1) + '.' + json[i].msg + "\n";
              }
              Alert.alert("Trivago",  mensaje);
              console.log(mensaje);
          }
          
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
              <Text style={{fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white'}}>Crear cuenta</Text>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Identidad</Text>
                <TextInput value={identidad} onChangeText = {setIdentidad} style={styles.input} placeholder="Identidad"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nombres</Text>
                <TextInput value={nombres} onChangeText = {setNombres}   style={styles.input}  placeholder="Nombres"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Apellidos</Text>
                <TextInput value={apellidos} onChangeText = {setApellidos}  style={styles.input}  placeholder="Apellidos"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Telefono</Text>
                <TextInput keyboardType={'numeric'} value={telefono} onChangeText = {setTelefono}  style={styles.input}  placeholder="Telefono"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Correo</Text>
                <TextInput value={correo} onChangeText = {setCorreo}  style={styles.input}  placeholder="Correo"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Dirección</Text>
                <TextInput value={direccion} onChangeText = {setDireccion}  style={styles.input}  placeholder="Dirección"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Usuario</Text>
                <TextInput value={usuario} onChangeText = {setUsuario}   style={styles.input}  placeholder="Usuario"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Contraseña</Text>
                <TextInput value={contrasenia} onChangeText = {setContrasenia}  style={styles.input}  secureTextEntry={true}  placeholder="Contrasenia"/>
              </View>
    
              <TouchableOpacity onPress={guardarCliente} style={[styles.button, {backgroundColor: '#053378'}]}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Crear cuenta</Text>
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
  