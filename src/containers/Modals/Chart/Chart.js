import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { VictoryBar, VictoryChart } from 'victory';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import styles from './chart.module.css';
import {selectTask} from "../../../selectors/task.selector";

const defaultWeek = [
  {
    day: 'Domingo',
    taskCount: 0
  },
  {
    day: 'Lunes',
    taskCount: 0
  },
  {
    day: 'Martes',
    taskCount: 0
  },
  {
    day: 'Miercoles',
    taskCount: 0
  },
  {
    day: 'Jueves',
    taskCount: 0
  },
  {
    day: 'Viernes',
    taskCount: 0
  },
  {
    day: 'Sábado',
    taskCount: 0
  },
]

const ModalChart = ({show, handleClose}) => {

  const taskSelect = useSelector(selectTask);

  const [week, setWeek] = useState(defaultWeek);

  // Ordenamiento para mostrar
  useEffect(() => {
    // Se inicializa la variable con el dato por default
    const order = defaultWeek;

    for (const task of taskSelect.all_tasks) {
      // Se valida si la tarea está teminada
      if (task.status === 2) {
        const index = new Date(task.finishedDate).getDay()
        order[index].taskCount = order[index].taskCount + 1;
      }
    }

    setWeek(order);
  }, [taskSelect.all_tasks, week])

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body className={styles.content}>
        <Row>
          <Col className="text-center">
            <span>Tareas realizadas en la semana</span>
            <FontAwesomeIcon onClick={handleClose} className={`float-right ${styles.close}`} icon={faTimes}/>
          </Col>
        </Row>

        <Row>
          <Col>
            <VictoryChart domainPadding={20}>
              <VictoryBar data={week} x="day" y="taskCount"/>
            </VictoryChart>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default ModalChart;
