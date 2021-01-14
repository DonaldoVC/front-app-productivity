import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter, faPlus} from '@fortawesome/free-solid-svg-icons';

import {BIG, SMALL} from "../../constants";

import {selectTask} from "../../selectors/task.selector";

import ModalContent from "../../containers/ModalNew";

import Task from "../Task";

import styles from './list.module.css';

const List = ({section, completed, title}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask);

  const [filter, setFilter] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    task.all_tasks.sort((a, b) => a.order - b.order)
    task.all_tasks.sort((a, b) => b.status - a.status)
  }, [dispatch, task])

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const filterTask = (task) => {
    switch (filter) {
      case 1:
        return task.estimated <= SMALL && task.status !== 2;
      case 2:
        return task.estimated > SMALL && task.estimated <= BIG && task.status !== 2;
      case 3:
        return task.estimated > BIG  && task.status !== 2;
      default:
        return true;
    }
  }
  
  return (
    <>
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <Row>
            <Col md={10}>
              {completed ? (<p>Completados</p>) : (<p>{title}</p>)}
            </Col>
            <Col md={2}>
              {!completed &&
              <DropdownButton className="float-right" as={ButtonGroup} size={"sm"} drop={'right'} variant="light"
                              title={<FontAwesomeIcon icon={faFilter}/>}>
                <Dropdown.Item className="txt" onClick={() => setFilter(0)}>Todos</Dropdown.Item>
                <Dropdown.Item className="txt" onClick={() => setFilter(1)}>30 min o menos</Dropdown.Item>
                <Dropdown.Item className="txt" onClick={() => setFilter(2)}>30 min a 1h</Dropdown.Item>
                <Dropdown.Item className="txt" onClick={() => setFilter(3)}>Más de 1h</Dropdown.Item>
              </DropdownButton>}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className={styles.body}>
          {!completed && task.all_tasks.map((task, index) => task.status !== 2 && section.task_allowed.some(s => s === task._id) &&
            <Task key={index} task={task} filter={filterTask(task)}/>)}
          {completed && task.all_tasks.map((task, index) => task.status === 2 &&
            <Task key={index} task={task} filter={true}/>)}
        </Card.Body>
        {!completed &&
        <Button className={`txt ${styles.otherTask}`} variant={"light"} size={"sm"} onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus}/> Añadir otra tarea
        </Button>}
      </Card>

      {section && <ModalContent show={show} section={section} handleClose={handleClose}/>}
    </>
  )
}

export default List;
