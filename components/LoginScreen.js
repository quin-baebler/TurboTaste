import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Modal, TextInput, Button, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const [modalVisible, setModalVisible] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo1.png')} style={styles.logoContainer.image} resizeMode='contain' />
        <Text style={styles.logoContainer.text}>DOORDASH</Text>
      </View>

      <Text style={styles.discoverText}>Discover more from your{'\n'}neighborhood</
      Text>

      <View style={styles.loginOptionContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={[styles.loginOptionContainer.button, { backgroundColor: "#EB1700" }]}>
          <Text style={[styles.loginOptionContainer.button.text, { color: "white" }]}>Continue with Email</Text>
        </Pressable>
        <Pressable style={styles.loginOptionContainer.button}>
          <Text style={styles.loginOptionContainer.button.text}>Continue with Google</Text>
        </Pressable>
        <Pressable style={styles.loginOptionContainer.button}>
          <Text style={styles.loginOptionContainer.button.text}>Continue with Facebook</Text>
        </Pressable>
        <Pressable style={styles.loginOptionContainer.button}>
          <Text style={styles.loginOptionContainer.button.text}>Continue with Apple</Text>
        </Pressable>
        <Pressable style={[styles.loginOptionContainer.button, { backgroundColor: 'transparent' }]}>
          <Text style={styles.loginOptionContainer.button.text}>Continue as Guest</Text>
        </Pressable>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.text}>
          By tapping continue with Google, Facebook, or Apple, you agree to DoorDash's
          <Text style={styles.redText}> Terms & Conditions </Text>
          and
          <Text style={styles.redText}> Privacy Policy</Text>.
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <TextInput value={email} style={styles.modalContainer.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
          <TextInput value={password} style={styles.modalContainer.input} placeholder="password" autoCapitalize="none" onChangeText={(text) => setPassword(text)} secureTextEntry={true}></TextInput>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Pressable onPress={login} style={[styles.loginOptionContainer.button, { backgroundColor: "#EB1700" }]}>
                <Text style={[styles.loginOptionContainer.button.text, { color: "white" }]}>Login</Text>
              </Pressable>
              <Pressable onPress={signUp} style={styles.loginOptionContainer.button}>
                <Text style={styles.loginOptionContainer.button.text}>Create Account</Text>
              </Pressable>
            </>
          )}
        </View>
      </Modal >

      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // fill the screen
    backgroundColor: '#fff',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 100,
    image: {
      width: 50,
    },
    text: {
      marginLeft: 20,
      fontSize: 30,
      fontWeight: 'bold',
      color: '#EB1700',
      textAlign: 'center',
      letterSpacing: 2,
    }
  },
  discoverText: {
    marginHorizontal: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  loginOptionContainer: {
    margin: 20,
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    button: {
      backgroundColor: '#F8F8F8',
      padding: 10,
      borderRadius: 200,
      alignItems: 'center',
      marginVertical: 10,
      text: {
        fontSize: 18,
        fontWeight: 'bold',
      }
    }
  },
  disclaimer: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#494949',
    textAlign: 'center',
  },
  redText: {
    color: '#EB1700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
    }
  }
});
