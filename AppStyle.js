import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F3F3E7',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    rowView: {
        flexDirection: 'row',
    },
    largerFontSize: {
        fontSize: 16,
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
    searchedRecipesCardList: {
        width: '90%',
        margin: 10,
        alignSelf: 'center',
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
    savedRecipeCardTitle: {
        textAlign: 'center',
    },
    savedRecipesList: {
        width: '100%',
        padding: 10,
    },
    savedRecipesCardList: {
        height: 450,
    },
    savedRecipeCard: {
        height: '75%',
        marginBottom: 10,
    },

    modalCentered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingredientsChips: {
        justifyContent: 'center',
        backgroundColor: '#F6CBB7',
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
        borderColor: '#90ADC6',
        marginBottom: 20,
        marginTop: 20,
        width: '100%'
    },
    recipeCardActions: {
        backgroundColor: '#E9DDD4',
        padding: 10,
        marginTop: 30,
    },
    recipeCardTitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    recipeCardLinkTxt: {
        fontSize: 16,
        fontWeight: '700',
    },
    recipeCardButtons: {
        marginTop: 20,
    },
    recipeCardButtonBcColor: {
        color: '#0D698B',
        fontSize: 16,
    },
    recipeCardButtonTxtColor: {
        color: '#9C2D41',
        fontSize: 16,
    },
    /* ShoppingLists.js */
    shoppingListView: {
        flex: 2,
        width: '90%',
    },
    shoppingListItems: {
        flex: 2,
        width: '95%',
    },
    listOfShoppingLists: {
        width: '90%',
        backgroundColor: 'green',
    },
    noShoppingListView: {
        flex: 0.3,
        backgroundColor: '#98D7C2',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 20,
    },


    /* AddShoppingList.js */
    fabButton: {
        margin: 16,
        right: 0,
        bottom: 0,
    },
    shoppingListIcons: {
        flexDirection: 'row',
        marginTop: 7,
    },
    /* ShoppingItemsScreen.js */
    shoppingItemsContainer: {
        flex: 1,
        padding: 10,
    },
    sectionTitle: {
        fontWeight: '700',
        textTransform: 'uppercase',
        color: 'black',
    },
    itemTitle: {

    },
    itemsPickedUp: {
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    /* AddItemToList.js */
    fabAddItem: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    addItemContainer: {
        flex: 1,
    },
    modalContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
        marginTop: 150,
    },

    /* RecipeDetailsScreen.js */
    recipeCardSaveButtonColor: {
        color: '#0D698B',
        fontSize: 16,
        padding: 5,
    },
    ingrToListModal: {
        backgroundColor: 'white',
        padding: 20,
        height: 400,
    },
})
