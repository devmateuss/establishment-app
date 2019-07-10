import React from 'react';
import { Text, View, ActivityIndicator, Dimensions } from 'react-native';

var { height } = Dimensions.get("window")

const LoadingSpiner = () => (
    <View style={{
        position: "absolute",
        top: height * 0.50,

    }}>
        <ActivityIndicator size="large" color={"#d9d9d9"} />
        <Text style={{ fontWeight: "700", color: "#fff", marginTop: 5 }} >Salvando informações</Text>
    </View>
);

export default LoadingSpiner;
