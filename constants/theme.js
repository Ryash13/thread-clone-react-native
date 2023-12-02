const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",
  textButton: "#007FFF",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
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
  colorMode: "light",
  backgroundColor: "#D4D4D4",
  transition: {
    type: "timing",
    duration: 3000,
  },
};

export { COLORS, SIZES, SHADOWS, skeletonProp };
