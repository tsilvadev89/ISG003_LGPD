import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../theme/ThemeContextProvider";

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        margin:0,
        padding:0,
  
      }}
    >
      <IconButton sx={{ ml: 1 , margin:0,padding:0}} onClick={toggleColorMode} color="inherit">
        {mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default NightModeToggle;
