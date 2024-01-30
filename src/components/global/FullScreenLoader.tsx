import React, { FC } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import COLORS from "../../constants/Colors";

interface ModalProps {
  isVisible: boolean;
}

const Loader: FC<ModalProps> = ({ isVisible }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      {isVisible && (
        <View
          style={{
            backgroundColor: COLORS.Black + "85",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.RoyalBlue} />
        </View>
      )}
    </Modal>
  );
};

export default Loader;
