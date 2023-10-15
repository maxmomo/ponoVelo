import React from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TeamsScreen from '../screens/TeamsScreen';
import LeaguesScreen from '../screens/LeaguesScreen';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function HomePage() {
    
    return (
        <View style={commonStyles.container}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: colors.backgroundLight
                    },
                    tabBarActiveTintColor: colors.theme,
                    tabBarInactiveTintColor: colors.whiteText
                }}
            >
                <Tab.Screen 
                    name='Equipes' 
                    component={TeamsScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='tshirt-crew' color={color} size={30} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name='Ligues'
                    component={LeaguesScreen}
                    options={{ 
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='flag-checkered' color={color} size={30} />
                        ),
                    }}
                />
            </Tab.Navigator>    
        </View>
    );
}
