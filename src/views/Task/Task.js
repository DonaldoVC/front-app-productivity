import React, {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faBars} from "@fortawesome/free-solid-svg-icons";

import {formatTime} from "../../utils/format";

import ModalModify from "../../containers/Modals/Modify";

import {changeStatus} from "../../actions/task.action";

import {ClosePage} from "../../App";

import styles from './task.module.css';

const Task = ({task, filter}) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [time, setTime] = useState(task.time)

  const closingPage = useContext(ClosePage);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    setTime(task.time);
  }, [task])

  // Temporizador de tarea en ejecución
  useEffect(() => {
    if (task.status === 4) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      if (time === 0) {
        dispatch(changeStatus({...task, time, status: 3}))
        clearInterval(interval);
      }

      return () => {
        clearInterval(interval);
      }
    }
  }, [dispatch, task, time])

  // Al cerrar página guardar status/tiempo en api
  useEffect(() => {
    if (closingPage && task.status === 4) {
      dispatch(changeStatus({...task, time, status: 3}))
    }
  }, [dispatch, closingPage, task, time])

  if (filter) {
    return (
      <>
        <Card onClick={handleShow}>
          <Card.Body>
            <p className="txt">{task.name}</p>

            <Row>
              <Col md={1}>
                {task.description !== "" &&
                <span className={`txt float-left ${styles.time}`}><FontAwesomeIcon icon={faBars}/></span>}
              </Col>
              <Col>
                <span className={`txt float-right ${styles.time}`}>{formatTime(time)} <FontAwesomeIcon icon={faClock}/></span>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <ModalModify show={show} task={task} time={time} handleClose={handleClose}/>
      </>
    )
  } else {
    return (null)
  }
}

export default Task;
