import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, FlatList, Button, Alert,Picker } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
const uri = 'https://s2.best-wallpaper.net/wallpaper/1920x1200/1303/Coast-hotel-pool-lights-sunset_1920x1200.jpg';
const profilePicture = 'https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg'
import '../../global.js';



export default function ModificarMiCuenta({id, navigation }) {

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
  const [direccion, setDireccion] = useState(null)
  const [estado, setEstado] = useState('Activo')
  const [idUsuario, setIdUsuario] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [contrasenia, setContrasenia] = useState(null)

  const listarCliente = async () => {
    try {
      var idCliente = JSON.parse(await AsyncStorage.getItem('Cliente'));
      let response = await fetch('http://' + global.ip + ':4002/api/clientes/buscar?id=' +  idCliente);
      let json = await response.json();

      setIdentidad(json.identidad);
      setNombres(json.nombres);
      setApellidos(json.apellidos);
      setTelefono(json.telefono);
      setCorreo(json.correo);
      setDireccion(json.direccion);
      setEstado(json.estado);
      setIdUsuario(json.idUsuario);
      setUsuario(json.usuario);
      setIdentidad(json.identidad);

    } catch (error) {
      console.error(error);
    }
  };


  useState(() => {
    listarCliente();
  }, []);



  const modificarCliente = async () => {
    if (!identidad || !nombres || !apellidos || !telefono || !correo || !direccion || !usuario || !contrasenia || !estado) {
      console.log("Escriba los datos completos");
      Alert.alert("Trivago", "Escriba los datos completos");
    }
    else {
      try {
        var token = JSON.parse(await AsyncStorage.getItem('Token'));
        console.log(token);
        const modificarUser = await fetch(

          'http://' + global.ip + ':4002/api/usuarios/modificar?id=' + idUsuario, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({
            usuario: usuario,
            contrasenia: contrasenia

          }),

        }
        );

        const json = await modificarUser.json();
        console.log(json);
        if (json.data) {
          var token = JSON.parse(await AsyncStorage.getItem('Token'));
          var idCliente = JSON.parse(await AsyncStorage.getItem('Cliente'));
          const modificarCuenta = await fetch(
            'http://' + global.ip + ':4002/api/clientes/modificar?id=' + idCliente, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
              identidad: identidad,
              nombres: nombres,
              apellidos: apellidos,
              telefono: telefono,
              correo: correo,
              direccion: direccion,
               estado:estado,
              idUsuario: idUsuario

            }),

          }

          );


          const json2 = await modificarCuenta.json();

          if (json2.data) {
            /*Alert.alert("Trivago", json2.msj);
            console.log(json2.msj);*/

            Alert.alert('Trivago', 'Registros guardados', [

              { text: 'OK', onPress: () => { navigation.navigate('Dashboard'); } },
            ])
          }

          else {
            var mensaje = "";
            for (var i = 0; i < json2.length; i++) {
              mensaje += (i + 1) + '.' + json2[i].msg + "\n";
            }
            Alert.alert("Trivago", mensaje);
            console.log(mensaje);


          }
          //Alert.alert("Trivago", json2.msj);


          //Alert.alert("Trivago", json2[0].msg);
          //console.log(json2[0].msg);
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
          <View style={styles.clientes}>
            <Text style={{ fontSize: 30, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Modificar cuenta</Text>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Identidad</Text>
              <TextInput value={identidad} onChangeText={setIdentidad} style={styles.input} placeholder="Identidad" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Nombres</Text>
              <TextInput value={nombres} onChangeText={setNombres} style={styles.input} placeholder="Nombres" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Apellidos</Text>
              <TextInput value={apellidos} onChangeText={setApellidos} style={styles.input} placeholder="Apellidos" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Telefono</Text>
              <TextInput keyboardType={'numeric'} value={telefono} onChangeText={setTelefono} style={styles.input} placeholder="Telefono" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Correo</Text>
              <TextInput value={correo} onChangeText={setCorreo} style={styles.input} placeholder="Correo" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Direccion</Text>
              <TextInput value={direccion} onChangeText={setDireccion} style={styles.input} placeholder="Direccion" />
            </View>
            <View>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Estado</Text>
                        <Picker
                            selectedValue={estado}
                            style= {[styles.input , { color: 'white' }]} 
                            onValueChange={(itemValue, itemIndex) => setEstado(itemValue)}>
                            
                            <Picker.Item  label="Activo" value= "Activo"/> 
                            <Picker.Item  label="Inactivo" value= "Inactivo"/>
                        </Picker>
             </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Usuario</Text>
              <TextInput value={usuario} onChangeText={setUsuario} style={styles.input} placeholder="Usuario" />
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '400', color: 'white' }}>Contraseña</Text>
              <TextInput value={contrasenia} onChangeText={setContrasenia} style={styles.input} secureTextEntry={true} placeholder="Contraseña" />
            </View>
            <TouchableOpacity onPress={modificarCliente} style={[styles.button, { backgroundColor: '#053378' }]}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Modificar Datos</Text>
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
    clientes: {
      width: 400,
      height: 1000,
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