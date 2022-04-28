import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F3F3E7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowView: {
        flexDirection: 'row',
    },
    homeContainer: {
        flex: 1,
        backgroundColor: '#F3F3E7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontWeight: '700',
        marginBottom: 15,
    },
    homeCards: {
        width: '90%',
    },
    textCentered: {
        textAlign: 'center',
    },
    itemCentered: {
        alignSelf: 'center',
    },
    inputContainer: {
        marginTop: 120,
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        width: '100%',
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        textAlign: 'center',
        fontWeight: '700',
    },
    searchView: {
        flex: 1,
        backgroundColor: '#FDB750',
        width: '100%',
        padding: 15,
        justifyContent: 'center',
    },
    searchTextInput: {
        fontSize: 18,
        width: '80%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#F3F3E7',
    }, 
    categoryCardGroup: {
        flex: 2,
    },
    categoryCard: {
        width: 250,
    },
    categoryCardText: {
        textTransform: 'capitalize',
    },
    searchResultText: {
        flex: 1,
        backgroundColor: '#F8EA8C',
        width: '100%',
        padding: 25,
        justifyContent: 'center',
    },
    keywordStyle: {
        textTransform: 'lowercase',
        color: '#3AA3A0',
        fontWeight: '700',
        fontSize: 26,
    },
    searchResultList: {
        flex: 3,
        width: '100%',
    },
    searchedRecipeCards: {
        width: '60%',
        margin: 10,

    }, 


    searcedRecipesListImg: {
        width: 140,
        height: 140,
        borderRadius: 10,
        margin: 5,
    },
    searcedRecipesListText: {
        fontSize: 20,
    },
    modalCentered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingredientsChips: {
        justifyContent: 'center',
        backgroundColor: '#F6C324',
        margin: 5,
    },
    test: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dialog: {
        flex: 1,
        backgroundColor: 'green',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recipeDetails: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recipeImg: {
        height: 300,
        justifyContent: 'center',
        marginBottom: 10,
    },
    divider: {
        borderWidth: 1,
        borderColor: '#3AA3A0',
        marginBottom: 20,
        marginTop: 20,
        width: '100%'
    },
    recipeCardTitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    recipeCardLinkTxt: {
        fontSize: 16,
        fontWeight: '700',
    },
})
