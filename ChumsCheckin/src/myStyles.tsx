import { StyleSheet } from 'react-native'
import * as constant from './Constant'
const styles = StyleSheet.create({

    /*Global styles*/
    mainContainer: { paddingHorizontal: '5%', backgroundColor: constant.ghostWhite, flex: 1, },
    H1: { fontSize: constant.fontSize2, alignSelf: 'flex-start', marginVertical: '4%', fontFamily: constant.RobotoLight },
    headerImageView: { height: constant.deviceHeight * 24 / 100, width: '100%', backgroundColor: constant.whiteColor },
    headerImage: { maxWidth: constant.deviceWidth * 70 / 100, height: constant.deviceHeight * 20 / 100, alignSelf: 'center' },
    printerStatus: { backgroundColor: '#09A1CD', height: 30, justifyContent: 'center', flexDirection: 'row' },
    content: { backgroundColor: constant.ghostWhite, paddingBottom: '5%', flex: 1, },
    button: { backgroundColor: constant.baseColor, marginVertical: '8%', height: 50, justifyContent: 'center', flexDirection: 'row', },
    buttonText: { alignSelf: 'center', color: constant.whiteColor, fontSize: constant.smallerFont },
    bigButton: { backgroundColor: constant.baseColor, marginVertical: '8%', height: 70, justifyContent: 'center', flexDirection: 'row', },
    bigButtonText: { alignSelf: 'center', color: constant.whiteColor, fontSize: constant.smallFont },
    bigLinkButton: { marginHorizontal: '3%', height: constant.deviceWidth * 13 / 100, justifyContent: "center", },
    bigLinkButtonText: { color: constant.baseColor1, marginLeft: '3%', fontSize: constant.fontSize1, },
    textInput: { backgroundColor: constant.whiteColor, paddingHorizontal: '3%', fontSize: constant.smallFont, },

    /*Splash*/
    splashMaincontainer: { alignItems: 'center', justifyContent: 'center', flex: 1, },

    /*Lookup*/
    searchView: { flexDirection: 'row', height: 75, marginVertical: 20 },
    searchTextInput: { backgroundColor: constant.whiteColor, flex: 1, paddingHorizontal: '3%', fontSize: constant.fontSize1, },
    searchButton: { backgroundColor: constant.baseColor, flex: 0.3, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%' },
    searchButtonText: { color: constant.whiteColor, fontSize: constant.fontSize },
    flatlistMainView: { borderBottomWidth: constant.borderWidth3, borderBottomColor: constant.lightGrayColor, flexDirection: 'row', paddingVertical: '3%', alignItems: 'center' },
    personPhoto: { width: 90, height: 60 },
    personName: { color: constant.baseColor1, fontSize: constant.fontSize1 },

    /*Household*/
    serviceTimeButton: { backgroundColor: constant.baseColor1, width: constant.deviceWidth * 45 / 100, justifyContent: 'center', alignItems: 'center', height: 70, },
    serviceTimeButtonText: { color: constant.whiteColor, fontSize: constant.smallerFont },
    serviceTimeText: { fontSize: constant.smallFont },
    expandableList: { marginBottom: constant.deviceWidth * 13 / 100 },
    expandedRow: { borderBottomWidth: constant.borderWidth3, borderBottomColor: constant.lightGrayColor, flexDirection: 'row', marginHorizontal: '6%', paddingVertical: '3%', paddingLeft: '2%', alignItems: 'center', height: constant.deviceWidth * 16 / 100, justifyContent: 'space-around' },

    /*Checkin Complete*/
    webView: { width: constant.deviceWidth, maxHeight: constant.deviceWidth / 3.5 * 1.1 },


    //GuestAdd

    guestAddText: {
        marginTop: '5%',
        fontSize: constant.fontSize1,
        marginHorizontal: '8%'
    },
    guestAddinput: {
        marginTop: '3%',
        backgroundColor: constant.whiteColor,
        marginHorizontal: '8%',
        paddingHorizontal: '3%',
        fontSize: constant.fontSize,
    },

    guestAddButtonView: {
        flexDirection: 'row',
        // borderWidth:2,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-around',
        flex: 1,

    },
    guestAddButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: constant.deviceWidth * 15 / 100


    },
    guestAddButtonText: {
        fontSize: constant.fontSize,
        color: constant.whiteColor
    },

    //GuestList

    guestListMainContainer: {

        backgroundColor: constant.ghostWhite,
        flex: 1,

    },



    addGuestButton: {
        backgroundColor: constant.baseColor1,
        height: constant.deviceHeight * 8 / 100,
        justifyContent: 'center',
        marginBottom: '3%'

    },
    addGuestButtonText: {
        alignSelf: 'center',
        color: constant.whiteColor,
        fontSize: constant.smallFont
    },
    addGuestImageView: {
        backgroundColor: constant.whiteColor
    },
    checkingButton: {
        backgroundColor: constant.baseColor1,
        height: constant.deviceHeight * 8 / 100,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    checkingButtonText: {
        alignSelf: 'center',
        color: constant.whiteColor,
        fontSize: constant.smallFont
    },
    dataText2: {

        fontSize: constant.smallFont,
        alignSelf: "center",
        marginTop: '2%',
        marginLeft: '7%'
    },

    flatlistDropIcon: {

        fontSize: constant.fontSize,
        color: constant.lightGrayColor,
        marginRight: '2%',
    },
    //checking Completed

    checkingText: {
        fontSize: constant.fontSize2,
        marginLeft: '5%',
        marginTop: '5%',
    },




    //Activity Group

    ActivityGroupRipple: {
        borderBottomWidth: constant.borderWidth2,
        flexDirection: 'row',
        height: constant.deviceWidth * 15 / 100,
        alignItems: 'center',
        marginHorizontal: '6%',
        paddingHorizontal: '2%',
        borderBottomColor: constant.lightGrayColor


    },
    activityText: {
        fontSize: constant.fontSize,
        color: constant.baseColor1,
        marginLeft: '3%',
    },

    noneButton: {
        backgroundColor: constant.redColor,
        height: constant.deviceHeight * 8 / 100,
        justifyContent: 'center'

    },

    printButton: {
        borderWidth: 1,
        height: constant.deviceWidth * 15 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: '8%',
        borderRadius: 15,
        backgroundColor: constant.baseColor,
        borderColor: constant.baseColor,

    },
    printView: {
        flexDirection: 'row',
        marginVertical: '18%',
    },
    buttonPrintText: {
        color: constant.whiteColor,
        fontSize: constant.fontSize1
    }

})
export default styles