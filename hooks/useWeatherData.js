import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = 'SUA_CHAVE_API_OPENWEATHERMAP'; // Substitua pela sua chave de API real

const useWeatherData = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Solicitar permissão de localização
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Permissão de localização negada');
          setLoading(false);
          return;
        }

        // Obter localização atual
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        // Buscar dados de clima
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&appid=${API_KEY}&units=metric&lang=pt_br`
        );

        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar dados do clima');
        setLoading(false);
        console.error(err);
      }
    };

    fetchWeatherData();
  }, []);

  return { location, weatherData, error, loading };
};

export default useWeatherData;