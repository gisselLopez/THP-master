
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Picker,
  selectedValue
  } from 'react-native';
  import { BlurView } from 'expo-blur';
//import { getProduct } from '../services/ProductsService.js';
//import { CartContext } from '../CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const uri = 'https://www.hmi-online.com/uploads/newsarticle/4750396/images/472575/small/table.jpg';

import '../../global.js';

export function  serviciosModificarEliminar({route,navigation}) {
  
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

  const { id } = route.params;
  const [servicio, setServicio] = useState(null)
  const [descripcion, setDescripcion] = useState(null)
  const [precio, setPrecio] = useState(null)
  const [estado, setEstado] = useState(null)
  //const [room, setRoom] = useState([]);

  const listarServicios = async () => {
    try {

      let response = await fetch('http://' + global.ip + ':4002/api/servicios/listarServicio?id=' +  id);
      let json = await response.json();
     // console.log("***********************************************************");
     // console.log(json);
      setServicio(json.servicio);
      setDescripcion(json.descripcion);
      setPrecio(json.precio.toString());
      setEstado(json.estado);
     
    } catch (error) {
      console.error(error);
    }
  };


    useState(() => 
    { 
      listarServicios();
    }, []);

    

    const desactivar = async () => {
      if (!servicio || !descripcion || !precio || !estado) {
        console.log("Escriba los datos completos");
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      else {
        try {

            const desactivarServicio = await fetch(
              'http://' + global.ip + ':4002/api/servicios/desactivar?id=' + id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({
                estado: estado,
                
              }),
  
            }
  
            );
  
  
            const json2 = await desactivarServicio.json();
  
            if (json2.data) {
              /*Alert.alert("Trivago", json2.msj);
              console.log(json2.msj);*/
  
              Alert.alert('Trivago', 'Registros guardados', [
  
                { text: 'OK', onPress: () => { navigation.navigate('Servicioslistado'); } },
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
        
          
         
          
  
        } catch (error) {
          console.log(error);
  
        }
      }
    };

    const modificarServicios = async () => {
      if (!servicio || !descripcion || !precio || !estado) {
        console.log("Escriba los datos completos");
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      else {
        try {

            const modificarServicio = await fetch(
              'http://' + global.ip + ':4002/api/servicios/modificar?id=' + id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({
                servicio: servicio,
                descripcion: descripcion,
                precio: precio,
                estado: estado,
                
              }),
  
            }
  
            );
  
  
            const json2 = await modificarServicio.json();
  
            if (json2.data) {
              /*Alert.alert("Trivago", json2.msj);
              console.log(json2.msj);*/
  
              Alert.alert('Trivago', 'Registros guardados', [
  
                { text: 'OK', onPress: () => { navigation.navigate('Servicioslistado'); } },
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
        
          
         
          
  
        } catch (error) {
          console.log(error);
  
        }
      }
    };
    
  


    
   
    //console.log(servicios)
    const verServicio = async () => {
      Alert.alert("Trivago", estado );
      }

   // const [selectedValue, setSelectedValue] = useState("Inactivo");
  return (
    <View style={styles.container}>
       <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
    <ScrollView>
      <BlurView intensity={30}>
        <View style={styles.clientes}>
          <Text style={{ fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Opciones Servicios</Text>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Servicio</Text>
            <TextInput value={servicio} onChangeText={setServicio} style={styles.input} placeholder="Servicio" />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Servicio</Text>
            <TextInput value={descripcion} onChangeText={setDescripcion} style={styles.input} placeholder="Servicio" />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>precio</Text>
            <TextInput value={precio} keyboardType={'numeric'} onChangeText={setPrecio} style={styles.input} placeholder="Precio" />
          </View>
          <View>
          <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Estado</Text>
          <Picker
            selectedValue={estado}
            style= {[styles.input , { color: 'white' }]} 
            onValueChange={(itemValue, itemIndex) => setEstado(itemValue)}
           >
             
            <Picker.Item  label="Activo" value= "Activo"/> 
            <Picker.Item  label="Inactivo" value= "Inactivo"/>
          </Picker>
           </View>
          
              
          <TouchableOpacity  onPress={modificarServicios}  style={[styles.button, { backgroundColor: '#053378' }]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Modificar Datos</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={desactivar} style={[styles.button, { backgroundColor: '#FF0000' }]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Eliminar Datos</Text>
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
    marginTop: 2
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  clientes: {
    width: 400,
    height: 600,
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