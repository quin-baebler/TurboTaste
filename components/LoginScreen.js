import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './Task';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';


export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.doordashWrapper}>
      <View style={styles.titleContainer}>
        <Image source={require('../assets/logo1.png')} style={styles.logo} />
        <Text style={styles.sectionTitle}>DOORDASH</Text>
      </View>
      <View style={styles.discover}>
        <Text style={styles.discoverText}>Discover more from your{'\n'}neighborhood</Text>
      </View>
        <View style={styles.items}>
          <Task text="Continue with Email" isFirst={true}/>
          <Task text="Continue with Google"/>
          <Task text="Continue with Facebook"/>
          <Task text="Continue with Apple"/>
        </View>
        <View style={styles.guest}>
        <Text style={styles.guestText}>Continue as Guest</Text>
        <View style={styles.line}/>
        <Text style={styles.smallText}>
            By tapping continue with Google, Facebook, or Apple,{'\n'}you agree to DoorDash’s 
          <Text style={styles.redText}> Terms & Conditions </Text> 
            and 
          <Text style={styles.redText}>{'\n'}Privacy Policy</Text>.
        </Text>
      </View>
        

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doordashWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EB1700',
    textAlign: 'center',
    letterSpacing: 2,
  }, 
  items: {
    marginTop: 150,
    top: Dimensions.get('window').height / 10, 

  }, 
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10, 
  },
  titleContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: Dimensions.get('window').height / -10, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  
    
  },
  discover: {
    position: 'absolute',
    flex: 1,
    top: Dimensions.get('window').height / 5, 
    JustifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  
    
  },
  discoverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  
    
  },
  guest: {
    position: 'absolute',
    flex: 1,
    top: Dimensions.get('window').height / 1.72, 
    JustifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  
    
  },
  guestText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  
    
  },
  line: {
    borderBottomColor: 'E7E7E7',
    borderBottomWidth: 0.5,
    width: "90%",
    top: 10,
    alignSelf : 'center', 
  },
  smallText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#494949',
    textAlign: 'center',
    top: 15,
   
  },
  redText: {
    color: '#EB1700',
   
  }

});
