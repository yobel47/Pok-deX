import analytics from '@react-native-firebase/analytics';

export const onLogScreenView = async (screenName) => {
  await analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName,
  });
};

export default onLogScreenView;
