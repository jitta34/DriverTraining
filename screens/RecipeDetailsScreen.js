import { View, StyleSheet,Image, Text } from 'react-native'
import React from 'react'

const RecipeDetailsScreen = ({route}) => {
    const {recipe} = route.params
  return (
    <View style={styles.container}>
   <Image source={recipe.image} style={styles.image}/>
   <Text style={styles.title}> {recipe.title} </Text>
   <Text style={styles.description}> {recipe.description} </Text>
   <Text style={styles.sectionheader}> ingredients </Text>
   {recipe.ingredients.map((ingredient,index)=>(
    <Text key={index} style={styles.ingredient}> {`* ${ingredient}`} </Text>
   ))}
   <Text style={styles.sectionheader}> steps </Text>
   {recipe.steps.map((step,index)=>(
    <Text key={index} style={styles.step}> {`- ${step}`} </Text>
   ))}
    </View>
  )
}
const styles= StyleSheet.create ({
container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',

},
image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',

},
description: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,

},
ingredient: {
    fontSize: 16,
    color: 'black'
},
sectionheader: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
},
step: {
    fontSize: 16,
    color: 'black',
    marginTop: 15,
},
description: {
    fontSize: 16,
    color: 'black',
    marginTop: 15,
}
})
export default RecipeDetailsScreen