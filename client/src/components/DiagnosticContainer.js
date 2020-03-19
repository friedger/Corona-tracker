import React from 'react';
import '../css/App.css'
import '../css/DiagnosticContainer.css'
import '../css/themePalette.css'
import { ReactComponent as Logo } from '../img/Logo_CORONATRACKER_Logo.svg'
import { ReactComponent as TextLogo } from '../img/Logo_CORONATRACKER_Text_Logo.svg'
import NavBar from './NavBar';

import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

function DiagnosticContainer(props) {
    const { handleSignOut, userSession } = props;
    return (
        <div className="Login">
            <NavBar />
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Logo className="DiagnosticLogo" />
                    </Col>
                    <Col xs={10}>
                        <TextLogo className="DiagnosticText" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Welcome, <b>{userSession.loadUserData().profile.name}</b>!</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Today's date is {Date.now()}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr></hr>
                    </Col>
                </Row>
            </Container>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
}

export default DiagnosticContainer;
