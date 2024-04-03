import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, ScrollView } from 'react-native';
import logo from './Login/DisasterSpotter.png';
import { SelectList } from 'react-native-dropdown-select-list';
import { useRoute } from '@react-navigation/native';
import { firebase_app, firebase_auth } from '../components/config';
import { collection, query, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from '../components/config';

export default function Info(props) {

  const [selected, setSelected] = React.useState("");
  const [avaliates, setAvaliates] = useState([]);
  const [participate, setParticipate] = React.useState("");
  const [relation, setRelation] = React.useState("");
  const [hability, setHability] = React.useState("");
  const [metas, setMetas] = React.useState("");
  const [coment, setComent] = useState("");
  const [presente, setPresente] = useState(0);
  const [total, setTotal] = useState(0);

  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {



  }


  const route = useRoute();
  const id = route.params.id;
  const nome = route.params.nome;


  const q = query(collection(db, "usuarios", id, "nota"));


  const takeInfo = async () => {
    const querySnapshot = await getDocs(q);
    const avaliates = [];
    querySnapshot.forEach((doc) => {
      const { nome } = doc.data()
      avaliates.push({
        key: doc.id,
        value: doc.id,

      })
    });
    setAvaliates(avaliates);
  }

  const takeNotes = async () => {
    const docRef = doc(db, "usuarios", id, "nota", selected);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      setParticipate(docSnap.data().participate)
      setComent(docSnap.data().coment)
      setRelation(docSnap.data().relation)
      setHability(docSnap.data().hability)
      setMetas(docSnap.data().metas)
      setPresente(docSnap.data().presente)
      setTotal(docSnap.data().total)

      if (docSnap.data().presente == Number(2)) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }

    } else {
      console.log("No such document!");
    }



  }

  useEffect(() => {
    takeInfo().then(toggleSwitch());

  }), [];




  return (
    <ScrollView>


      <View style={styles.topContainer}>
        <Image
          style={styles.imageLogo}
          source={logo}
        />
      </View>
      <View style={styles.midContainer}>

        <Text style={styles.cabecalho}>
          Nome
        </Text>
        <Text style={styles.placeholder}>
          {nome}
        </Text>

        <View style={{ marginHorizontal: 40, marginTop: 10 }}>
          <Text style={styles.cabecalhoLogin}>Nome do aluno a ser Avaliado</Text>
          <SelectList
            save='key'
            setSelected={setSelected}
            onSelect={takeNotes}
            data={avaliates}
            dropdownStyles={{ marginLeft: 10, marginRight: 10 }}
            dropdownItemStyless={{ marginHorizontal: 10 }}
            search = {false}
          />
        </View>

        <View>
          <View style={styles.scores}>


            <View>
              <Text style={styles.cabecalho}>Participação</Text>
              <Text style={styles.placeholder}>
                {participate}
              </Text>
            </View>

            <View>
              <Text style={styles.cabecalho}>Relacionameto</Text>
              <Text style={styles.placeholder}>
                {relation}
              </Text>
            </View>


          </View>

          <View style={styles.scores}>


            <View >
              <Text style={styles.cabecalho}>Háb. Tecnica</Text>
              <Text style={styles.placeholder}>
                {hability}
              </Text>
            </View>

            <View>
              <Text style={styles.cabecalho}>Cumprir Metas</Text>
              <Text style={styles.placeholder}>
                {metas}
              </Text>
            </View>


          </View>

        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.cabecalhoSwitch}>
            Presença
          </Text>
          <Switch
            style={{ alignSelf: 'center' }}
            trackColor={{ false: 'grey', true: 'tomato' }}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor={'grey'}
            value={isEnabled}
            disabled={true}
          />

        </View>

        <Text style={styles.cabecalho}>
          Comentário
        </Text>
        <Text style={styles.placeholder}>
          {coment}
        </Text>


        <Text style={styles.cabecalho}>
          Nota Total
        </Text>
        <Text style={styles.placeholder}>
          {total}
        </Text>




      </View>








    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    width: "100%",
    flexDirection: 'column',

  },
  bottomContainer: {
    flex: 0.7,
    justifyContent: "flex-end",
    width: "100%",


  },

  topContainer: {
    flex: 1.5,
    justifyContent: "flex-start",
    alignItems: "center",

    width: "100%"

  },


  midContainer: {
    flex: 4,
    backgroundColor: '#00000000',
    justifyContent: "center",
    width: "100%",
    marginBottom: 10

  },


  imageLogo: {
    width: 250,
    height: 225,
    alignSelf: 'center',
    marginTop: 35

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
    marginTop: 7

  },

  cabecalhoSwitch: {
    fontSize: 15,
    color: 'gray',
    marginLeft: 40,
    marginRight: 10,
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
    color: 'gray',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  datePicker: {

    height: 120,
    marginTop: -10,

  },




});