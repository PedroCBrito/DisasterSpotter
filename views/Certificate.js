import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from 'react-native';
import logoITEEM from './Login/imgITEEM.png'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { collection, query, doc, getDocs, getDoc } from "firebase/firestore";
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
    const soma = (avaliates.reduce((media,v) =>  media = media + v , 0 ))
    setMedia((soma/(avaliates.length)))
  }

  useEffect(() => {
    takeInfo();
  }, []);

  const source = {
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Academic Certificate</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                background-color: #f9f9f9;
            }
            .title {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 20px;
            }
            .recipient {
                font-size: 18px;
                text-align: center;
                margin-bottom: 20px;
            }
            .grades {
                font-size: 16px;
                margin-bottom: 20px;
            }
            .signature {
                font-size: 16px;
                font-weight: bold;
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="title">Academic Certificate</div>
        <div class="recipient">
            This is to certify that<br>
            <strong>${nome}</strong><br>
            has successfully completed the course with the following grades:
        </div>
        <div class="grades">
            <p>Nota Media durante curso: ${media}</p>
        </div>
        <div class="signature">
            <p>Signature:</p>
            <p>[Your Name]</p>
            <p>[Your Title]</p>
        </div>
    </body>
    </html>
  `
  };

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Academic Certificate</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              background-color: #f9f9f9;
          }
          .title {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 20px;
          }
          .recipient {
              font-size: 18px;
              text-align: center;
              margin-bottom: 20px;
          }
          .grades {
              font-size: 16px;
              margin-bottom: 20px;
          }
          .signature {
              font-size: 16px;
              font-weight: bold;
              text-align: right;
          }
      </style>
  </head>
  <body>
      <div class="title">Academic Certificate</div>
      <div class="recipient">
          This is to certify that<br>
          <strong>${nome}</strong><br>
          has successfully completed the course with the following grades:
      </div>
      <div class="grades">
      <p>Nota Media durante curso: ${media}</p>
      </div>
      <div class="signature">
          <p>Signature:</p>
          <p>[Your Name]</p>
          <p>[Your Title]</p>
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
        <RenderHtml
          contentWidth={width}
          source={source}
        />
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
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",

    width: "100%",
    marginBottom: 130,


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

  placeholder: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    borderRadius: 8,
    fontSize: 14,
    marginHorizontal: 40,
    padding: 17,
    marginTop: 8

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
  datePicker: {

    height: 120,
    marginTop: -10,

  },




});