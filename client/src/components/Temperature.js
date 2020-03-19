import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../css/themePalette.css';
import '../css/Temperature.css';

export default Temperature = ({ healthRecord, allRecords }) => {
  const averageTemperature =
    allRecords.reduce(record => {
      record.temperature;
    }) / allRecords.length;
  return (
    <Card>
      <Card.Body>
        <Card.Title id="Temperature-temp">{healthRecord.temperature}F</Card.Title>
        <Card.Subtitle id="Temperature-avgTempText">{averageTemperature}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Temperature;
