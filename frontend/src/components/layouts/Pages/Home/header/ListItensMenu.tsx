import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ConstructionIcon from '@mui/icons-material/Construction';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Category, Work } from '@mui/icons-material';

interface CustomListProps {
  navigateToPage: (path: string) => void;
}

function CustomList({ navigateToPage }: CustomListProps) {
  return (
    <>
      {/* HOME PAGE */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/home')}>
            <ListItemIcon>
              <HomeIcon /> {/* ICON */}
            </ListItemIcon>
            <ListItemText primary="Home" /> {/* TEXT */}
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {/* CADASTROS */}
      <List>
        <ListItem>
          <ListItemText primary="Cadastro" /> {/* TEXT */}
        </ListItem>
        {/* PESSOAS */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/cadastropessoas')}>
            <ListItemIcon>
              <PeopleIcon /> {/* ICON */}
            </ListItemIcon>
            <ListItemText primary="Usuarios" /> {/* TEXT */}
          </ListItemButton>
        </ListItem>

        {/* SERVIÇOS */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/cadastroservicos')}>
            <ListItemIcon>
              <ConstructionIcon /> {/* ICON */}
            </ListItemIcon>
            <ListItemText primary="Serviços" /> {/* TEXT */}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/cadastroproduto')}>
            <ListItemIcon>
              <InventoryIcon /> {/* ICON */}
            </ListItemIcon>
            <ListItemText primary="Produtos" /> {/* TEXT */}
          </ListItemButton>
        </ListItem>
      </List>

      {/* CATEGORIAS */}
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigateToPage('/categorias')}>
          <ListItemIcon>
            <Category/>
          </ListItemIcon>
          <ListItemText primary="Categorias" /> {/* TEXT */}
        </ListItemButton>
      </ListItem>

      {/* CARGOS */}
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigateToPage('/cargos')}>
          <ListItemIcon>
            <Work/>
          </ListItemIcon>
          <ListItemText primary="Cargos" /> {/* TEXT */}
        </ListItemButton>
      </ListItem>
      <Divider />


      {/* Listagem */}
      <List>
        <ListItem>
          <ListItemText primary="Relatórios" /> {/* TEXT */}
        </ListItem>
        {/* DASHBOARD */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateToPage('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon /> {/* ICON */}
            </ListItemIcon>
            <ListItemText primary="Dashboard" /> {/* TEXT */}
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default CustomList;
