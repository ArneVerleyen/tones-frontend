import React from 'react';
import {BrowserRouter as HashRouter, Switch, Redirect} from 'react-router-dom';

// scss import.
import './_sass/index.scss';

// Pages import
import {
    HomePage,
    TrainingPage,
    IntervalsPage,
    LoginPage,
    RegisterPage,
    IntervalSettingsPage,
    EndSessionPage,
    SynchroneIntervalSettingsPage,
    IntervalsSynchronicPage,
    SessionsPage,
    SessionDetailPage,
    TriadsPage,
    TriadsSettingsPage,
    EndSessionChordsPage,
    ProgressListPage,
    ChordTrainingSessionsPage,
    ChordSessionDetailPage,
    ChordsSettingsPage,
    SeventhChordsSettingPage,
    SeventhsPage,
    ChordsPage
} from './pages';

import * as Routes from './routes';

import {RouteWithLayout} from './utilities';
import {FooterLayOut, PageLayOut} from './layout';

// Services
import { ApiProvider } from './services';
import { AuthProvider } from './services';
import { ChordsInfo, IntervalsInfo } from './components';


function App() {
  return (
    <div className="App">
        <AuthProvider>
            <HashRouter basename={process.env.PUBLIC_URL}>
                <ApiProvider>
                    <Switch>
                        <Redirect exact path = {Routes.LANDING} to = {Routes.HOME} />
                        <RouteWithLayout exact path = {Routes.HOME} component = {HomePage} layout = {FooterLayOut} />

                        <RouteWithLayout exact path = {Routes.TRAINING} component = {TrainingPage} layout = {PageLayOut} />
                        
                        <RouteWithLayout exact path = {Routes.INTERVALS} component = {IntervalsPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.INTERVAL_SETTINGS} component = {IntervalSettingsPage} layout = {PageLayOut} />

                        <RouteWithLayout exact path = {Routes.TRIADS} component = {TriadsPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.TRIADS_SETTINGS} component = {TriadsSettingsPage} layout = {PageLayOut} />
                        
                        <RouteWithLayout exact path = {Routes.SEVENTHS_SETTINGS} component = {SeventhChordsSettingPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.SEVENTHS} component = {SeventhsPage} layout = {PageLayOut} />
                       
                        <RouteWithLayout exact path = {Routes.CHORDS_SETTINGS} component = {ChordsSettingsPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.CHORDS} component = {ChordsPage} layout = {PageLayOut} />

                        <RouteWithLayout exact path = {Routes.CHORDS_INFO} component = {ChordsInfo} layout = {PageLayOut} />

                        <RouteWithLayout exact path = {Routes.INTERVALS_INFO} component = {IntervalsInfo} layout = {PageLayOut} />
                        
                        <RouteWithLayout exact path = {Routes.CHORDS_END_SESSION} component = {EndSessionChordsPage} layout = {PageLayOut} />

                        <RouteWithLayout exact path = {Routes.INTERVALS_SYNCHRONIC} component = {IntervalsSynchronicPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.INTERVALS_SYNCHRONIC_SETTINGS} component = {SynchroneIntervalSettingsPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.INTERVALS_END_SESSION} component = {EndSessionPage} layout = {PageLayOut} />

                        <RouteWithLayout exact path = {Routes.USER_SESSIONS} component = {ProgressListPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.INTERVALS_PROGRESS_LIST} component = {SessionsPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.CHORDS_PROGRESS_LIST} component = {ChordTrainingSessionsPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.CHORDS_PROGRESS_DETAIL} component = {ChordSessionDetailPage} layout = {PageLayOut} />

                        <RouteWithLayout exact path = {Routes.USER_SESSION_DETAIL} component = {SessionDetailPage} layout = {PageLayOut} />

                        <RouteWithLayout exact path = {Routes.AUTH_SIGN_IN} component = {LoginPage} layout = {PageLayOut} />
                        <RouteWithLayout exact path = {Routes.AUTH_SIGN_UP} component = {RegisterPage} layout = {PageLayOut} />
                    </Switch>
                </ApiProvider>
            </HashRouter>
        </AuthProvider>
    </div>
  );
};

export default App;
