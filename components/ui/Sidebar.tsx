import { useContext } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

import InboxIcon from '@mui/icons-material/Inbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { UIContext } from '../../context/ui';


const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext(UIContext);


  return (
    <Drawer
        anchor='left'
        open={ sidemenuOpen }
        onClose={ closeSideMenu }
    >

        <Box sx={{ width: 200}}>
            <Box sx={{padding: '5px 10px'}}>
                <Typography variant='h5'>
                    Menú
                </Typography>
            </Box>

            <List>
                {
                    menuItems.map((text, index) => (
                        <ListItem key={text}>
                            <ListItemIcon>
                                { index % 2 ? <InboxIcon/> : <MailOutlineIcon/> }
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))
                }
            </List>
            <Divider/>
            <List>
                {
                    menuItems.map((text, index) => (
                        <ListItem key={text}>
                            <ListItemIcon>
                                { index % 2 ? <InboxIcon/> : <MailOutlineIcon/> }
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))
                }
            </List>
           
        </Box>
        

    </Drawer>
  )
}
