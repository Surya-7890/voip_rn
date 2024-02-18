import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetcher = axios.create({
  baseURL: 'http://localhost', // backend url
  headers: {
    Authorization: AsyncStorage.getItem('access_token').then(token => token).catch(err => console.error(err.message))
  }
});