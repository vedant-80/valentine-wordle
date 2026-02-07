// Heart SVG color - deep pink/red for better contrast against pink-purple gradient background
export const HEART_COLOR_RGB = { r: 255, g: 20, b: 147 }; // Deep pink

// Helper function to create rgba string with opacity
export const getHeartColor = (opacity: number): string => {
  return `rgba(${HEART_COLOR_RGB.r}, ${HEART_COLOR_RGB.g}, ${HEART_COLOR_RGB.b}, ${opacity})`;
};


