import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CustomList from './ListItensMenu';
import { CssBaseline, AppBar, Toolbar, Divider } from '@mui/material';

interface Page {
    url: string;
    name: string;
}
const drawerWidth = 200;

const pages: Page[] = [
        { url: '/', name: 'Login' },
        { url: '/home', name: 'Home' },
        { url: '/cadastropessoas', name: 'Cadastro de Pessoas' },
        { url: '/cadastroservicos', name: 'Cadastro de Serviços' },
        { url: '/cadastroproduto', name: 'Cadastro de Produto' },
        { url: '/categorias', name: 'Cadastro Categorias' },
        { url: '/cargos', name: 'Cadastro Cargos' },
        { url: '/dashboard', name: 'Dashboard' },

];

export default function MenuDesktop() {
    const navigate = useNavigate();

    const navigateToPage = (url: string) => {
        const page = pages.find((p) => p.url === url);

        if (page) {
            navigate(page.url);
        } else {
            navigate('/404');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <CustomList navigateToPage={navigateToPage} />
            </Drawer>
        </Box>
    );
}
