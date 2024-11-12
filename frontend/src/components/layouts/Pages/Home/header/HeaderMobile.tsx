import { Stack } from '@mui/material';
import React from 'react';
import NightModeToggle from '../../../../NightModeToggle';
import AccountMenu from './AccountMenu';


const HeaderMobile: React.FC = () => {
    return(
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
        <NightModeToggle />
        <AccountMenu />
    </Stack>
    )
}

export default HeaderMobile;