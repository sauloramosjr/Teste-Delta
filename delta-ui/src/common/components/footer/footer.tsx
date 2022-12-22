import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../../../routes";
import styled from "styled-components";
import "./footer.css";
const MyNav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  left: 0;
`;
export const Footer = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const menu = routes.map((route) => ({
    title: route.title,
    path: route.path,
    icon: route.icon,
  }));

  const displayMenu = () => {
    return (
      <BottomNavigation showLabels>
        {menu.map((item, key) => {
          return (
            <BottomNavigationAction
              key={key}
              label={item.title}
              icon={item.icon}
              onClick={() => navigation(item.path)}
              className={
                (location.pathname === "/" && item.path === "/") ||
                (location.pathname !== "/" &&
                  item.path !== "/" &&
                  location.pathname.includes(item.path))
                  ? "active"
                  : ""
              }
            />
          );
        })}
      </BottomNavigation>
    );
  };

  return (
    <>
      <MyNav> {displayMenu()} </MyNav>
    </>
  );
};
