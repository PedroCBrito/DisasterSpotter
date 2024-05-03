import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import logo from './Login/DisasterSpotter.png';
import { db } from '../components/config';
import { query, doc, getDoc, ref, updateDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { referencia, update } from 'firebase/database';


export default function Review(props) {

    const [local, setLocal] = useState("");
    const [imagem, setImagem] = useState(null);
    const [comentario, setComentario] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rua, setRua] = useState("");
    const [CEP, setCEP] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");

    const route = useRoute();
    const id = route.params.id;
    const q = query(doc(db, "reportes", id));

    useEffect(() => {
        takeInfo();

    }), [];

    const takeInfo = async () => {
        const querySnapshot = await getDoc(q);
        setNome(querySnapshot.data().nome);
        setCpf(querySnapshot.data().cpf);
        setLocal(querySnapshot.data().local);
        setImagem(querySnapshot.data().imagem);
        setComentario(querySnapshot.data().comentario);
        setRua(querySnapshot.data().rua);
        setCEP(querySnapshot.data().CEP);
        setDate(querySnapshot.data().date);
        setStatus(querySnapshot.data().status);

    }







    const updateNegar = async () => {

        const updateref = doc(db, "reportes", id);
        try {
            const updatedata = await updateDoc(updateref, { status: 'negado' })
            alert("update succesfully");
            takeInfo();

        } catch (error) {
            alert(error, "update error");
        }

    };

    const updateAceitar = async () => {
        const updateref = doc(db, "reportes", id);
        try {
            const updatedata = await updateDoc(updateref, { status: 'confirmado' })
            alert("update succesfully");
            takeInfo();

        } catch (error) {
            alert(error, "update error");
        }


    };


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
                <ScrollView style={{ width: "100%", marginTop: 220, marginBottom: 100 }}>
                    <Text style={{ marginBottom: 5, textAlign: 'center' }}>
                        <Text style={styles.cabecalho}>Veja os detalhes da Denuncia!</Text>
                    </Text>

                    <View style={styles.scoresStatus}>

                        <Text style={{fontSize: 14,color: 'gray',marginBottom: 2,marginTop: 15}}>
                            Status: {status}
                        </Text>
                        <View style={{color: 'gray',marginLeft:10,marginBottom: 2,marginTop: 15}}>
                        {status == "pendente" ? (<Icon name={'pause'} color={'orange'} size={20} />) : null}
                        {status == "confirmado" ? (<Icon name={'check'} color={'green'} size={20} />) : null}
                        {status == "negado" ? (<Icon name={'close'} color={'red'} size={20} />) : null}
                        </View>
                    </View>
                    <Text style={styles.cabecalhoBox}>
                        Nome
                    </Text>
                    <Text style={styles.placeholder}>
                        {nome}
                    </Text>
                    <Text style={styles.cabecalhoBox}>
                        CPF
                    </Text>
                    <Text style={styles.placeholder}>
                        {cpf}
                    </Text>
                    <Text style={styles.cabecalhoBox}>
                        Local
                    </Text>
                    <Text style={styles.placeholder}>
                        {local}
                    </Text>

                    <Text style={styles.cabecalhoBox}>
                        Comentario
                    </Text>
                    <Text style={styles.placeholder}>
                        {comentario}
                    </Text>

                    <Text style={styles.cabecalhoBox}>
                        Imagem
                    </Text>
                    <View style={styles.placeholderImage}>
                        {imagem && <Image source={{ uri: imagem.uri }} style={{ width: 150, height: 150, }} />}
                    </View>
                    <Text style={styles.cabecalhoBox}>
                        Rua
                    </Text>
                    <Text style={styles.placeholder}>
                        {rua}
                    </Text>


                    <Text style={styles.cabecalhoBox}>
                        CEP
                    </Text>
                    <Text style={styles.placeholder}>
                        {CEP}
                    </Text>

                    <Text style={styles.cabecalhoBox}>
                        Data
                    </Text>
                    <Text style={styles.placeholder}>
                        {date}
                    </Text>


                </ScrollView>
            </View >

            <View style={styles.bottomContainer}>
                <View style={styles.scores}>
                    <Pressable style={styles.button} onPress={() => updateNegar()} >
                        <Text style={styles.buttonText}>Negar</Text>
                    </Pressable>
                    <Pressable style={styles.buttonAccept} onPress={() => updateAceitar()} >
                        <Text style={styles.buttonText}>Aceitar</Text>
                    </Pressable>
                </View>

            </View>
            <Pressable style={styles.forgotPassword} onPress={() => props.navigation.navigate('HomeAdmin')}>
                <Text style={styles.register}>Voltar</Text>
            </Pressable>

        </KeyboardAvoidingView >





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
        marginTop: -50


    },

    topContainer: {
        flex: 1.5,
        justifyContent: "flex-start",
        alignItems: "center",

        width: "100%"

    },
    scores: {
        flexDirection: 'row',
        marginLeft: -15,
        width: "100%",
    },
    scoresStatus: {
        flexDirection: 'row',
        
        width: "100%",
        justifyContent:"center",
    },

    midContainer: {
        flex: 100,
        marginTop: 15,
        justifyContent: "center",
        width: "100%",



    },

    imageLogo: {
        width: 225,
        height: 200,
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
        marginBottom: 10,

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
    placeholderImage: {
        borderWidth: 1,
        height: 200,
        borderRadius: 4,
        borderColor: 'black',
        marginRight: 100,
        marginLeft: 100,
        padding: 10,
        flexDirection: "row",
        alignItems: "center", justifyContent: "center"
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
    buttonAccept: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
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