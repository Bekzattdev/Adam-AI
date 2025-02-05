import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MoreDetailsPage = () => {
  // it's my life
  return (
    <SafeAreaView style={scss.details}>
      <View style={scss.content}>
        <View style={{ gap: 8 }}>
          <Text style={scss.mainTitle}>More Details</Text>

          <Text style={scss.subtitle}>
            Personalized recommendations. Intelligent analysis. Measurable
            progress.
          </Text>
        </View>
        <LinearGradient
          colors={["#2c34c9", "#786cd4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={scss.proCard}
        >
          <Text style={scss.proTitle}>PRO version</Text>
          <Text style={scss.proDescription}>
            ✓ <Text style={scss.bold}>Unlimited Access to All Features</Text>
            {"\n"}
            {"\n"}✓ <Text style={scss.bold}>Faster AI Response Times</Text>{" "}
            (priority queue for requests){"\n"}
            {"\n"}✓ <Text style={scss.bold}>Extended Usage</Text> (no daily
            message limits, larger file uploads, deeper data and image analyses)
            {"\n"}
            {"\n"}✓{" "}
            <Text style={scss.bold}>Advanced Personalization & Analytics</Text>{" "}
            (detailed PDF reports, long-term history tracking, personalized
            reminders){"\n"}
            {"\n"}✓{" "}
            <Text style={scss.bold}>Exclusive Access to Beta Features</Text>{" "}
            (try out new functionalities before anyone else){"\n"}
            {"\n"}✓ <Text style={scss.bold}>Priority Support</Text> (faster
            responses from the support team)
          </Text>
        </LinearGradient>
        <View style={scss.freeCard}>
          <Text style={scss.freeTitle}>FREE version</Text>
          <Text style={scss.freeDescription}>
            ✓ 24 hours free after registration{"\n"}✓ Only 3 requests per day
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const scss = StyleSheet.create({
  details: {
  },
  content: {
    padding: 24,
    gap: 32,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
  proCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    elevation: 5,
    gap: 5,
  },
  proTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    paddingBottom: 10,
  },
  proDescription: {
    fontSize: 14,
    color: "#FFF",
  },
  bold: {
    fontWeight: 700,
  },
  freeCard: {
    backgroundColor: "#e6f7f3",
    padding: 16,
    borderRadius: 16,
  },
  cardText: {
    gap: 30,
  },
  freeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  freeDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 25,
  },
});

export default MoreDetailsPage;
