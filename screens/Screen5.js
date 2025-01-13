import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const recipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with a creamy sauce.',
    image: require('../assets/pasta.jpg'),
    price: 12.99,
  },
  {
    id: 2,
    title: 'Avocado Toast',
    description: 'Simple and healthy breakfast with avocado and bread.',
    image: require('../assets/cake.jpg'),
    price: 6.49,
  },
];

const Screen5 = ({ navigation }) => {
  const addToCart = async (recipe) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) {
        Alert.alert('Please log in to add items to the cart');
        return;
      }

      const cartRef = firestore().collection('carts').doc(userId);
      const cartDoc = await cartRef.get();
      let cart = cartDoc.exists ? cartDoc.data().items : [];

      const existingItem = cart.find((item) => item.id === recipe.id);
      if (existingItem) {
        Alert.alert('Item already in cart');
      } else {
        cart.push({ ...recipe, quantity: 1 });
        await cartRef.set({ items: cart });
        Alert.alert('Item added to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipe Cards</Text>
      {recipes.map((recipe) => (
        <View key={recipe.id} style={styles.card}>
          <Image source={recipe.image} style={styles.recipeImage} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
            <Text style={styles.price}>£{recipe.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(recipe)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('CartScreen')}
      >
        <Text style={styles.cartButtonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fdfdfd',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  cartButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  cartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Screen5;