import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.01)",
  },
  modalContent: {
    width: "100%",
    height: "35%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  modalInputContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  modalInputLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioItem: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f5aa2f",
    alignItems: "center",
    justifyContent: "center",
  },
  radioItemIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioItemSelected: {
    backgroundColor: "#f5aa2f",
  },
  radioItemText: {
    fontSize: 16,
    color: "#000",
  },
  modalButtonContainer: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
  },
  modalButton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});

export default styles;
