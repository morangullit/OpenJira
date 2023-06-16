import React, { ChangeEvent, useState, useMemo } from 'react'
import { GetServerSideProps } from 'next'
import { Layout } from '../../../components/layouts'
import { capitalize, Grid, CardHeader, Card, TextField, CardContent, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EntryStatus } from '../../../interfaces';
import { FC } from 'react';
import { isValidObjectId} from 'mongoose';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished', ];

interface Props {
    age: number;
}


export const EntryPage:FC<Props> = (props) => {


    console.log({props});
    

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <=0 && touched, [inputValue, touched])

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {

    }


  return (
    <Layout>
        <Grid
            container
            justifyContent='center'
            sx={{marginTop: 2}}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title={`Entrada: ${ inputValue }`}
                        subheader={`Creada hace: ...... minutos`}
                    />
                    <CardContent>
                        <TextField
                            sx={{ marginTop: 2, marginBottom: 2 }}
                            fullWidth
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            value={inputValue}
                            onChange={onInputValueChanged}
                            helperText={ isNotValid && 'Ingrese un Valor'}
                            onBlur={ () => setTouched(true)}
                            error={ isNotValid }
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio/>}
                                            label={ capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                           startIcon={<SaveOutlinedIcon/>} 
                           variant='contained'
                           fullWidth
                           onClick={ onSave }
                           disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <IconButton
            sx={{
                position:'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'red',
            }}
        >
            <DeleteOutlinedIcon/>
        </IconButton>
    </Layout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({params}) => {
   
    const { id } = params as { id: string };
    if ( !isValidObjectId(id) ){
        return {
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }


    return {
        props: {
            id,
        }
    }
}


export default EntryPage;
