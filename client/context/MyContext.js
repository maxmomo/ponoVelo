import React, { createContext, useContext, useReducer } from 'react';

// Crée le contexte
const MyContext = createContext();

// Actions possibles pour modifier l'état
const SET_USERNAME = 'SET_USERNAME';
const SET_TEAM = 'SET_TEAM';
const SET_STATISTICS = 'SET_STATISTICS';
const SET_RACE_STATISTIC = 'SET_RACE_STATISTIC';
const SET_LEAGUE = 'SET_LEAGUE';
const SET_NEXT_RACE = 'SET_NEXT_RACE';
const SET_RACE = 'SET_RACE';

// Définit le fournisseur du contexte
export const MyContextProvider = ({ children }) => {
    const initialState = {
        user: '',
        team: '',
        year: 2023,
        statistics: [],
        raceStatistic: '',
        league: '',
        team_status: ['WT', 'PRT'],
        ip_adress: '192.168.1.125',
        next_race: {},
        race: {}
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case SET_USERNAME:
                return { ...state, user: action.payload };
            case SET_TEAM:
                return { ...state, team: action.payload };
            case SET_STATISTICS:
                return { ...state, statistics: action.payload };
            case SET_RACE_STATISTIC:
                return { ...state, raceStatistic: action.payload };
            case SET_LEAGUE:
                return { ...state, league: action.payload };
            case SET_NEXT_RACE:
                return { ...state, next_race: action.payload };
            case SET_RACE:
                return { ...state, race: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
        {children}
        </MyContext.Provider>
    );
};

// Utilise un hook personnalisé pour accéder au contexte
export const useMyContext = () => {
    return useContext(MyContext);
};
