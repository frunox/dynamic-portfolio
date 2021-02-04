import React, { useContext } from 'react'
import { Button, Form, TextArea, Grid } from 'semantic-ui-react'
import DevDataContext from "../../contexts/DevDataContext";
// import "./emailform.css"

const EmailForm = () => {
    const devCtx = useContext(DevDataContext);
    console.log('in emailForm, email: ', devCtx.state.email);
    return (
        <Form className="formBody" action={"mailto: " + devCtx.state.email} method="GET" target="_blank">
            <Grid className="formBody" columns="1">
                <Grid.Column width="6">
                    <Form.Field inline className='field'>
                        <label className='label' htmlFor='subject'>Subject</label>
                        <input className="input" name='subject' id='subject' type='text' placeholder='Subject...' />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width="12">
                    <Form.Field as="Segment" className='field'>
                        <label className="label" htmlFor='body'>Message</label>
                        <TextArea rows={3} className='textarea' name='body' id='body' placeholder='Message...' />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width="6">
                    <Button secondary type='submit'>Send</Button>
                </Grid.Column>
            </Grid>
        </Form>
    )
}

export default EmailForm