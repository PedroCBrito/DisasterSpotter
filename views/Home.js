import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import logoITEEM from './Login/imgITEEM.png'
import { firebase_app, firebase_auth } from '../components/config';




export default function Home(props) {

  const [selected, setSelected] = React.useState("");
  const [users, setUsers] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const dbUSers = firebase_app.firestore().collection('usuarios')

  function saveNome() {
    users.forEach((doc) => {
      if (doc.key == selected) {

        setSelectedName(doc.value);
        return
      } else {
        return
      }

    })


  }


  function tryError (screenName) {
    if (selected == "") {
      
        alert('Selecione um aluno \n'); 

    } else{
      props.navigation.navigate(screenName, { id: selected, nome: selectedName })
    }
    
  }

  useEffect(() => {

    const ReadData = async () => {

      dbUSers.onSnapshot(
        querySnapshot => {
          const users = []
          querySnapshot.forEach((doc) => {
            const { nome } = doc.data()
            users.push({
              key: doc.id,
              value: nome,

            })
          })
          setUsers(users);

        }
      )

    }
    ReadData();

  }), [];



  return (



    <View style={styles.container}>

      <View style={styles.topContainer}>
        <Image
          style={styles.imageLogo}
          source={logoITEEM}
        />
      </View>

      <View style={styles.midContainer}>

        <View style={{ marginHorizontal: 40 }}>
          <Text style={styles.cabecalhoLogin}>Nome do aluno a ser Avaliado</Text>
          <SelectList
            save='key'
            setSelected={setSelected}
            onSelect={saveNome}
            data={users}
            dropdownStyles={{ marginLeft: 10, marginRight: 10 }}
            dropdownItemStyless={{ marginHorizontal: 10 }}
          />
        </View>

        <Pressable style={styles.button} onPress={() => tryError('Avaliate')}>
          <Text style={styles.buttonText}>Avaliar Desempenho</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => tryError('Info')}>
          <Text style={styles.buttonText}>Informações do Jovem</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => tryError('Certificate')}>
          <Text style={styles.buttonText}>Gerar Certificado</Text>
        </Pressable>


      </View>

      <View style={styles.bottomContainer}>

        <Pressable style={styles.text} onPress={() => firebase_auth.signOut()}>
          <Text style={styles.backLogin}>Sair da conta</Text>
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
    backgroundColor: 'white',
    justifyContent: "flex-end",
    marginBottom: 20,
    width: "100%"
  },

  topContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 25,
    width: "100%"

  },


  midContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",

    width: "100%",
    marginBottom: 125

  },


  imageLogo: {
    width: 75,
    height: 75,
    marginRight: 20


  },


  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#252B4F',
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

  backLogin: {
    fontSize: 15,
    color: '#262950',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
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



});