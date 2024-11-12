import React from 'react';
import CarouselCardServices from '../body/CarouselCardServices';
import ListFilterServices from '../body/ListFilterServices';
import { Divider, Stack } from '@mui/material';
import CarouselCardProdutos from '../body/CarouselCardProdutos';
import ListFilterProdutos from '../body/ListFilterProdutos';

interface HomePageProps {
    template: string;
}

const Home: React.FC<HomePageProps> = ({ template }) => {
    return (
        <>
            <Stack flexDirection={'column'} gap={10}>
                <Stack>
                    <CarouselCardServices template={template} />
                    <ListFilterServices />
                </Stack>

                <Divider/>

                <Stack>
                    <CarouselCardProdutos template={template} />
                    <ListFilterProdutos />
                </Stack>
            </Stack>
        </>
    );
};

export default Home;
