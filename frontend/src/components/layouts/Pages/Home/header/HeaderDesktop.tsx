import { Stack } from '@mui/material';
import React from 'react';
import NightModeToggle from '../../../../NightModeToggle';
import AccountMenu from './AccountMenu';


const HeaderDesktop: React.FC = () => {
    return(
    <Stack direction={'row'}>
        <NightModeToggle />
        <AccountMenu />
    </Stack>
    )
}

export default HeaderDesktop;