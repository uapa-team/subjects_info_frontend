import React from "react";
import { Form, Table, InputNumber, Input, Button, Row, Col, Popconfirm, Icon } from "antd";
import auth from "../Routes/auth";
import { withRouter } from "react-router-dom";
import { PrimButton } from "./PrimButton";

class SubjectsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSubjects: true,
      dataSource: [
        {
          key: 0,
          subject_cod: "",
          subject_name: "",
          group: "",
          dedication_hours: "",
          autonomous_hours: "",
          accompaniment: ""
        }
      ],
    };

    this.data = [];
    this.columns = [
      {
        title: "Código de la materia",
        dataIndex: "subject_cod",
      },
      {
        title: "Nombre de la materia",
        dataIndex: "subject_name",
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

    this.columnsNew = [
      {
        title: "Nombre de la materia",
        dataIndex: "subject_name",
        render: (record, text) => (
          <Input
            style={{ width: "100%" }}
            onChange={e => this.handleAdd(e, record, text, "subject_name")}
          />
        )
      },
      {
        title: "Código de la materia",
        dataIndex: "subject_cod",
        render: (record, text) => (
          <Input
            style={{ width: "100%" }}
            onChange={e => this.handleAdd(e, record, text, "subject_cod")}
          />
        )
      },
      {
        title: "Grupo",
        dataIndex: "group",
        render: (record, text) => (
          <Input
            style={{ width: "100%" }}
            onChange={e => this.handleAdd(e, record, text, "group")}
          />
        )
      },
      {
        title: "Eliminar",
        dataIndex: "operation",
        width: "7%",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="¿Está seguro?"
              okText="Sí"
              cancelText="No"
              onConfirm={() => this.handleDeleteOne(record.key)}
            >
              {/* eslint-disable-next-line */}
              <Icon type="delete" />
            </Popconfirm>
          ) : null
      },
    ];
  }

  handleAdd = (e, record, text, type) => {
    //console.log(e)
    const newData = [...this.state.dataSource];
    const oldData = text;
    oldData[type] = e;
    newData.splice(record.key, 1, oldData);
    this.data = newData;
  };

  handleAddOne = () => {
    var newItem = {
      key: this.state.dataSource.length,
      subject_cod: "",
      subject_name: "",
      group: ""
    };
    var updatedColumns = this.state.dataSource.concat(newItem);
    this.setState({
      dataSource: updatedColumns
    })  
  }

  handleDeleteOne = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  submitInfo = () => {
    console.log(this.state.dataSource);
    fetch("http://localhost:8000/subjects_hours/submit_form", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        subjects: this.state.dataSource
      })
    })
      .then(response => {
        window.alert("¡Muchas gracias!");
        auth.logout(() => {
          localStorage.clear();
          this.props.history.push("/");
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  createSchedule = () => {
    console.log(this.state.dataSource);
    fetch("http://localhost:8000/subjects_hours/create_schedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        subjects: this.state.dataSource
      })
    })
      .then(response => {
        window.alert("¡Muchas gracias!");
        auth.logout(() => {
          localStorage.clear();
          this.props.history.push("/");
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  logOut = () => {
    auth.logout(() => {
      localStorage.clear();
      this.props.history.push("/");
    });
  };

  componentDidMount() {
    fetch("http://localhost:8000/subjects_hours/get_schedule", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.subjects.length === 0) {
          //Let hasSubjects False
        } else {
          this.setState({
            dataSource: response.subjects
          });
        }
      })
      .catch(error => {
        this.setState({
          hasSubjects: false,
        });
      });
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <div style={{ marginTop: 20 }}>
            <h1>Bienvenido, {localStorage.getItem("name")}</h1>
          </div>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <ul>
              <li>
                <b>Número de horas de dedicación presencial: </b>
                Lorem ipsum dolor sit amet consectetur adipiscing elit, cras
                elementum accumsan ac tempor tellus, euismod eget est suscipit
                consequat mattis. Molestie mattis litora vestibulum ad euismod
                placerat tellus justo proin a, ligula vehicula potenti metus
                cursus eu habitasse dictum.
              </li>
              <li>
                <b>Número de horas de acompañamiento: </b>
                Lorem ipsum dolor sit amet consectetur adipiscing elit, cras
                elementum accumsan ac tempor tellus, euismod eget est suscipit
                consequat mattis. Molestie mattis litora vestibulum ad euismod
                placerat tellus justo proin a, ligula vehicula potenti metus
                cursus eu habitasse dictum.
              </li>
              <li>
                <b>Número de horas de trabajo autónomo: </b>
                Lorem ipsum dolor sit amet consectetur adipiscing elit, cras
                elementum accumsan ac tempor tellus, euismod eget est suscipit
                consequat mattis. Molestie mattis litora vestibulum ad euismod
                placerat tellus justo proin a, ligula vehicula potenti metus
                cursus eu habitasse dictum.
              </li>
            </ul>
          </Col>
        </Row>

        {this.state.hasSubjects ? //Form when you can retrieve subjects:
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
          : //Form (of new subjects) when you can NOT retrieve subjects:
          <div>
            <Row type="flex">
            <Col span={2} />
            <PrimButton>
              <Button
                onClick={this.handleAddOne}
                type="primary"
                style={{ marginBottom: 16 }}
                icon="plus-circle"
              >
                {`Añadir materia`}
                </Button>
              </PrimButton>
          </Row>
            <Row type="flex" justify="center">
            <Col span={20}>
            <Table
              columns={this.columnsNew}
              dataSource={this.state.dataSource}
              bordered
              size="small"
            />
          </Col>
            </Row>
            </div>
          }

        <Row type="flex" justify="center" gutter={16}>
          <Col>
            <Button onClick={this.logOut} type="danger" style={{}}>
              Cerrar sin guardar
            </Button>
          </Col>
          <Col>
            <Button onClick={this.state.hasSubjects ? this.submitInfo : this.createSchedule} type="primary" style={{}}>
              Terminar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Form.create({ name: "main_form" })(SubjectsForm));
