import Modal from "react-native-modal";

import React from "react";
import tw from "twrnc";
import LottieView from "lottie-react-native";

const Loader = ({ loading }) => {
  return (
    <Modal
      isVisible={loading}
      animationType="slide"
      transparent={true}
      style={tw`w-[90%] h-1/2 self-center m-0`}
    >
      <LottieView
        style={tw`w-24 h-24 self-center`}
        loop={true}
        autoPlay
        source={require("../../animations/loading.json")}
      />
    </Modal>
  );
};

export default Loader;
