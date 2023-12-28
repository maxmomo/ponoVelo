import React from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TeamsScreen from '../screens/TeamsScreen';
import TeamPage from './TeamPage';
import LeaguesScreen from '../screens/LeaguesScreen';
import LeaguePage from '../pages/LeaguePage';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

const LeaguesStack = createStackNavigator();
const TeamsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LeaguesStackScreen() {
    return (
        <LeaguesStack.Navigator screenOptions={{ headerShown: false }}>
            <LeaguesStack.Screen name="Leagues" component={LeaguesScreen} />
            <LeaguesStack.Screen name="League" component={LeaguePage} />
        </LeaguesStack.Navigator>
    );
}

function TeamsStackScreen() {
    return (
        <TeamsStack.Navigator screenOptions={{ headerShown: false }}>
            <TeamsStack.Screen name="Teams" component={TeamsScreen} />
            <TeamsStack.Screen name="Team" component={TeamPage} />
        </TeamsStack.Navigator>
    );
}

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
                    name='Ligues'
                    component={LeaguesStackScreen}
                    options={{ 
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='flag-checkered' color={color} size={30} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name='Equipes' 
                    component={TeamsStackScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='tshirt-crew' color={color} size={30} />
                        ),
                    }}
                />
            </Tab.Navigator>    
        </View>
    );
}
