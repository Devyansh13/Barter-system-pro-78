import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import db from '../Config';
import firebase from 'firebase'

class LoginSignUpScreen extends React.Component{

  constructor(){
    super();
    this.state={
    emailId:"",
    password:"",
    Name:"",
    Contact:"",
    Address:"",
    confirmPassword:"",
    isModalVisible:false,
    }
  }

  signUp=async(email,password,confirmPassword)=>{
    if(password!==confirmPassword){
      return Alert.alert("Passwords do not match")
    }
    else{
   firebase.auth().createUserWithEmailAndPassword(email, password)
.then(() => {
  db.collection("Users").add({
    Name:this.state.Name,
    Contact:this.state.Contact,
    emailId:this.state.emailId,
    Address:this.state.Address
  })
  return Alert.alert(
    "User added succesfully",
    "",
    [
     
      { text: "OK", onPress: () => this.setState({isModalVisible:false}) }
    ]
  );
})

.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
   return alert(errorMessage)
  // ..
});
    }

  }

  login=async(email,password)=>{
   firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    return alert("User login succesful")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
      return alert(errorMessage)
  });
    }

    showModal=()=>{
      return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
        >
          <View style={styles.modalContainer}>
          <ScrollView style={{width:"100%",}}>
            <Text>Registration Form</Text>
  
            <TextInput 
            placeholder="Name" 
            style={styles.inputBox1} 
            onChangeText={(text) => {this.setState({ Name: text });}}
            /> 
  
            <TextInput 
            placeholder="Contact" 
            style={styles.inputBox1} 
            onChangeText={(text) => {this.setState({ Contact: text });}}
            keyboardType={"numeric"}
            /> 
  
            <TextInput 
            placeholder="Address" 
            style={styles.inputBox1} 
            onChangeText={(text) => {this.setState({ Address: text });}}
            multiline={true}
            /> 
  
            <TextInput 
            placeholder="Email-id" 
            style={styles.inputBox1} 
            onChangeText={(text) => {this.setState({ emailId: text });}}
            keyboardType={'email-address'}
            /> 
  
            <TextInput 
            placeholder="Password" 
            style={styles.inputBox1} 
            onChangeText={(text) => {this.setState({ password: text });}}
            secureTextEntry={true}
            /> 
  
            <TextInput 
            placeholder="Confirm Password" 
            style={styles.inputBox1} 
            onChangeText={(text) => {this.setState({ confirmPassword: text });}}
            secureTextEntry={true}
            /> 
  
            <TouchableOpacity
            style={styles.searchButton}
            onPress={()=>{this.signUp(this.state.emailId,this.state.password,this.state.confirmPassword)}
            }
            >
             <Text> Register</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
            style={styles.searchButton}
            onPress={()=>{this.setState({isModalVisible:false})}}
            >
             <Text> Cancel</Text>
            </TouchableOpacity>
  
  
  
            
          </ScrollView>
          </View>
        </Modal>
      )
    }
     

  

render(){
return(
  <View>

  <Text style={styles.textContainer}>Barter System</Text>

  <TextInput style={styles.inputBox1} placeholder="Username"  onChangeText={(text)=>{this.setState({emailId:text})}}
            keyboardType="email-address"/>
  <TextInput style={styles.inputBox2} placeholder="Password" onChangeText={(text)=>{this.setState({password:text})}}
            secureTextEntry={true}/>
  
  <TouchableOpacity style={styles.searchButton} 
            onPress={()=>{this.login(this.state.emailId,this.state.password)}}><Text>Login</Text></TouchableOpacity>

             <TouchableOpacity style={styles.searchButton} 
            onPress={()=>{this.setState({isModalVisible:true})}}><Text>Sign Up</Text></TouchableOpacity>

  </View>
)
}
}

export default LoginSignUpScreen;

const styles = StyleSheet.create({
  searchButton:{
      marginLeft:120,
      borderWidth:1,
      marginTop:20,
      height:30,
      width:100,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'yellow'
    },
inputBox1: {
    marginLeft:30,
    marginRight:30,
    marginTop:30,
    borderWidth: 3
  },
  inputBox2: {
    marginLeft:30,
    marginRight:30,
    marginTop:10,
    borderWidth: 3
  },
  textContainer: {
    backgroundColor: 'yellow',
    padding: 10, 
     fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer:{
    backgroundColor:"yellow",
  },
})