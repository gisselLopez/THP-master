import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import  {useState, useEffect} from 'react';
const uri = 'https://s2.best-wallpaper.net/wallpaper/1920x1200/1303/Coast-hotel-pool-lights-sunset_1920x1200.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.js';

import DatePicker from 'react-native-datepicker'
export default function RegistrarEmpleado({navigation})
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

    const [identidad, setIdentidad] = useState(null)
    const [nombres, setNombres] = useState(null)
    const [apellidos, setApellidos] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [correo, setCorreo] = useState(null)
    const [fechaNacimiento, setFechaNacimiento] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const [contrasenia, setContrasenia] = useState(null)

    const guardarEmpleado = async () =>
    {
      if(!identidad || !nombres || !apellidos || !telefono || !correo || !fechaNacimiento || !usuario|| !contrasenia)
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
                idTipo: 2
              }),
  
            }
  
          );
  
          const json = await registrarUser.json();
       console.log(json.data);
          if(json.data)
          {

            const registrarCuenta = await fetch(
              'http://' + global.ip + ':4002/api/empleados/guardar/', {
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
                  fechaNacimiento:fechaNacimiento
                }),
    
              }
    
            );
           
            console.log(json.data.id);
            const json2 = await registrarCuenta.json();
            
           if(json2.data != "")
           {
              
             console.log("--------------");
             console.log(json2);
            const empleadoP = JSON.stringify(json2.data.id);
            console.log(empleadoP);
            
            
            await AsyncStorage.setItem('Empleado', empleadoP);

              Alert.alert('Trivago', json2.msj, [
                              
                { text: 'OK', onPress: () =>  {navigation.navigate('DashboarEmpleadoSA');} },
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
            <View style={styles.empleado}>
              <Text style={{fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white'}}>Crear cuenta </Text>
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
                <TextInput value={telefono} onChangeText = {setTelefono}  style={styles.input}  placeholder="Telefono"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Correo</Text>
                <TextInput value={correo} onChangeText = {setCorreo}  style={styles.input}  placeholder="Correo"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Fecha de nacimiento</Text>
                 <DatePicker
                    style={{width: 250,
                      height: 40,
                      marginBottom: 20,
                      marginVertical: 10,
                      backgroundColor: '#ffffff90'
                      }}
                    mode="date"
                    placeholder="Seleccione su fecha de nacimiento"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    date={fechaNacimiento} onDateChange={setFechaNacimiento}
                  />
             
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Usuario</Text>
                <TextInput value={usuario} onChangeText = {setUsuario}   style={styles.input}  placeholder="Usuario"/>
              </View>
                <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Contraseña</Text>
                <TextInput value={contrasenia} onChangeText = {setContrasenia}  style={styles.input}  secureTextEntry={true}  placeholder="Contrasenia"/>
              </View>
               <TouchableOpacity onPress={guardarEmpleado} style={[styles.button, {backgroundColor: '#053378'}]}>
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
    empleado: {
      width: 400,
      height: 900,
      borderColor: 'black',
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
  