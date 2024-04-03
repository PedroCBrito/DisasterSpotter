import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import logo from './Login/DisasterSpotter.png';
import { db, firebase } from '../components/config';
import { addDoc, collection } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location'


export default function Login(props) {


  const [local, setLocal] = useState("");
  const [imagem, setImagem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [comentario, setComentario] = useState("");
  const [geoLoc, setGeoLoc] = useState("");
  const [rua, setRua] = useState("");
  const [CEP, setCEP] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync();
      setGeoLoc(currentLocation);
      console.log(currentLocation);

      
    };

    

    getPermissions();
    
  }, []);
  
  const getAddres = async () => {
    const reverseGeocode = await Location.reverseGeocodeAsync({
      longitude: geoLoc.coords.longitude,
      latitude: geoLoc.coords.latitude
    });
    
    console.log("Endereco")

    const endereco = reverseGeocode[0].street + " " + reverseGeocode[0].streetNumber;
    console.log(endereco)
    console.log(reverseGeocode[0].postalCode)
    setRua(endereco)
    setCEP(reverseGeocode[0].postalCode)

  };
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImagem(source);

  };

  const uploadImage = async (id) => {
    setUploading(true);
    const response = await fetch(imagem.uri)
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(id).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!!'
    );
    setImagem(null);

  };


  const formatDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}-${month}-${year}`;

  }

  const createReport = async () => {
    getAddres();
    setDate(formatDate());

    try {
      const response = await addDoc(collection(db, "reportes"), {
        local: local,
        imagem: imagem,
        comentario: comentario,
        rua: rua,
        CEP: CEP,
        date: date,

      });

      alert('Reporte feito com sucesso');
      console.log(response.id)
      uploadImage(response.id);

    } catch (error) {
      alert('Erro ao fazer reporte, preencha os campos necessários\n');
      console.log(error)
    }


  }


  return (

    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS == 'ios' ? "padding" : "height"}

    >
      <ScrollView style={{ width: "100%" }}>

        <View style={styles.topContainer}>
          <Image
            style={styles.imageLogo}
            source={logo}
          />
        </View>
        <View style={styles.midContainer}>
          <Text style={{ marginBottom: 40, textAlign: 'center' }}>
            <Text style={styles.cabecalho}>Faça sua denuncia e ajude a melhorar {'\n'}</Text>
            <Text style={styles.register}>nossa cidade!</Text>

          </Text>

          <Text style={styles.cabecalhoBox}>
            Local
          </Text>
          <TextInput


            style={styles.placeholder}
            value={local}

            onChangeText={(text) => {
              setLocal(text);

            }}
          />

          <Text style={styles.cabecalhoBox}>
            Imagem
          </Text>

          <SafeAreaView style={styles.container}>

            <TouchableOpacity style={styles.placeholder} onPress={pickImage}>
              <Text style={styles.buttonTextImage}> Escolher Imagem</Text>
              {imagem && <Image source={{ uri: imagem.uri }} style={{ marginLeft: 130, marginTop: -5, width: 40, height: 40 }} />}

            </TouchableOpacity>

          </SafeAreaView>



          <Text style={styles.cabecalhoBox}>
            Comentário
          </Text>
          <TextInput

            style={styles.placeholder}
            value={comentario}

            onChangeText={(text) => {
              setComentario(text);

            }}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Pressable style={styles.button} onPress={() => createReport()} >
            <Text style={styles.buttonText}>Enviar</Text>
          </Pressable>

          <Pressable style={styles.forgotPassword} onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.register}>Voltar para Login</Text>
          </Pressable>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>





  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20


  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 60

  },

  topContainer: {
    flex: 1.5,
    justifyContent: "flex-start",
    alignItems: "center",

    width: "100%"

  },


  midContainer: {
    flex: 100,
    marginTop: 15,
    justifyContent: "center",
    width: "100%",



  },

  imageLogo: {
    width: 275,
    height: 250,
    alignSelf: 'center',
    marginTop: 50,

  },

  cabecalho: {
    fontSize: 15,
    color: 'gray',

  },

  register: {
    fontSize: 16,
    color: '#262950',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginTop: 7,
    justifyContent: 'center',
  },

  forgotPassword: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
    elevation: 3,
    marginRight: 25,
    marginLeft: 25,

  },


  cabecalhoBox: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 50,
    marginBottom: 2,
    marginTop: 15
  },

  placeholder: {
    borderWidth: 1,
    height: 50,
    borderRadius: 4,
    borderColor: 'black',
    fontSize: 12,
    marginRight: 50,
    marginLeft: 50,
    padding: 10,
    flexDirection: "row"
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#C60E2F',
    marginRight: 60,
    marginLeft: 60,
    height: 50
  },

  selectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    marginRight: 60,
    marginLeft: 60,
    height: 50,
    width: 150,
  },

  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginRight: 60,
    marginLeft: 60,
    height: 50,
    width: 150,
  },

  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  buttonTextImage: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },




});