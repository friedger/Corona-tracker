import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function WeeklyTrackerDay({ weekFile, day }) {
  const [days] = useFile(weekFile);
  const dayData = days[day];
  return (
    <Container>
      <Row xs={2} md={4} lg={6}>
        <Col>{dayData.wellBeing}</Col>
        <Col>{dayData.temperature}</Col>
      </Row>
      <Row xs={1} md={2}>
        <Col>{dayData.symptoms}</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}
export default WeeklyTrackerDay;
