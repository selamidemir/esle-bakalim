import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: 64,
    height: 80,
    margin: 6,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#333",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backfaceVisibility: "hidden",
  },
  flipped: {
    backgroundColor: "#e2f0fe",
    borderColor: "#2196f3",
    borderWidth: 2,
  },
  unflipped: {
    backgroundColor: "#9ec7df",
    borderColor: "#aac3ce",
    borderWidth: 2,
  },
  matched: {
    backgroundColor: "#baf7b2",
    borderColor: "#43a047",
  },
  icon: {
    fontSize: 32,
  },
  cover: {
    width: "100%",
    height: "100%",
    backgroundColor: "#90a4ae",
    borderRadius: 12,
  },
});
