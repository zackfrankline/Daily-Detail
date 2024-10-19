import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const SuccessScreen = ({
  isLoading,
  setIsLoading,
  success,
  setSuccess,
}) => {
  const loadingMessage = "Wait while we verify your action.";
  const successMessage = "Your action was completed successfully.";
  
  const handleCloseModal = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleCloseModal = () => {
      setIsLoading(false);
    };
    handleCloseModal();
  }, [isLoading]);

  return (
    <View style={styles.container}>
      {/* <Pressable
        style={{ backgroundColor: "blue", padding: 10 }}
        onPress={() => setShowModal(true)}
      >
        <Text style={{ color: "#fff" }}>Show Success</Text>
      </Pressable> */}
      <Modal visible={isLoading} animationType="fade">
        <View style={styles.modalContainer}>
          <LinearGradient
            locations={[0.5, 0.8]}
            style={styles.modalContent}
            colors={["#149DFF", "#3C3CFF"]}
          >
            {/* <LottieView
              source={require("./success.json")}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
            /> */}

            {!success ? (
              <>
                <ActivityIndicator style={styles.loader} size="large" />
                <Text style={styles.messageText}>{loadingMessage}</Text>
              </>
            ) : (
              <View style={styles.messageContainer}>
                <Text style={styles.successText}>Success!</Text>
                <Text style={styles.messageText}>{loadingMessage}</Text>
              </View>
            )}

            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    width: 100,
    height: 100,
  },
  messageContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  successText: {
    fontFamily: "Amaranth_700Bold",
    fontSize: 28,
  },
  messageText: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
});
