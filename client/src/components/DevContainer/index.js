/* eslint-disable max-len */

import React, { Fragment } from 'react'
import { Header, List, Container } from 'semantic-ui-react'
import "./devContainer.css";

const DevContainer = () => (
    <Fragment>
        <Header as="h3" className="cText" textAlign='center'>
            Change which projects appear on your portfolio
        </Header>
        <Container>
            <List as="ul" bulleted inverted className="bList">
                <List.Item as="li">Review your projects in the table below</List.Item>
                <List.Item as="li">Projects with Display = true will display on the home page</List.Item>
                <List.Item as="li">Click on a project row to change the Display status or add an image link and search keywords</List.Item>,
            </List>
        </Container>
        <hr />
    </Fragment>
)

export default DevContainer