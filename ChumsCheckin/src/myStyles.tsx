import { StyleSheet } from 'react-native'
import * as constant from './Constant'
const styles = StyleSheet.create({

    splashMaincontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    loginMainContainer: {

        backgroundColor: constant.ghostWhite,
        height: constant.deviceHeight * 97 / 100


    },

    loginImage: {
        width: constant.deviceWidth * 70 / 100,
        height: constant.deviceHeight * 30 / 100,
        alignSelf: 'center'
    },
    loginHeading: {
        fontSize: 1.55 * constant.fontSize,
        alignSelf: 'center',
        marginVertical: '6%',
    },
    loginImageView: {
        height: constant.deviceHeight * 33 / 100,
        width:'100%',
        backgroundColor: constant.whiteColor
    },
    loginTextInput: {
        backgroundColor: constant.whiteColor,
        marginHorizontal: '7%',
        // paddingLeft:'3%'
        paddingHorizontal: '3%',
        fontSize: constant.smallFont1
    },
    loginButton: {
        backgroundColor: constant.baseColor,
        marginHorizontal: '7%',
        marginVertical: '8%',
        height: constant.deviceHeight * 8 / 100,
        justifyContent: 'center',
        flexDirection: 'row',

    },
    loginButtonText: {
        alignSelf: 'center',
        color: constant.whiteColor,
        fontSize: constant.smallFont1
    },

    //Detail Search

    searchMainContainer: {
        backgroundColor: constant.ghostWhite,
        flex: 1,

    },

    searchHeading: {
        fontSize: 1.2 * constant.fontSize2,
        alignSelf: 'center',
        marginVertical: '4%',
        fontFamily:constant.RobotoLight

    },
    searchView: {

        // borderWidth: constant.borderWidth2,
        marginHorizontal: '7%',
        flexDirection: 'row',
        height:constant.deviceWidth*13/100,
    },
    searchTextInput: {
        backgroundColor: constant.whiteColor,
        flex: 1,
        paddingHorizontal: '3%',
        fontSize:constant.fontSize1,
    },
    searchButton: {
        backgroundColor: constant.baseColor,
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%'

    },
    searchButtonText: {

        color: constant.whiteColor,
        fontSize:constant.fontSize,
    },

// Activity services
servicesHeading:{
    marginVertical:'5%',
    fontSize:constant.fontSize3,
    marginLeft:'5%',
    
},
serviceButton:{
    
     marginHorizontal:'8%',
      height:constant.deviceWidth*13/100,
     justifyContent:"center",
    // marginVertical:'0%',
   
},
serviceContentStyle:{
    backgroundColor:constant.ghostWhite,
    paddingBottom:'5%',

    flex:1,
},
serviceButtonText:{
    color:constant.baseColor1,
    marginLeft:'3%',
    fontSize:constant.fontSize1,
},

serviceImage: {
    width: constant.deviceWidth * 65 / 100,
    height: constant.deviceWidth * 35 / 100,
    alignSelf: 'center',
   
},

serviceImageView: {
    height: constant.deviceHeight * 28 / 100,
    width: constant.deviceWidth,
    backgroundColor: constant.whiteColor,
    justifyContent:'center'
},

//ActivityLookup

flatlistMainView:{
borderBottomWidth:constant.borderWidth3,
borderBottomColor:constant.lightGrayColor,
flexDirection:'row',
marginHorizontal:'6%',
// marginVertical:'3%',
paddingVertical:'3%',
paddingLeft:'2%',
alignItems:'center',
//justifyContent:'center'


},
dataImage:{
    width:constant.deviceWidth*18/100,
    height:constant.deviceWidth*13/100,
},
dataText:{
    color:constant.baseColor1,
    marginLeft:'7%',
    fontSize:constant.fontSize1
},

//GuestAdd

guestAddText:{
    marginTop:'5%',
    fontSize:constant.fontSize1,
    marginHorizontal:'8%'
},
guestAddinput:{
marginTop:'3%',
backgroundColor:constant.whiteColor,
marginHorizontal:'8%',
paddingHorizontal:'3%',
fontSize:constant.fontSize,
},

guestAddButtonView:{
flexDirection:'row',
// borderWidth:2,
position:'absolute',
bottom:0,
justifyContent:'space-around',
flex:1,

},
guestAddButton:{
flex:1,
justifyContent:'center',
alignItems:'center',
height:constant.deviceWidth*15/100
   

},
guestAddButtonText:{
    fontSize:constant.fontSize,
    color:constant.whiteColor
},

//GuestList

guestListMainContainer:{

    backgroundColor:constant.ghostWhite,
  flex:1,
    
},

guestListStyle:{
marginBottom:constant.deviceWidth*13/100
},
addGuestButton:{
 backgroundColor:constant.baseColor1,
 height:constant.deviceHeight*8/100,
 justifyContent:'center',
 marginBottom:'3%'

},
addGuestButtonText:{
alignSelf:'center',
color:constant.whiteColor,
fontSize:constant.smallFont1
},
addGuestImageView:{
backgroundColor:constant.whiteColor
},
checkingButton:{
    backgroundColor:constant.baseColor1,
    height:constant.deviceHeight*8/100,
    justifyContent:'center',
    position:'absolute',
    bottom:0,
     width:'100%',
},
checkingButtonText:{
    alignSelf:'center',
    color:constant.whiteColor,
    fontSize:constant.smallFont1
},
dataText2:{

    fontSize:constant.smallFont,
    alignSelf:"center",
    marginTop:'2%',
    marginLeft:'7%'
},

flatlistDropIcon:{

    fontSize:constant.fontSize,
    color:constant.lightGrayColor,
    marginRight:'2%',
},
//checking Completed

checkingText:{
   fontSize:constant.fontSize2,
   marginLeft:'5%' ,
   marginTop:'5%',
},
hideView:{

    borderBottomWidth:constant.borderWidth3,
    borderBottomColor:constant.lightGrayColor,
    flexDirection:'row',
    marginHorizontal:'6%',
    // marginVertical:'3%',
    paddingVertical:'3%',
    paddingLeft:'2%',
    alignItems:'center',
    height:constant.deviceWidth*16/100,
justifyContent:'space-around'
    
},
guestListText:{
    fontSize:constant.smallFont1
},
guestListButton:{

    backgroundColor:constant.baseColor1,
    width:constant.deviceWidth*40/100,
    justifyContent:'center',
    alignItems:'center',
    height:constant.deviceWidth*10/100,

},
guestListButtonText:{
    color:constant.whiteColor,
    fontSize:constant.smallFont1
},

//Activity Group

ActivityGroupRipple:{
    borderBottomWidth:constant.borderWidth2,
    flexDirection:'row',
    height:constant.deviceWidth*15/100,
    alignItems:'center',
    marginHorizontal:'6%',
    paddingHorizontal:'2%',
    borderBottomColor:constant.lightGrayColor


},
activityText:{
fontSize:constant.fontSize,
    color:constant.baseColor1,
    marginLeft:'3%',
},

noneButton:{
backgroundColor:constant.redColor,
height:constant.deviceHeight*8/100,
justifyContent:'center'

}

})
export default styles