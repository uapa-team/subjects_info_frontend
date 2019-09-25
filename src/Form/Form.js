import React from "react";
import { Table, InputNumber, Button, Row, Col } from "antd";
import auth from '../auth'
import axios from 'axios'

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
    //console.log(e)
    const newData = [...this.state.dataSource];
    const oldData = text;
    oldData[type] = e;
    newData.splice(record.key, 1, oldData);
    this.data = newData;
  };

  submitInfo = () => {
    console.log(this.state.dataSource)
    axios.post('http://localhost:8000/subjects_hours/survey_view', {
      username: window.localStorage.getItem("username"),
      subjects: this.state.dataSource
    }).then((response) => {
      window.alert('¡Muchas gracias!')
      auth.logout(() => {
        localStorage.clear();
        this.props.history.push('/login')
      })
    }).catch((error) => {
      console.log(error);
    });
  };

  logOut = () => {
    auth.logout(() => {
      localStorage.clear();
      this.props.history.push('/login')
    })
  };

  componentDidMount() {
    axios.post('http://localhost:8000/subjects_hours/survey_view', {
      username: window.localStorage.getItem("username"),
    }).then((response) => {
      console.log(response.data.subjects);
      this.setState({
        dataSource: response.data.subjects
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <div style={{ marginTop: 20 }}><h1>Bienvenido, {localStorage.getItem('name')}</h1></div>
        </Row>
        <Row><Col span={20} offset={2}><ul>
          <li><b>Número de horas de dedicación presencial: </b>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, cras elementum accumsan ac tempor tellus,
            euismod eget est suscipit consequat mattis. Molestie mattis litora vestibulum ad euismod placerat
            tellus justo proin a, ligula vehicula potenti metus cursus eu habitasse dictum.
          </li>
          <li><b>Número de horas de acompañamiento: </b>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, cras elementum accumsan ac tempor tellus,
            euismod eget est suscipit consequat mattis. Molestie mattis litora vestibulum ad euismod placerat
          tellus justo proin a, ligula vehicula potenti metus cursus eu habitasse dictum.</li>
          <li><b>Número de horas de trabajo autónomo: </b>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, cras elementum accumsan ac tempor tellus,
            euismod eget est suscipit consequat mattis. Molestie mattis litora vestibulum ad euismod placerat
          tellus justo proin a, ligula vehicula potenti metus cursus eu habitasse dictum.</li>
        </ul></Col></Row>
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

        <Row type="flex" justify="center" gutter={16}>
          <Col><Button onClick={this.logOut} type="danger" style={{}}>
            Cerrar sin guardar
            </Button></Col>
          <Col><Button onClick={this.submitInfo} type="primary" style={{}}>
            Terminar
            </Button>
          </Col>
        </Row>
      </div >
    );
  }
}

export default SubjectsForm;
