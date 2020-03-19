import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../css/themePalette.css';
import '../css/Temperature.css';

export default ({ healthRecord, allRecords }) => {
  const averageTemperature = allRecords
    ? allRecords.reduce((record, sum) => {
        return record.temperature + sum;
      }, 0) / allRecords.length
    : 'no data';
  return (
    <Card>
      <Card.Body>
        <Card.Title id="Temperature-temp">{healthRecord ? healthRecord.temperature : '??'}F</Card.Title>
        <Card.Subtitle id="Temperature-avgTempText">{averageTemperature}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
