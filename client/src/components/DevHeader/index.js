import React from 'react'
import { Header } from 'semantic-ui-react'
import "./devHeader.css";

const DevHeader = () => (
    <div className="top">
        <Header as='h2'
            className="devHeader"
            textAlign='center'
            dividing>
            Welcome to jtsy Portfolio
        </Header>
    </div>
)

export default DevHeader;