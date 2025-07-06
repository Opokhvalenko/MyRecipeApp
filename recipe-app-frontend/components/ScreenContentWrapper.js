import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenContentWrapper = ({ children, style, scrollable = true }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      {scrollable ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.viewContainer}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  viewContainer: {
    flex: 1,
  },
});

export default ScreenContentWrapper;
