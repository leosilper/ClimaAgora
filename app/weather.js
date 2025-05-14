import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, PermissionsAndroid, Platform } from 'react-native';
import * as Location from 'expo-location';
import { format } from 'date-fns';

const API_KEY = 'SUA_API_KEY_AQUI'; // Substitua pela sua chave da OpenWeatherMap

export default function WeatherScreen() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const lat = loc.coords.latitude;
      const lon = loc.coords.longitude;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    })();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando clima...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()}, este é o clima atual:</Text>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        }}
      />
      <Text style={styles.condition}>{weather.weather[0].description}</Text>
      <Text style={styles.feels}>Sensação térmica: {Math.round(weather.main.feels_like)}°C</Text>
      <Text style={styles.date}>{format(new Date(), "dd/MM/yyyy HH:mm")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  greeting: { fontSize: 20, marginBottom: 10 },
  city: { fontSize: 26, fontWeight: 'bold' },
  temp: { fontSize: 48, marginVertical: 10 },
  condition: { fontSize: 20, textTransform: 'capitalize' },
  feels: { fontSize: 16, marginTop: 5 },
  date: { marginTop: 10, fontSize: 14, color: 'gray' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
