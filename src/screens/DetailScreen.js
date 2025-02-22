import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const DetailScreen = ({ route, navigation }) => {
  const { productId } = route.params; // ID produk
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data produk
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <LinearGradient colors={['#6BA8F5', '#4A90E2', '#654ea3']} style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.errorText}>Memuat produk detail...</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }

  if (!product) {
    return (
      <LinearGradient colors={['#6BA8F5', '#4A90E2', '#654ea3']} style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Gagal memuat produk.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }

  // Hitung harga setelah diskon
  const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

  return (
    <LinearGradient colors={['#6BA8F5', '#4A90E2', '#654ea3']} style={styles.container}>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'transparent'}/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={20} color="#fff" />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
        <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productPrice}>${discountedPrice}</Text>
        <Text style={styles.originalPrice}>Harga awal: ${product.price.toFixed(2)} ({product.discountPercentage}% Off)</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Merk:</Text>
            <Text style={styles.infoValue}>{product.brand || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kategori:</Text>
            <Text style={styles.infoValue}>{product.category.toUpperCase()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rate:</Text>
            <Text style={styles.infoValue}>{product.rating} ★</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Stok:</Text>
            <Text style={[styles.infoValue, product.stock < 10 && styles.lowStock]}>
              {product.stock} {product.stock < 10 ? '(Stok Sedikit)' : ''}
            </Text>
          </View>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFDD00',
    textAlign: 'center',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  lowStock: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  additionalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  retryButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default DetailScreen;
