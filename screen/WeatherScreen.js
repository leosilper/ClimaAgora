import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ImageBackground 
} from 'react-native';
import useWeatherData from '../hooks/useWeatherData';

const WeatherScreen = () => {
  const { location, weatherData, error, loading } = useWeatherData();

  // Format current date and time
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('../assets/images/background.jpg')} // ✅ imagem corrigida
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.cityName}>
          {weatherData.name}
        </Text>
        
        <Text style={styles.dateTime}>
          {currentDate} - {currentTime}
        </Text>
        
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>
            {Math.round(weatherData.main.temp)}°C
          </Text>
          <Text style={styles.feelsLikeText}>
            Sensação térmica: {Math.round(weatherData.main.feels_like)}°C
          </Text>
        </View>
        
        <View style={styles.weatherDetailsContainer}>
          <Text style={styles.weatherDescription}>
            {weatherData.weather[0].description}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffeeee',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  cityName: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  temperatureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureText: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
  },
  feelsLikeText: {
    fontSize: 18,
    color: 'white',
  },
  weatherDetailsContainer: {
    alignItems: 'center',
  },
  weatherDescription: {
    fontSize: 24,
    color: 'white',
    textTransform: 'capitalize',
  },
});

export default WeatherScreen;