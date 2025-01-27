import React from 'react';
import { Outlet } from 'react-router-dom';
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import Navbar from 'components/navbar/NavbarAdmin.js';
import { SidebarContext } from 'contexts/SidebarContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import routes from 'routes.js';

const AdminLayout = ({ theme, setTheme }) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Outlet />
    </>
  );
};

export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    routes.forEach((route) => {
      if (route.collapse) {
        let collapseActiveRoute = getActiveRoute(route.items);
        if (collapseActiveRoute !== activeRoute) {
          activeRoute = collapseActiveRoute;
        }
      } else if (route.category) {
        let categoryActiveRoute = getActiveRoute(route.items);
        if (categoryActiveRoute !== activeRoute) {
          activeRoute = categoryActiveRoute;
        }
      } else if (window.location.href.indexOf(route.layout + route.path) !== -1) {
        activeRoute = route.name;
      }
    });
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    routes.forEach((route) => {
      if (route.collapse) {
        let collapseActiveNavbar = getActiveNavbar(route.items);
        if (collapseActiveNavbar !== activeNavbar) {
          activeNavbar = collapseActiveNavbar;
        }
      } else if (route.category) {
        let categoryActiveNavbar = getActiveNavbar(route.items);
        if (categoryActiveNavbar !== activeNavbar) {
          activeNavbar = categoryActiveNavbar;
        }
      } else if (window.location.href.indexOf(route.layout + route.path) !== -1) {
        activeNavbar = route.secondary;
      }
    });
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    routes.forEach((route) => {
      if (route.collapse) {
        let collapseActiveNavbar = getActiveNavbarText(route.items);
        if (collapseActiveNavbar !== activeNavbar) {
          activeNavbar = collapseActiveNavbar;
        }
      } else if (route.category) {
        let categoryActiveNavbar = getActiveNavbarText(route.items);
        if (categoryActiveNavbar !== activeNavbar) {
          activeNavbar = categoryActiveNavbar;
        }
      } else if (window.location.href.indexOf(route.layout + route.path) !== -1) {
        activeNavbar = route.messageNavbar;
      }
    });
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/admin') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  document.documentElement.dir = 'ltr';
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={routes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={'Jewelery Trend'}
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            {getRoute() ? (
              <Box
                mx="auto"
                p={{ base: '20px', md: '30px' }}
                pe="20px"
                minH="100vh"
                pt="50px"
              >
               <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/admin/default" replace />}
                  />
                </Routes>
              </Box>
            ) : null}
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
}
