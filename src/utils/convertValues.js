const decimeterToMeter = (value) => parseFloat(String(value / 10)).toFixed(2);

const decimeterToFeet = (value) => parseFloat(String(value * 0.32808)).toFixed(2);

const hectogramsToKilograms = (value) => parseFloat(String(value / 10)).toFixed(2);

const hectogramsToPounds = (value) => parseFloat(String(value * 0.22046)).toFixed(2);

export default {
  decimeterToMeter,
  decimeterToFeet,
  hectogramsToKilograms,
  hectogramsToPounds,
};
