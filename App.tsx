import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

function HomeScreen() {
  async function onDisplayNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default', 
    });

    await notifee.displayNotification({
      title: 'Watermelon',
      body: 'Watermelon is the best fruit',
      ios: {
        sound: 'default',
      },
    });        
  }

  async function onCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 10);
    // date.setHours(9);
    // date.setMinutes(15);
    // date.setSeconds(10);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
      title: 'Watermelon Meeting!!!!',
      body: 'Watermelon is a fruit 🍉 🍉 🍉',
      ios: {
        sound: 'default',
      }
    },
    trigger,
    );

    Alert.alert('Notification will trigger at ' + date);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>W a t e r m e l o n</Text>
      
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />

      <Button title="Trigger Notification" onPress={() => onCreateTriggerNotification()} />

    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { display: 'flex', backgroundColor: '#90ee90' },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8080',
  },
  text: {
    fontSize: 45,
    fontFamily: 'serif',
    marginBottom: 50,
  },
});

export default App;