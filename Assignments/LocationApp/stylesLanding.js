import { StyleSheet } from "react-native";
export const styles= StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:200
  },
  container2: {
    position:'relative',
    bottom:250
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginTop:30
  },
  text1: {
    marginLeft: 120,
    fontWeight: '600',
    fontSize: 30,
    color:'orange',
    position:'relative',
    bottom:300,
    right:50
    
  },
  text2: {
    marginLeft: 100,
    fontWeight: '600',
    fontSize: 30,
    color:'orange',
    position:'relative',
    bottom:290,
    right:50
  },
  peers: {
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 30,
    color:'lightblue',
    marginTop:100
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  newHere:{
    color:'white',
    marginRight:10,
    fontSize:20
  },
  register:{
    flexDirection: 'row',
    alignItems: 'center', 
    marginLeft:10,
    marginTop:30
  },
  buttonText:{
    color:'white',
    fontSize:20
  },
  customButton:{
    padding:20,
    paddingTop:10,
    paddingLeft:40,
    paddingBottom:10,
    paddingRight:40,
    backgroundColor:'gold',
    borderRadius:30

  },
  welcome:{
    color:'yellow',
    textAlign:'center',
  },
  location:{
    color:'yellow',
    textAlign:'center'
  },
  box:{
    width:300,
    borderWidth:4,
    position:'relative',
    bottom:300,
    backgroundColor:'black'
  }
  
  
});
