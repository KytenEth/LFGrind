import type { Theme } from "@rainbow-me/rainbowkit"

export const customTheme: Theme = {
  blurs: {
    modalOverlay: "blur(8px)",
  },
  colors: {
    accentColor: "#ec4899", // Pink-500
    accentColorForeground: "white",
    actionButtonBorder: "#fecdd3", // Pink-200
    actionButtonBorderMobile: "#fecdd3", // Pink-200
    actionButtonSecondaryBackground: "#fdf2f8", // Pink-50
    closeButton: "#9d174d", // Pink-800
    closeButtonBackground: "#fce7f3", // Pink-100
    connectButtonBackground: "#ec4899", // Pink-500
    connectButtonBackgroundError: "#be123c", // Red-700
    connectButtonInnerBackground: "#db2777", // Pink-600
    connectButtonText: "white",
    connectButtonTextError: "white",
    connectionIndicator: "#ec4899", // Pink-500
    error: "#be123c", // Red-700
    generalBorder: "#fecdd3", // Pink-200
    generalBorderDim: "#fce7f3", // Pink-100
    menuItemBackground: "#fdf2f8", // Pink-50
    modalBackdrop: "rgba(236, 72, 153, 0.3)", // Pink-500 with opacity
    modalBackground: "white",
    modalBorder: "#fecdd3", // Pink-200
    modalText: "#831843", // Pink-900
    modalTextDim: "#9d174d", // Pink-800
    modalTextSecondary: "#be185d", // Pink-700
    profileAction: "#fce7f3", // Pink-100
    profileActionHover: "#fbcfe8", // Pink-200
    profileForeground: "white",
    selectedOptionBorder: "#ec4899", // Pink-500
    standby: "#ec4899", // Pink-500
  },
  fonts: {
    body: "'Comic Sans MS', 'Comic Sans', cursive",
  },
  radii: {
    actionButton: "0.5rem",
    connectButton: "9999px", // Fully rounded
    menuButton: "0.5rem",
    modal: "0.75rem",
    modalMobile: "0.75rem",
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(236, 72, 153, 0.4)",
    dialog: "0px 8px 32px rgba(236, 72, 153, 0.25)",
    profileDetailsAction: "0px 2px 6px rgba(236, 72, 153, 0.2)",
    selectedOption: "0px 2px 6px rgba(236, 72, 153, 0.2)",
    selectedWallet: "0px 2px 6px rgba(236, 72, 153, 0.2)",
    walletLogo: "0px 2px 16px rgba(236, 72, 153, 0.16)",
  },
}
