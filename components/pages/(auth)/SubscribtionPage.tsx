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
  const router = useRouter()
  const [selectedTarif, setSelectedTarif] = useState(null);

  const tarifs = [
    { month: 6, price: 38.9, weeklyPrice: 1.5 },
    { month: 3, price: 23.9, weeklyPrice: 1.84 },
    { month: 1, price: 9.99, weeklyPrice: 2.31 },
  ];

  const handleTarifPress = (id:any) => {
    setSelectedTarif(id);
  };

  return (
    <SafeAreaView style={scss.subscribe}>
      <View style={scss.content}>
        <Text style={scss.headerTitle}>Открой полный доступ к приложению!</Text>
        <Text style={scss.headerSubtitle}>
          Персональные рекомендации. Умный анализ. Видимый результат.
        </Text>
      </View>
      <View style={scss.box}>
        {tarifs.map((tarif, index) => (
          <TouchableOpacity
            key={index}
            style={[
              scss.tarifBtn,
              selectedTarif === index && {
                borderColor: "#312CBE",
                backgroundColor: "#F0F0FF",
              },
            ]}
            onPress={() => handleTarifPress(index)}
          >
            <Text
              style={[
                scss.tarifDuration,
                selectedTarif === index && { color: "#312CBE" },
              ]}
            >
              {tarif.month} месяцев
            </Text>
            <View>
              <Text
                style={[
                  scss.tarifPrice,
                  selectedTarif === index && { color: "#312CBE" },
                ]}
              >
                ${tarif.price}
              </Text>
              <Text
                style={[
                  scss.tarifWeeklyPrice,
                  selectedTarif === index && { color: "#312CBE" },
                ]}
              >
                ${tarif.weeklyPrice} в неделю
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          id='12'
          style={[
            scss.tarifBtn,
            selectedTarif === 0 && {
              borderColor: "#312CBE",
              backgroundColor: "#F0F0FF",
            },
          ]}
          onPress={() => handleTarifPress(0)}
        >
          <Text
            style={[
              { fontWeight: 700, fontSize: 16 },
              selectedTarif === '12' && { color: "#312CBE" },
            ]}
          >
            24 часа бесплатно
          </Text>
          <Text
            style={[
              { fontWeight: 700, fontSize: 16 },
              selectedTarif === '12' && { color: "#312CBE" },
            ]}
          >
            $0.00
          </Text>
        </TouchableOpacity>
      </View>
      <View style={scss.foot}>

      <TouchableOpacity style={scss.footBtn}>
        <Text style={scss.btn_text} onPress={() => router.push('/Main') }>
          Попробовать бесплатно
        </Text>
      </TouchableOpacity>
      <Text style={scss.footText}>
        Подписка продлевается автоматически. Отменить {"\n"}можно в любой момент.
      </Text>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  subscribe: {
    padding: 24,
    gap: 40,
  },
  content: {
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
    borderColor: "#000",
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
gap:20
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