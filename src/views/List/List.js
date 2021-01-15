import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import {Droppable, Draggable, DragDropContext} from "react-beautiful-dnd";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter, faPlus} from '@fortawesome/free-solid-svg-icons';

import {BIG, SMALL} from "../../constants";

import {order} from "../../actions/task.action";

import {selectTask} from "../../selectors/task.selector";

import ModalNew from "../../containers/Modals/New";

import Task from "../Task";

import styles from './list.module.css';

const List = ({section, completed, title}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask);

  const [allTask, setAllTask] = useState([]);
  const [filter, setFilter] = useState(0);
  const [show, setShow] = useState(false);

  // Ordenamiento de tareas por orden / status
  useEffect(() => {
    task.all_tasks.sort((a, b) => a.order - b.order)
    task.all_tasks.sort((a, b) => b.status - a.status)

    setAllTask(task.all_tasks);
  }, [dispatch, task])

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //Filtro de tareas en listas.
  const filterTask = (task) => {
    switch (filter) {
      case 1:
        return task.estimated <= SMALL && task.status !== 2;
      case 2:
        return task.estimated > SMALL && task.estimated <= BIG && task.status !== 2;
      case 3:
        return task.estimated > BIG && task.status !== 2;
      default:
        return true;
    }
  }

  const onDragEnd = (result) => {
    // Validación drop
    if (!result.destination) {
      return;
    }

    // Ordenamiento de tareas según usuario
    const items = reorder(
      task.all_tasks,
      result.source.index,
      result.destination.index
    );

    // Envio de nuevo orden a WS
    dispatch(order(items))
    setAllTask(items);
  }

  // Funcción de ordenamiento según usuario
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    for (let i = 0; i < result.length; i ++) {
      result[i].order = i + 1;
    }

    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
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
                {!completed && allTask.map((task, index) => task.status !== 2 && section.task_allowed.some(s => s === task._id) &&
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided, snapshot) => (
                      <div className={styles.containerTask} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                        <Task task={task} filter={filterTask(task)}/>
                      </div>
                    )}
                  </Draggable>)}
                {completed && allTask.map((task, index) => task.status === 2 &&
                  <div key={index} className={styles.containerTask}>
                    <Task task={task} filter={true}/>
                  </div>
                )}
              </Card.Body>
              {!completed &&
              <Button className={`txt ${styles.otherTask}`} variant={"light"} size={"sm"} onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus}/> Añadir otra tarea
              </Button>}
            </Card>

            {section && <ModalNew show={show} section={section} handleClose={handleClose}/>}
          </div>
        )}

      </Droppable>
    </DragDropContext>
  )
}

export default List;
