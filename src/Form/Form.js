import React, { Component } from "react";
import { Table, Form} from 'antd';
import { Validation } from './Validation.js'

const columns = [
  {
    title: 'Código de la materia',
    dataIndex: 'subject_cod',
    key: 'subject_cod',
  },
  {
    title: 'Nombre de la materia',
    dataIndex: 'subject_name',
    key: 'subject_name',
  },
  {
    title: 'Número de horas de dedicación presencial',
    render: () =>
        <Validation/>
  },
  {
    title: 'Número de horas de trabajo autónomo',
    dataIndex: 'autonomous_dedication',
    key: 'autonomous_dedication',    
  },
  {
    title: 'Número de horas de acompañamieto',
    dataIndex: 'accompaniment',
    key: 'accompaniment',
  },

];

const data = [
  {
    key: '1',
    subject_cod: '1234567',
    subject_name: 'Materia inventada',
    presential_dedication: '3',
  }
];

class SubjectsForm extends React.Component {
  render() {
    return <Table columns={columns} dataSource={data} bordered/>;
  }
}

export default SubjectsForm;
