import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface TemplateContextProps {
    template: string;
    setTemplate: Dispatch<SetStateAction<string>>;
}

const TemplateContext = createContext<TemplateContextProps>({
    template: 'desktop',
    setTemplate: () => {},
});

export const useTemplate = () => {
    return useContext(TemplateContext);
};

interface TemplateProviderProps {
    template: string;
    children: React.ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ template, children }) => {
    const [currentTemplate, setCurrentTemplate] = useState(template);

    return (
        <TemplateContext.Provider value={{ template: currentTemplate, setTemplate: setCurrentTemplate }}>
            {children}
        </TemplateContext.Provider>
    );
};
