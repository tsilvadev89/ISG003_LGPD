import { Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import MenuMobile from "../../Home/header/MenuMobile";
import MenuDesktop from "../../Home/header/MenuDesktop";
import HeaderMobile from "../../Home/header/HeaderMobile";
import HeaderDesktop from "../../Home/header/HeaderDesktop";
import UserManagement from "./UserManagement";
import { funcionarioService } from "../../../../../services/funcionarioService";

interface LayoutProps {
    template: string;
}

const CadastroPessoasPage: React.FC<LayoutProps> = ({ template }) => {

    const [isAdmin, setIsAdmin] = useState(false);

    const Header = template === 'mobile' ? HeaderMobile : HeaderDesktop;
    const Menu = template === 'mobile' ? MenuMobile : MenuDesktop;

    useEffect(() => {
        const checkUserStatus = async () => {
            const isFuncionarioUser = await funcionarioService.isFuncionario();
            // console.log('CadastroPessoasPage', isFuncionarioUser)
            setIsAdmin(isFuncionarioUser);
        };

        checkUserStatus();
    }, []);


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
                <UserManagement admin={isAdmin} updateOneUser={false} />
            </Stack>
        </Stack>
    );
};

export default CadastroPessoasPage;