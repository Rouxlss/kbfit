import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'

export const KBFITApp = () => {
    return (
        <AppTheme>
            <AppRouter/>
        </AppTheme>
    )
}
