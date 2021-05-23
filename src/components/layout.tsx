import React, { useState, useRef, useEffect } from 'react';
import { Flex, Box, Text, Icon, Button } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';

import Sidebar from 'components/sidebar';

import { SIDEBAR_WIDTH } from 'common/constants';

const Layout: React.FC = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) {
      // inside click
      return;
    }
    // outside click
    setShowSidebar(false);
  };

  useEffect(() => {
    if (showSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <Flex sx={{ width: '100%', color: 'black' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: ['block', 'block', 'none'],
          width: SIDEBAR_WIDTH,
          height: '100vh',
          transform: showSidebar
            ? 'translate3d(0px,0px,0px)'
            : 'translate3d(-280px,0,0px)',
          transition: '0.1s transform ease-out',
          boxShadow: 'rgba(0, 0, 0, 0.20) 2px 8px 20px',
          zIndex: 10,
        }}
        ref={ref}
      >
        <Sidebar />
      </Box>
      <Box sx={{ display: ['none', 'none', 'block'] }}>
        <Sidebar />
      </Box>
      <Box
        sx={{
          width: ['100%', '100%', `calc(100% - ${SIDEBAR_WIDTH})`],
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        <Flex
          sx={{
            width: '100%',
            p: 8,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Flex sx={{ width: '100%', alignItems: 'center' }}>
            <Icon
              as={GiHamburgerMenu}
              sx={{
                cursor: 'pointer',
                color: 'gray.400',
                fontSize: '24px',
                mr: 4,
                display: ['block', 'block', 'none'],
                transition: '0.2s color',
              }}
              _hover={{
                color: 'gray.500',
              }}
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <Text fontWeight={600} fontSize="2xl">
              <Box as="span" role="img" aria-label="wave" mr={2}>
                👋
              </Box>{' '}
              Hi Shashank!
            </Text>
          </Flex>
          <Button
            variant="outline"
            size="sm"
            color="gray.600"
            px={4}
            borderRadius={10}
          >
            <Icon as={FiLogOut} mr={2} />
            Logout
          </Button>
        </Flex>
        <Box px={4}>{children}</Box>
      </Box>
    </Flex>
  );
};

export default Layout;
