import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack'
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';
import { EntriesContext, entriesReducer } from './';

type EntriesProviderProps = {
    children: ReactNode;
  };


export interface EntriesState{
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {

    const [ state, dispatch ] = useReducer( entriesReducer, Entries_INITIAL_STATE );
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async ( description: string ) => {
       
        const { data } = await entriesApi.post<Entry>('/entries', {description});
        dispatch({ type: "[Entry] Add-Entry", payload: data });
      };

      const updateEntry = async ( {_id, description, status }: Entry, showSnackbar = false ) => {
        
        try {
          const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
          dispatch({ type: '[Entry] Entry-Updated', payload: data });

          if(showSnackbar)
            enqueueSnackbar( 'Entrada Actualizada', {
              variant: 'success',
              autoHideDuration: 1300,
              anchorOrigin:{
                vertical: 'top',
                horizontal: 'right',
              }
            })

        } catch (error) {
          console.log({error});
        }
      }

      const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: '[Entry] Refresh-Data', payload: data});
      }

      useEffect(() => {
        refreshEntries();
      }, [])
      

  return (
       <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry,
       }}>
            { children }
       </EntriesContext.Provider>
    )
};