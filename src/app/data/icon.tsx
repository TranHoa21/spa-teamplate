import { FaHome, FaUser, FaShoppingCart, FaBox, FaCog, FaUsers, FaStar, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaUserTie, FaStore } from 'react-icons/fa';
import { ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho icons
interface IconMap {
    home: ReactNode;
    user: ReactNode;
    product: ReactNode;
    order: ReactNode;
    settings: ReactNode;
    users: ReactNode;
    shoppingCart: ReactNode;
    review: ReactNode;
    revenue: ReactNode;
    increase: ReactNode;
    decrease: ReactNode;
    employee: ReactNode;
    shop: ReactNode;
    star: ReactNode;
}

// Xuất các biểu tượng
export const icons: IconMap = {
    home: <FaHome />,
    user: <FaUser />,
    product: <FaShoppingCart />,
    order: <FaBox />,
    settings: <FaCog />,
    users: <FaUsers />,
    shoppingCart: <FaShoppingCart />,
    review: <FaStar />,
    revenue: <FaMoneyBillWave />,
    increase: <FaArrowUp />,
    decrease: <FaArrowDown />,
    employee: <FaUserTie />,
    shop: <FaStore />,
    star: <FaStar />,
};
