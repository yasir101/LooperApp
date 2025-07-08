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
    height: "25%",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
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
  modalButtonCancel: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#f5aa2f",
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  modalButtonCancelText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  roleContainer: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
  },
  roleOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f6b300",
  },
  checkboxSelected: {
    backgroundColor: "#f6b300",
  },
  roleText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  checkmark: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});

export default styles;
