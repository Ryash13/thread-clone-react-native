const COLORS = {
  light: {
    textPrimary: "#000000",
    textGray: "#A0A0A0",
    inputBg: "#F2F2F2",
    likeRed: "#EA333E",
    buttonBorder: "#CDCDCD",
    dividerBorder: "#F2F2F2",
    btnBackground: "#0A0909",
    btnText: "white",
    background: "#FFFFFF",
    icon: "black",
    threadweb: "#A0A0A0",
  },
  dark: {
    textPrimary: "#FFFFFF",
    textGray: "#878787",
    inputBg: "#0D0D0D",
    likeRed: "#EA333E",
    buttonBorder: "#3F3F3F",
    dividerBorder: "#A0A0A0",
    btnBackground: "#FFFFFF",
    btnText: "black",
    background: "#171717",
    icon: "white",
    threadweb: "#131313",
  },
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  xSmall: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 15,
  },
};

const skeletonProp = {
  transition: {
    type: "spring",
    duration: 3000,
  },
};

export { COLORS, SIZES, SHADOWS, skeletonProp };
