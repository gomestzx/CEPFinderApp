import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "./services/api";

export default function CEP() {
  const [cep, setCep] = useState("");
  const [user, setUser] = useState("");

  async function search() {
    if (cep == "") {
      alert("Digite um CEP valido");
      setCep("");
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        style={styles.container}
        // Background Linear Gradient
        colors={["#161E54", "#161E54", "#161E54"]}
      >
        <ImageBackground
          source={require("./images/background.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.title}>CEP Finder</Text>
          <Text style={styles.subtitle}>
            Pesquise os campos abaixo atravéis do CEP informado
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="CEP"
              value={cep}
              keyboardType="numeric"
              onChangeText={(value) => setCep(value)}
            />
            <TouchableOpacity style={styles.btnInput} onPress={() => search()}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Processar
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: "fff",
                margin: 12,
                fontSize: 25,
                fontWeight: "800",
                color: "#fff"
              }}
            >
              Resultado 
            </Text>
            <View
              style={{
                borderBottomColor: "#666",
                borderBottomWidth: 1,
                marginLeft: 10,
                
              }}
            />
            <Text style={styles.text}>Logradouro: {user.logradouro}</Text>
            <Text style={styles.text}>Bairro: {user.bairro}</Text>
            <Text style={styles.text}>Cidade: {user.localidade}</Text>
            <Text style={styles.text}>Estado: {user.uf}</Text>
            <Text style={styles.text}>IBGE: {user.ibge}</Text>
          </View>

          <StatusBar hidden />
        </ImageBackground>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "700",
    margin: 10,
    textAlign: "center",
    marginTop: 50
  },
  subtitle: {
    color: "#fff",
    margin: 10,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    marginBottom: 30,
    fontSize: 16,
    flexWrap: "wrap",
    width: 300,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 200,
    margin: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
  },
  btnInput: {
    height: 50,
    width: 120,
    margin: 12,
    backgroundColor: "#FF5151",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  text: {
    margin: 12,
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
});
