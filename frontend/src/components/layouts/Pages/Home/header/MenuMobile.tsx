import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

import { Menu } from '@mui/icons-material';
import CustomList from './ListItensMenu';

type Anchor = 'top';

export default function MenuMobile() {
    const navigate = useNavigate();

    const pages = [
        { url: '/', name: 'Login' },
        { url: '/home', name: 'Home' },
        { url: '/cadastropessoas', name: 'Cadastro de Pessoas' },
        { url: '/cadastroservicos', name: 'Cadastro de Serviços' },
        { url: '/cadastroproduto', name: 'Cadastro de Produto' },
        { url: '/categorias', name: 'Cadastro Categorias' },
        { url: '/cargos', name: 'Cadastro Cargos' },
        { url: '/dashboard', name: 'Dashboard' },
    ];

    const navigateToPage = (url: string) => {
        const page = pages.find((p) => p.url === url);

        if (page) {
            navigate(page.url);
        } else {
            navigate('/404');
        }
    };



    const [state, setState] = React.useState({
        top: false,
    });


    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 300 }}

            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <CustomList navigateToPage={navigateToPage}/>
        </Box>
    );

    return (
        <div>
            {(['top'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><Menu /></Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
