import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { firebase_auth, db, firebase } from '../components/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import logo from './Login/DisasterSpotter.png';
import { doc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'


export default function Register(props) {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const auth = firebase_auth;
    const [imagem, setImagem] = useState(null);
    const [uploading, setUploading] = useState(false);

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
        alert('Photo uploaded!!');
            
     
        setImagem(null);

    };

    const signUp = async () => {
        if (password == confirmPassword) {

            try {
                const response = await createUserWithEmailAndPassword(auth, email, password)
                console.log(response.user.uid);

                createInfo(response.user.uid);
                uploadImage(response.user.uid);
            } catch (error) {
                if (error.message == "Firebase: Error (auth/invalid-email).") {
                    alert('Insira um email \n' + error.message);
                } if (error.message == "Firebase: Error (auth/missing-password).") {
                    alert('Insira uma senha \n' + error.message);

                } if (error.message == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                    alert('Insira uma senha valida  \n' + error.message);

                }

            
            }
        } else {
            alert('As senhas não são iguais');
        }

    }

    function createInfo(uid) {
        try {
            setDoc(doc(db, "usuarios", uid), {

                nome: nome,
                cpf: cpf,
                email: email,
                admin: false
            });
            
        } catch (error) {
            alert('Erro ao fazer cadastro, preencha os campos necessários\n');
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


                    <Text style={styles.cabecalhoBox}>
                        Nome
                    </Text>
                    <TextInput


                        style={styles.placeholder}
                        value={nome}

                        onChangeText={(nome) => {
                            setNome(nome);

                        }}
                    />

                    <Text style={styles.cabecalhoBox}>
                        CPF
                    </Text>
                    <TextInput


                        style={styles.placeholder}
                        value={cpf}

                        onChangeText={(cpf) => {
                            setCpf(cpf);

                        }}
                    />

                    <Text style={styles.cabecalhoBox}>
                        Email
                    </Text>

                    <TextInput


                        style={styles.placeholder}
                        value={email}

                        onChangeText={(email) => {
                            setEmail(email);

                        }}
                    />
                    
                    <SafeAreaView style={styles.container}>
                    <Text style={styles.cabecalhoBox}>
                        Foto do Usuario
                    </Text>
                        <TouchableOpacity style={styles.placeholder} onPress={pickImage}>
                            <Text style={styles.buttonTextImage}> Escolher Imagem</Text>
                            {imagem && <Image source={{ uri: imagem.uri }} style={{ marginLeft: 130, marginTop: -5, width: 40, height: 40 }} />}

                        </TouchableOpacity>

                    </SafeAreaView>


                    <Text style={styles.cabecalhoBox}>
                        Senha
                    </Text>
                    <TextInput

                        secureTextEntry={true}
                        style={styles.placeholder}
                        value={password}

                        onChangeText={(password) => {
                            setPassword(password);

                        }}
                    />


                    <Text style={styles.cabecalhoBox}>
                        Confirmar senha
                    </Text>
                    <TextInput

                        secureTextEntry={true}
                        style={styles.placeholder}
                        value={confirmPassword}

                        onChangeText={(confirmPassword) => {
                            setconfirmPassword(confirmPassword);

                        }}
                    />

                </View>


                <View style={styles.bottomContainer}>

                    <Pressable style={styles.button} onPress={signUp} >
                        <Text style={styles.buttonText}>Criar Conta</Text>
                    </Pressable>

                    <Pressable style={styles.text} onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.backLogin}>Já tem uma conta?</Text>
                    </Pressable>

                </View>


            </ScrollView>
        </KeyboardAvoidingView >



    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -20
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

    buttonTextImage: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },

    topContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "flex-start",
        marginBottom: 10,
        marginTop: 40,
        width: "100%"

    },


    midContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        width: "100%",
        height: "100%"

    },

    bottomContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "flex-end",
        marginTop: 30,
        width: "100%",
    },

    imageLogo: {
        width: 175,
        height: 175,
        alignSelf: 'center',

    },

    cabecalhoLogin: {
        fontSize: 15,
        color: 'gray',


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

    cabecalhoBox: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 50,
        marginBottom: 2,
        marginTop: 10
    },


    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#252E38',
        marginRight: 60,
        marginLeft: 60,
        height: 50
    },

    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },



});