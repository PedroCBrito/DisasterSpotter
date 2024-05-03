import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import logo from './Login/DisasterSpotter.png';
import { db, firebase } from '../components/config';
import { collection, query, doc, getDocs, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeAdmin(props) {

  const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState("");

  function tryError(screenName) {
    if (selected == "") {

      alert('Selecione um report \n');

    } else {
      props.navigation.navigate(screenName, { id: selected })
    }

  }

  useEffect(() => {
    takeInfo();

  }), [];

  const q = query(collection(db, "reportes"));


  const takeInfo = async () => {
    const querySnapshot = await getDocs(q);
    const reports = [];
    querySnapshot.forEach((doc) => {
      const { nome } = doc.data()

      reports.push(
        {
          key: doc.id,
          value: [doc.data(), doc.id]
        }
      )
    });
    setReports(reports);

  }


  const formatDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}-${month}-${year}`;

  }

  return (

    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS == 'ios' ? "padding" : "height"}

    >


      <View style={styles.topContainer}>
        <Image
          style={styles.imageLogo}
          source={logo}
        />
      </View>


      <View style={styles.midContainer}>
        <ScrollView style={{ width: "100%", height: "100%", marginTop: 280 }}>
          <View style={{ marginHorizontal: 40, marginTop: 10 }}>
            <FlatList
              data={reports}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>

                <TouchableOpacity
                  style={ item.value[1] === selected ? styles.itemShowSelected : styles.itemShow }
                  onPress={() => {
                    setSelected(item.value[1]);
                    
                    
                  }}>
                  <Text><B>Local:</B> {item.value[0].local}  {'\n'}
                    <B>CEP:</B> {item.value[0].CEP}  {'\n'}
                    <B>Data:</B> {item.value[0].date}  {'\n'}
                    <B>Rua:</B> {item.value[0].rua}  {'\n'}
                    <B>Comentario:</B> {item.value[0].comentario} {'\n'}
                    <B>Status: </B>
                    {item.value[0].status == "pendente" ? (<Icon name={'pause'} color={'orange'} />):null}
                    {item.value[0].status == "confirmado" ? (<Icon name={'check'} color={'green'} />):null}
                    {item.value[0].status == "negado" ? (<Icon name={'close'} color={'red'} />):null}
                  </Text>
                </TouchableOpacity>
              } />
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={() => tryError('Review')} >
          <Text style={styles.buttonText}>Selecionar</Text>
        </Pressable>

      </View>
      <View>

        <Pressable style={styles.forgotPassword} onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.register}>Voltar para Login</Text>
        </Pressable>
      </View>

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
    marginTop: 50,
    marginBottom: -5

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

  itemShow: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    height: 125,
    marginBottom: 10
  },
  itemShowSelected: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    height: 125,
    marginBottom: 10,
    borderWidth: 3,
    backgroundColor: '#D0D0D0',
    elevation: 6,
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