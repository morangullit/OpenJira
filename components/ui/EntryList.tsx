import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import style from './EntryList.module.css';


interface Props {
    status: EntryStatus;
}


export const EntryList: FC<Props> = ({ status }) => {

const { entries, updateEntry } = useContext( EntriesContext );
const { isDragging, endDragging } = useContext( UIContext )

const entriesBystatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ]);

const allowDrop = ( event: DragEvent<HTMLDivElement> )  => {
  event.preventDefault();
}
const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
  const id = event.dataTransfer.getData( 'text' );
  console.log({id})

  const entry = entries.find( e => e._id === id )!;
  entry.status = status;
  updateEntry( entry );
  endDragging();

}


  return (

// Todo: aqui haremos drop
    <div 
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? style.dragging : ''}
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}>
           
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
              {
                entriesBystatus.map( entry =>(
                    <EntryCard key={ entry._id } entry={ entry }/>
                ))
              }
            </List>
            
        </Paper>
    </div>
  )
}
