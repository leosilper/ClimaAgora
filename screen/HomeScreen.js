import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground 
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    let greetingText = 'Olá!';

    if (currentHour >= 5 && currentHour < 12) {
      greetingText = 'Bom dia!';
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingText = 'Boa tarde!';
    } else {
      greetingText = 'Boa noite!';
    }

    setGreeting(greetingText);
  }, []);

  const handleViewWeather = () => {
    navigation.navigate('Weather');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/background.jpg')} // ✅ imagem corrigida
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <TouchableOpacity 
          style={styles.weatherButton} 
          onPress={handleViewWeather}
        >
          <Text style={styles.buttonText}>Ver Clima Agora</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  greetingText: {
    fontSize: 32,
    color: 'white',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  weatherButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
