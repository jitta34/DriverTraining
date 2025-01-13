import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CartScreen = ({navigation}) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotal(cart);
  }, [cart]);

  const fetchCart = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) {
        Alert.alert('Please log in to view your cart');
        return;
      }
      const cartRef = firestore().collection('carts').doc(userId);
      const cartDoc = await cartRef.get();
      if (cartDoc.exists) {
        setCart(cartDoc.data().items || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateCart = async (updatedCart) => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;
      const cartRef = firestore().collection('carts').doc(userId);
      await cartRef.set({ items: updatedCart });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const modifyQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (type === 'increase') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === 'decrease' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setCart(updatedCart);
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    updateCart(updatedCart);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={ item.image } style={styles.productImage} />
      <View style={styles.details}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => modifyQuantity(item.id, 'decrease')}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => modifyQuantity(item.id, 'increase')}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
          <Image source={require('../assets/delete1.png')} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('CheckoutScreen')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  cartList: { padding: 16 },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: { width: 80, height: 80, resizeMode: 'cover' },
  details: { flex: 1, padding: 10 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  productPrice: { fontSize: 14, color: '#555' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityButton: { padding: 6, backgroundColor: '#ddd', borderRadius: 4 },
  quantityText: { fontSize: 16, color: '#333' },
  quantity: { marginHorizontal: 8, fontSize: 16, color: '#333' },
  deleteButton: { position: 'absolute', right: 10, top: 10 },
  deleteIcon: { width: 20, height: 20 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  checkoutButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 5 },
  checkoutText: { fontSize: 16, color: '#fff', textAlign: 'center' },
});

export default CartScreen;