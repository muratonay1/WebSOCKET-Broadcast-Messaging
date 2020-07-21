import {StyleSheet,Dimensions} from 'react-native';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    TextInput:{
        fontSize: 15, 
        backgroundColor: '#cccccc', 
        width: width * 0.8, 
        height: height * 0.07, 
        borderRadius: 20,
        marginTop:5,
        textAlign:'left',
        fontWeight:'bold',
        fontSize: 16
    },
    Text:{
        fontSize: 20, 
        textAlign: 'center', 
        marginBottom: 10, 
        color: '#111'
    },
    TouchableOpacity:{
        backgroundColor: '#596e79', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: width * 0.5, 
        height: height * 0.07, 
        borderRadius: 11, 
        marginTop: 20 
    },
    CustomViewContainer:{
        justifyContent: 'center', 
        alignItems: 'center', 
        width: width * 0.9, 
        height: height * 0.5, 
        borderWidth: 1
    },
    Main:{
        flex: 1,
         justifyContent: 'center', 
         alignItems: 'center', 
         backgroundColor: 'white' 
    },
    SWT_TEXT_TOP:{
        fontSize: 18, 
        textAlign: 'center',
        color: '#111'
    },
    SWT_TEXT_BOTTOM:{
        fontSize: 20, 
        textAlign: 'center'
    },
    StartText:{
        textAlign: 'center', 
        fontSize: 15, 
        backgroundColor: '#84a9ac', 
        width: width * 0.8, 
        height: height * 0.08, 
        borderRadius: 50 
    },
    Start_Main:{
        flex: 1,
        backgroundColor: "#092532"
    },
    StartViews:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    Start_Text:{
        fontSize: 18, 
        color: "orange", 
        marginBottom: 10
    },
    StartBottomView:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
    
})
export default styles;