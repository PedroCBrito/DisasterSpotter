import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from 'react-native';
import logoITEEM from './Login/imgITEEM.png'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../components/config';



export default function Certificate(props) {
  const route = useRoute();
  const idUsuario = route.params.id;
  const nome = route.params.nome;

  const { width } = useWindowDimensions();

  const [media, setMedia] = useState();

  const takeInfo = async () => {
    const q = query(collection(db, "usuarios", idUsuario, "nota"));
    const querySnapshot = await getDocs(q);
    const avaliates = [];
    querySnapshot.forEach((doc) => {
      avaliates.push(doc.data().total);
    });
    const soma = (avaliates.reduce((media, v) => media = media + v, 0))
    setMedia((soma / (avaliates.length)).toFixed(2))
  }

  const formatDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}/${month}/${year}`;

  }

  useEffect(() => {
    takeInfo();
  }, []);

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Certificado</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f7f7f7;
          text-align: center;
        }
  
        .certificate {
          max-width: 800px;
          margin: 50px auto;
          border: 6px solid #263969;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }
  
        .header {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #9acc6a;
        }
  
        .content {
          font-size: 18px;
          margin-bottom: 30px;
          color: #555;
        }
  
        .content p {
          margin: 5px 0;
        }
  
        .signature img {
          width: 150px;
          height: auto;
          margin-top: 20px;
        }
  
        .signature p {
          margin-top: 5px;
          font-size: 16px;
          font-style: italic;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="header">Certificado de Participação</div>
        <div class="content">
          <img src="https://itemm.com.br/wp-content/uploads/2023/10/Logo-itemm-Colorido-Quadrado-2.png" alt="" width="275">
  
          <p>Isso certifica que</p>
          <p>
            <strong>${nome}</strong>
          </p>
          <p>Finalizou o curso com nota média de</p>
          <p>
            <strong>${media}</strong>
          </p>
          <p>na data de ${formatDate()}</p>
        </div>
        <div class="signature">
          <img src="https://i.ibb.co/N1SbcFh/Text-Signature.png" alt="Assinatura">
          <p>Assinatura</p>
        </div>
      </div>
    </body>
  </html>
    `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  };

  return (

    <View style={styles.container}>

      <View style={styles.topContainer}>
        <Image
          style={styles.imageLogo}
          source={logoITEEM}
        />
      </View>
      <View style={styles.midContainer}>
        
          <Text style={{fontSize:20, fontStyle: "bold", color: "#98C45A"}}>
          Certificado de Participação
          </Text>
          <Image
          style={styles.imageCertificate}
          source={{
            uri: 'https://itemm.com.br/wp-content/uploads/2023/10/Logo-itemm-Colorido-Quadrado-2.png',
        }}

        />

          <Text style={styles.texto}>
            Isso certifica que
          </Text>
          <Text style={styles.variavel}>
            {nome}
          </Text>
          <Text style={styles.texto}>
            Finalizou o curso com nota média de
          </Text>
          <Text style={styles.variavel}>
            {media}
          </Text>
          <Text style={styles.texto}>
            Na data de {formatDate()}
          </Text>

        <Text style={{fontSize: 15, marginTop: 65}}>
            Assinatura
          </Text>

      </View>

      <View style={styles.bottomContainer}>

        <Pressable style={styles.button} onPress={generatePdf} >
          <Text style={styles.buttonText}>Baixar Certificado</Text>
        </Pressable>

        <Pressable style={styles.text} onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.back}>Cancelar Certificado</Text>
        </Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: "100%"

  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
    width: "100%",

  },

  topContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "flex-start",
    marginBottom: 25,
    marginTop: 25,
    width: "100%"

  },


  midContainer: {
    flex: 6.5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#262950',
    height: 500,
    borderRadius: 8,
    fontSize: 14,
    marginHorizontal: 40,
    padding: 10,
    marginTop: 150,
marginBottom:55


  },
  imageLogo: {
    width: 250,
    height: 225,
    alignSelf: 'center',

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#98C45A',
    marginRight: 60,
    marginLeft: 60,
    height: 50,
    marginTop: 35
  },

  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


  text: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    marginRight: 25,
    marginLeft: 25,

  },
  cabecalho: {
    fontSize: 15,
    color: 'gray',
    marginHorizontal: 40,
    marginTop: 10

  },

 

  certificado: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 400,
    borderRadius: 8,
    marginHorizontal: 40,
    padding: 17,
    marginTop: 200,
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center'

  },

  scores: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    width: "50%",
  },

  boxDropdown: {
    marginHorizontal: 35,
    width: 100,
    marginTop: 5
  },

  back: {
    fontSize: 15,
    color: '#262950',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },

  variavel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  texto: {
    fontSize: 15,

  },

  imageCertificate: {
    width: 200,
    height: 152,
    marginTop: 10,
    marginBottom:10,
    alignSelf: 'center',

  },




});