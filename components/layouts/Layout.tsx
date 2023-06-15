import { FC, ReactNode } from 'react';
import Head from 'next/head';

import  {Box } from '@mui/material';
import { NavBar, Sidebar } from '../ui';


interface Prosp {
  title?: string,
  children?: ReactNode
}

export const Layout: FC<Prosp> = ({title = 'OpenJira-App', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
          <title>{title}</title>
        </Head>
        <NavBar/>
        <Sidebar/>

        <Box sx={{ padding: '10px 20px'}}>
          { children }
        </Box>
    </Box>
  )
}
