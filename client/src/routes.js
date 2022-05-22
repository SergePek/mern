import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Router>
                <Switch>
                    <Route path="/links" exact>
                        <LinksPage />
                    </Route>
                    <Route path="/create" exact>
                        <CreatePage />
                    </Route>
                    <Route path="/detail/:id">
                        <DetailPage />
                    </Route>
                    <Redirect to="/create" />
                </Switch>
            </Router>

        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}