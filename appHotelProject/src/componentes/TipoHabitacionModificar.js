import React, { useState, useEffect } from 'react';
import { Button,StyleSheet, TouchableOpacity, ScrollView,TextInput,Text, Image, View, Alert, Picker} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
const uri = 'https://st.depositphotos.com/1897095/1642/i/600/depositphotos_16421123-stock-photo-blue-grunge-vignette.jpg';
export default function TipoHabitacionModificar({navigation, route}) {
  const { id } = route.params;
  const { tipoHabitacion } = route.params;
  const { descripcionD } = route.params;
  const { precioD } = route.params;
  const { imagenD } = route.params;
  const { estado } = route.params;
  const uriPick = 'http://' + global.ip + ':4002/tipoHabitacion/img/' +  imagenD;
 console.log(uriPick);

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


  let partmage= imagenD.split('.');
  let typeImage = partmage[partmage.length - 1];
 
  const [image, setImage] = useState(uriPick);
  const [imgName, setImageName] = useState(imagenD);
  const [imgType, setImgType]= useState(typeImage);

  const pickImage = async () => {
    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    let uriParts = result.uri.split('/');
    let imgName = uriParts[uriParts.length - 1];
    let imgParts= imgName.split('.');
    let imgType = imgParts[imgParts.length - 1];

    if (!result.cancelled) {
      setImage(result.uri);
      setImageName(imgName);
      setImgType(imgType);
    }
    
  };

  const [tipo, setTipo] = useState(tipoHabitacion)
  const [descripcion, setDescripcion] = useState(descripcionD)
  const [precio, setPrecio] = useState(precioD.toString())

  const guardarTipo = async () =>
    {
      if(!tipo || !descripcion || !precio || !image)
      {
        Alert.alert("Trivago", "Escriba los datos completos");
      }
      else
      {
        const photoData = new FormData();
      /*photoData.append('name', imgName);
      photoData.append('type', `image/${imgType}`);
      photoData.append('uri', image);*/
        photoData.append("img", {
          uri: image,
          name: imgName,
          type: `image/${imgType}`
        });
       // var token = JSON.parse(await AsyncStorage.getItem('Token'));
        const guardarArchivo = await fetch(
          'http://' + global.ip + ':4002/api/archivos?id=' + id, {
            method: 'POST',
            headers: {
              Accept: 'multipart/form-data',
              'Content-Type': 'multipart/form-data',
              //'Authorization': 'Bearer ' + token,
            },
            body: photoData,
    
          }
        );
       
        const json = await guardarArchivo.json();
        let photoName = json.data.filename;
        console.log('---------');
       
        console.log(json);
        
        const modificarTipo = await fetch(
          'http://' + global.ip + ':4002/api/Tipohabitacion/modificar/?id=' + id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tipoHabitacion: tipo,
              descripcion:descripcion,
              precio:precio
            

            }),

          }

        );
       
     
       const json2 = await modificarTipo.json();
        console.log(json2);
        
        if(!json2.data.id)
        {
          const eliminarArchivo = await fetch(
            'http://' + global.ip + ':4002/api/archivos/eliminar', {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({
                filename: photoName
                
  
              }),
      
            }
          );
          const json3 = await eliminarArchivo.json();
          Alert.alert("Trivago",  json2.msj);
        }
        else
        {
          Alert.alert("Trivago",  json2.msj);
        }


        

      

      }
       
    }

  return (
   
  <View style={styles.container}>
        
    <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
    <ScrollView> 
      <BlurView intensity={0}>
         
        <View style={styles.correoR}>
        <Text style={{fontSize: 26, marginBottom: 20, fontWeight: 'bold', color: 'white'}}>Modificar tipo</Text>

          <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Tipo de habitación</Text>
              <Picker 
                selectedValue={tipo}
                style= {[styles.input , { color: 'white' }]} 
                onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
              >
                <Picker.Item  label="Individual" value= "Individual"/> 
                <Picker.Item  label="Doble" value= "Doble"/>
                <Picker.Item  label="Cuadruple" value= "Cuadruple"/>
                <Picker.Item  label="Suite de lujo" value= "Suite de lujo"/>
                <Picker.Item  label="Familiar" value= "Familiar"/>
              </Picker>

           </View>

          <View>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Descripción</Text>
            <TextInput  value={descripcion} onChangeText = {setDescripcion}   style={styles.input} placeholder="Descripción"/>
          </View>
          <View>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Precio</Text>
            <TextInput  value={precio} onChangeText = {setPrecio}  keyboardType={'numeric'}  style={styles.input} placeholder="Precio"/>
          </View>
          
          <Button title="Seleccione imagen del tipo de habitación" onPress={pickImage}  />
          {image && <Image source={{ uri: image }} style={{borderWidth: 2, borderRadius: 10, borderColor: '#fff', margin: 20, width: 300, height: 300 }} />}
          
          <TouchableOpacity  onPress={guardarTipo} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Modificar tipo</Text>
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
    marginTop: 50,
    width: 350,
    height: 800,
    /*borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,*/
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
