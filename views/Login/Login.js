import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import logo from './DisasterSpotter.png';
import { firebase_auth, db } from '../../components/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


export default function Login(props) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = firebase_auth;

   
    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            
            
            const docRef = doc(db, "usuarios", response.user.uid);
            const docSnap = await getDoc(docRef);
            

            
            props.navigation.navigate('HomeUser')
            
        } catch (error) {
            console.log(error.message);
            if (error.message == "Firebase: Error (auth/invalid-email).") {
                alert('Erro ao entrar, insira o email \n' + error.message);
            } if (error.message == "Firebase: Error (auth/missing-password).") {
                alert('Erro ao entrar, insira uma senha \n' + error.message);

            } if (error.message == "Firebase: Error (auth/invalid-login-credentials).") {
                alert('Erro ao entrar, login ou senha incorreto  \n' + error.message);

            } 

        }//error

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
                    <Text style={{ marginBottom: 40, marginLeft: 50 }}>
                        <Text style={styles.cabecalhoLogin}>Faça login abaixo ou </Text>
                        <Pressable onPress={() => props.navigation.navigate('Register')}>
                            <Text style={styles.register}>crie sua conta</Text>
                        </Pressable>
                    </Text>


                    <Text style={styles.cabecalhoBoxEmail}>
                        Email
                    </Text>
                    <TextInput


                        style={styles.placeholder}
                        value={email}

                        onChangeText={(text) => {
                            setEmail(text);

                        }}
                    />


                    <Text style={styles.cabecalhoBoxPassword}>
                        Senha
                    </Text>
                    <TextInput

                        secureTextEntry={true}
                        style={styles.placeholder}
                        value={password}

                        onChangeText={(text) => {
                            setPassword(text);

                        }}
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <Pressable style={styles.button} onPress={signIn}>
                        <Text style={styles.buttonText}>Logar</Text>
                    </Pressable>

                    <Pressable style={styles.forgotPassword} onPress={() => props.navigation.navigate('ForgotPassword')}>
                        <Text style={styles.register}>Esqueceu sua senha?</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>





    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        width: "100%",
        flexDirection: 'column',
        

    },
    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        marginTop: 150

    },

    topContainer: {
        flex: 1.5,
        justifyContent: "flex-start",
        alignItems: "center",

        width: "100%"

    },


    midContainer: {
        flex: 100,
        marginTop: 25,
        justifyContent: "center",
        width: "100%",



    },

    imageLogo: {
        width: 275,
        height: 250,
        alignSelf: 'center',
        marginTop: 50,

    },

    cabecalhoLogin: {
        fontSize: 15,
        color: 'gray',


    },

    register: {
        fontSize: 16,
        color: '#262950',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 7,

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

    cabecalhoBoxEmail: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 50,
        marginBottom: 2
    },

    cabecalhoBoxPassword: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 50,
        marginBottom: 2,
        marginTop: 35
    },

    placeholder: {
        borderWidth: 1,
        height: 50,
        borderRadius: 4,
        borderColor: 'black',
        fontSize: 12,
        marginRight: 50,
        marginLeft: 50,
        padding: 10

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