import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../global.js';
const uri = 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'



export default function Login({navigation})
{
    const [usuario, setUsuario] = React.useState(null)
    const [contrasenia, setContrasenia] = React.useState(null)
    const presIniciarSesion = async () =>
    {
      if(!usuario || !contrasenia)
      {
        console.log("¡Debe llenar todos los campos!");
        Alert.alert("Trivago", "¡Debe llenar todos los campos!");
      }
      else
      {
        try
        {
          const respuesta = await fetch(
            'http://' + global.ip + ':4002/api/autenticacion/iniciosesion', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                usuario: usuario,
                contrasenia: contrasenia
              }),
  
            }
  
          );

        const json = await respuesta.json();

        if(!json.data.token)
        {
          Alert.alert('Trivago', "Usuario o contraseña incorrecta");
        }
        else
        {
          
          const token = JSON.stringify(json.data.token);
         // const token = json.data.token;
          
          await AsyncStorage.setItem('Token', token);
          
          if(json.data.data.idTipo == 1)
          {
            const resp = await fetch(
              //para probar con el empleado
              //'http://' + global.ip + ':4002/api/empleados/buscarUsuario?id=' + json.data.data.id, {
              'http://' + global.ip + ':4002/api/clientes/buscarUsuario?id=' + json.data.data.id, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
              }
    
            );
            const json2 = await resp.json();
            const clienteP = JSON.stringify(json2.id);
            await AsyncStorage.setItem('Cliente', clienteP);
            Alert.alert('Trivago', "Bienvenido", [
                  
              { text: 'OK', onPress: () =>  {navigation.navigate('Dashboard');} },
            ]);
          }
          else if (json.data.data.idTipo == 2)
          {
            const respE = await fetch(
            //para probar con el empleado
            'http://' + global.ip + ':4002/api/empleados/buscarUsuario?id=' + json.data.data.id, {
           
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }
  
          );

          const jsonE = await respE.json();
          const empleadop = JSON.stringify(jsonE.id);
          await AsyncStorage.setItem('Empleado', empleadop);
            Alert.alert('Trivago', "Bienvenido", [
                  
              { text: 'OK', onPress: () =>  {navigation.navigate('DashboardEmpleado');} },
            ]);
          }

          else if (json.data.data.idTipo == 3)
          {
            const respE = await fetch(
              //para probar con el empleado
              'http://' + global.ip + ':4002/api/empleados/buscarUsuario?id=' + json.data.data.id, {
             
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
              }
    
            );

            const jsonE = await respE.json();
          const empleadop = JSON.stringify(jsonE.id);
          await AsyncStorage.setItem('Empleado', empleadop);
            Alert.alert('Trivago', "Bienvenido", [
                  
              { text: 'OK', onPress: () =>  {navigation.navigate('DashboardEmpleadoAdmin');} },
            ]);
          }
        
        }
    
          //var mensaje = json.msj + '\n' + 'Su token es: ' + idCliente;
          
  
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
          <BlurView intensity={30}>
            <View style={styles.login}>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Usuario</Text>
                <TextInput  value={usuario} onChangeText = {setUsuario} style={styles.input} placeholder="Nombre de usuario"/>
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
                <TextInput  style={styles.input}  secureTextEntry={true} value={contrasenia} onChangeText = {setContrasenia}  placeholder="Contraseña"/>
              </View>
              <TouchableOpacity  onPress={presIniciarSesion} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Ingresar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  {navigation.navigate('RegistrarCliente');}} style={[styles.button, {backgroundColor: '#6792F090'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear cuenta</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  {navigation.navigate('RecuperarContrasenia');}} style={[styles.button, {backgroundColor: '#6792F090'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Recuperar contraseña</Text>
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
  login: {
    width: 350,
    height: 550,
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
