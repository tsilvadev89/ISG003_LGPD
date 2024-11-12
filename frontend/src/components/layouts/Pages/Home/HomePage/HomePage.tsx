import { Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import React from 'react';
import MenuMobile from "../header/MenuMobile";
import MenuDesktop from "../header/MenuDesktop";
import HeaderMobile from "../header/HeaderMobile";
import HeaderDesktop from "../header/HeaderDesktop";
import Home from "./Home";

interface LayoutProps {
    template: string;
}

const HomePage: React.FC<LayoutProps> = ({ template }) => {

    const Header = template === 'mobile' ? HeaderMobile : HeaderDesktop;
    const Menu = template === 'mobile' ? MenuMobile : MenuDesktop;

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
            marginTop={1}
            spacing={1}
            maxWidth={template === 'mobile' ? 360 : 1080}
            minWidth={template === 'mobile' ? 300 : 1080}
            width={'100%'}
        >
            {/* HEADER */}
            <Stack
                width={'100%'}
                height={40}
                padding={1}
                gap={0}
                direction={'row'}
                justifyContent="space-between"
            >
                <Menu />
                <Header />
            </Stack>
            <Divider flexItem={true} />
            <Stack gap={4}>
                <Home template={template}/>
            </Stack>
        </Stack>
    );
};

export default HomePage;
