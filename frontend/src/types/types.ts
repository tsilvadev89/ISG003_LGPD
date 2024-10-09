export interface Product {
    id: number;
    name: string;
    image: string;
    description?: string;
    purchasePrice: number;
    salePrice: number;
    stock: number;
    minStock: number;
    category: "Porção" | "Bebida" | "Combo" | "Diversos";
    stockLocation?: string;
    generalInfo?: string;
    status?: boolean;
  }
  
  export interface User {
    id_usuario: number;
    nome_usuario: string;
    email_usuario: string;
    senha_usuario: string;
    diretoria_usuario: number;
    permissao_usuario: string;
    admin_usuario: number;
    userPhoto: string;
  }