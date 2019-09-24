import React from "react";
import { Table, InputNumber, Button, Row, Col } from "antd";
import auth from '../auth'

class SubjectsForm extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.columns = [
      {
        title: "Código de la materia",
        dataIndex: "subject_cod",
        key: "subject_cod"
      },
      {
        title: "Nombre de la materia",
        dataIndex: "subject_name",
        key: "subject_name"
      },
      {
        title: "Número de horas de dedicación presencial",
        dataIndex: "dedication_hours",
        render: (record, text) => (
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onChange={e => this.handleAdd(e, record, text, "dedication_hours")}
          />
        )
      },
      {
        title: "Número de horas de trabajo autónomo",
        dataIndex: "autonomous_hours",
        render: (record, text, dataIndex) => (
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onChange={e => this.handleAdd(e, record, text, "autonomous_hours")}
          />
        )
      },
      {
        title: "Número de horas de acompañamiento",
        dataIndex: "accompaniment",
        render: (record, text, dataIndex) => (
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onChange={e => this.handleAdd(e, record, text, "accompaniment")}
          />
        )
      }
    ];

    this.state = {
      dataSource: [
        {
          key: "0",
          subject_cod: "1234567",
          subject_name: "Materia inventada",
          dedication_hours: "",
          autonomous_hours: "",
          accompaniment: ""
        },
        {
          key: "1",
          subject_cod: "8901234",
          subject_name: "Materia inventada 2",
          dedication_hours: "",
          autonomous_hours: "",
          accompaniment: ""
        }
      ],
      count: 2
    };
  }

  handleAdd = (e, record, text, type) => {
    const newData = [...this.state.dataSource];
    const oldData = text;
    oldData[type] = e;
    newData.splice(record.key, 1, oldData);
    this.data = newData;
  };

  submitInfo = () => {
    console.log(this.data);
  };

  logOut = () => {
    auth.logout(() => {
      localStorage.clear();
      this.props.history.push('/login')
    })
  };

  render() {
    return (
      <div>
        <div><h1>Bienvenido, {localStorage.getItem('name')}</h1></div>
        <Row type="flex" justify="center">
          <Col span={20}>
            <Table
              columns={this.columns}
              dataSource={this.state.dataSource}
              bordered
              size="small"
            />
          </Col>
        </Row>
        <Button onClick={this.logOut} type="primary" style={{}}>
          Cerrar Sesión
        </Button>
        <Button onClick={this.submitInfo} type="default" style={{}}>
          Terminar
        </Button>
      </div>
    );
  }
}

export default SubjectsForm;
