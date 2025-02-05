import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const SubscriptionPage = () => {
  const router = useRouter();
  const [selectedTarif, setSelectedTarif] = useState(null);

  const tarifs = [
    { month: 3, price: 23.9, weeklyPrice: 1.84,id:0 },
    { month: 1, price: 9.99, weeklyPrice: 2.31, id:1 },
  ];

  const handleTarifPress = (id: any) => {
    setSelectedTarif(id);
  };

  return (
    <SafeAreaView style={scss.subscribe}>
      <View style={scss.content}>
      <View style={scss.text}>
        <Text style={scss.headerTitle}>Discover ADAM AI’s Full Potential</Text>
        <Text style={scss.headerSubtitle}>
          Personalized recommendations. Intelligent analysis. Measurable
          progress.
        </Text>
      </View>
      <View style={scss.box}>
        {tarifs.map((tarif) => (
          <TouchableOpacity
          
            key={tarif.id}
            style={[
              scss.tarifBtn,
              selectedTarif === tarif.id && {
                borderColor: "#312CBE",
                backgroundColor: "#F0F0FF",
              },
            ]}
            onPress={() => handleTarifPress(tarif.id)}
          >
            <Text
              style={[
                scss.tarifDuration,
                selectedTarif === tarif.id && { color: "#312CBE" },
              ]}
            >
              {tarif.month} months
            </Text>
            <View>
              <Text
                style={[
                  scss.tarifPrice,
                  selectedTarif === tarif.id  && { color: "#312CBE" },
                ]}
              >
                ${tarif.price}
              </Text>
              <Text
                style={[
                  scss.tarifWeeklyPrice,
                  selectedTarif === tarif.id && { color: "#312CBE" },
                ]}
              >
                ${tarif.weeklyPrice} per week
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          id="3"
          style={[
            scss.tarifBtn,
            selectedTarif === 3 && {
              borderColor: "#312CBE",
              backgroundColor: "#F0F0FF",
            },
          ]}
          onPress={() => handleTarifPress(3)}
        >
          <Text
            style={[
              { fontWeight: 700, fontSize: 16 },
              selectedTarif === "12" && { color: "#312CBE" },
            ]}
          >
            24 hours free
          </Text>
          <Text
            style={[
              { fontWeight: 700, fontSize: 16 },
              selectedTarif === "12" && { color: "#312CBE" },
            ]}
          >
            $0.00
          </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "700" }} onPress={() => router.push("/MoreDatails")}>
          More details
        </Text>
      </View>
      <View style={scss.foot}>
        <TouchableOpacity style={scss.footBtn}>
          <Text style={scss.btn_text} onPress={() => router.push("/Main")}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={scss.footText}>
          The subscription is renewed automatically. You can cancel {"\n"} at
          any time.
        </Text>
      </View>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  subscribe: {
  },
  content: {
    gap: 40,
    padding: 24,
  },
  text:{
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
  },
  box: {
    gap: 16,
  },
  tarifBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#b1b1b1",
    height: 76,
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tarifDuration: {
    fontSize: 16,
    fontWeight: 700,
  },
  tarifPrice: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "right",
  },
  tarifWeeklyPrice: {
    fontSize: 12,
    color: "#666",
  },
  foot: {
    gap: 20,
  },
  footBtn: {
    width: "100%",
    height: 58,
    borderRadius: 20,
    backgroundColor: "#3B64FC",
    justifyContent: "center",
  },
  btn_text: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: 700,
    color: "#fff",
  },
  footText: {
    fontSize: 12,
    color: "#CAC8C8",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default SubscriptionPage;
