import {useState} from "react";
import {useDispatch} from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';

import swal from 'sweetalert';

import TimePicker from "rc-time-picker";
import moment from "moment";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faClock, faTrash, faTimes, faCheck, faRedo} from "@fortawesome/free-solid-svg-icons";

import {changeStatus, deleteTask, modifyTask, reset} from "../../../actions/task.action";

import {formatTime} from "../../../utils/format";

import {BIG, LIMIT, MID, SMALL} from "../../../constants";

import styles from './modify.module.css';

const ModalModify = ({task, time, show, handleClose}) => {
  const dispatch = useDispatch();

  const [editDescription, setEditDescription] = useState({
    toEdit: false,
    description: task.description
  });
  const [editTime, setEditTime] = useState({
    toEdit: false,
    estimated: task.estimated
  });
  const [showPicker, setShowPicker] = useState(false);

  // Confimación para eliminar tarea.
  const handleDeleteTask = () => {
    swal({
      title: "¿Desea eliminar la tarea?",
      text: "Esta acción no se podrá deshacer",
      icon: "warning",
      buttons: ['Cancelar', 'Continuar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteTask(task));
          handleClose();
        }
      });
  }

  // Cambio de status
  const handleChangeStatus = (status) => {
    dispatch(changeStatus({...task, time, status}))
  }

  // Reestablecer tarea
  const handleReset = () => {
    dispatch(reset(task))
  }

  // Modificación de tarea.
  const handleUpdate = () => {
    setEditTime({...editTime, toEdit: false})
    setEditDescription({...editDescription, toEdit: false})

    dispatch(modifyTask({...task, estimated: editTime.estimated, description: editDescription.description}))
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body className={styles.content}>
        <Row>
          <Col>
            <p className={styles.title}>{task.name}</p>
          </Col>
          <Col md={1}>
            <FontAwesomeIcon onClick={handleClose} className={`float-right ${styles.close}`} icon={faTimes}/>
          </Col>
        </Row>

        <div className={styles.badge}>
          {task.status === 1 && <Badge variant="primary">Activa</Badge>}
          {task.status === 3 && <Badge variant="secondary">En Pausa</Badge>}
          {task.status === 2 && <Badge variant="success">Completada</Badge>}
          {task.status === 4 && <Badge variant="info">En Curso</Badge>}
        </div>

        <Row>
          <Col md={9}>
            <div>
              <p>
                <FontAwesomeIcon className="mr-2" icon={faBars}/>
                Descripción
                {task.status !== 2 &&
                <Button className="ml-2" variant={"light"} size={"sm"}
                        onClick={() => setEditDescription({...editDescription, toEdit: true})}>Editar</Button>}
              </p>
              {task.description === '' &&
              <div className={styles.emptyDescription}>
                <p>Añadir descripción</p>
              </div>
              }

              {!editDescription.toEdit && task.description !== '' ? (
                <p className={`txt ${styles.description}`}
                   onClick={() => setEditDescription({...editDescription, toEdit: task.status !== 2})}
                   style={task.status !== 2 ? {cursor: 'pointer'} : {}}>
                  {task.description}
                </p>
              ) : (
                <>
                  <FormControl as={"textarea"} className={`txt ${styles.editDescription}`}
                               defaultValue={task.description}
                               onChange={(e) => setEditDescription({...editDescription, description: e.target.value})}/>
                  <Button variant={"success"} size={"sm"} className={styles.save}
                          onClick={handleUpdate}>Guardar</Button>
                  <FontAwesomeIcon onClick={() => setEditDescription({...editDescription, toEdit: false})}
                                   className={styles.close} icon={faTimes}/>
                </>
              )}
            </div>

            <div className="mt-2">
              <p>
                <FontAwesomeIcon className="mr-2" icon={faClock}/>
                Duración
                {task.status !== 2 &&
                <Button className="ml-2" variant={"light"} size={"sm"}
                        onClick={() => setEditTime({...editTime, toEdit: true})}>Editar</Button>}
              </p>
              {!editTime.toEdit && task.description !== '' ? (
                <p className={`txt ${styles.description}`}
                   onClick={() => setEditTime({...editTime, toEdit: task.status !== 2})}
                   style={task.status !== 2 ? {cursor: 'pointer'} : {}}>
                  {formatTime(task.estimated)}
                </p>
              ) : (
                <>
                  <FormControl as={"select"} className={`txt ${styles.description}`}
                               onChange={(e) => {
                                 if (e.target.value === 'picker') {
                                   setShowPicker(true)
                                 } else {
                                   setEditTime({...editTime, estimated: e.target.value})
                                 }
                               }}>
                    <option value={SMALL}>Corta: 30 min</option>
                    <option value={MID}>Media: 45 min</option>
                    <option value={BIG}>Larga: 1 hr</option>
                    <option>Otro</option>
                  </FormControl>

                  {showPicker &&
                  <TimePicker value={moment(formatTime(task.time), "HH:mm:ss")} className={styles.picker}
                              onChange={(value) => {
                                if (moment(value).diff(moment().startOf('day'), 'seconds') <= LIMIT) {
                                  setEditTime({
                                    ...editTime,
                                    estimated: moment(value).diff(moment().startOf('day'), 'seconds')
                                  })
                                } else {
                                  setEditTime({...task, estimated: 0, time: 0})
                                }
                              }}/>}

                  <Button variant={"success"} size={"sm"} className={styles.save}
                          onClick={handleUpdate}>Guardar</Button>
                  <FontAwesomeIcon onClick={() => setEditTime({...editTime, toEdit: false})} className={styles.close}
                                   icon={faTimes}/>
                </>
              )}
            </div>
          </Col>
          <Col md={3}>
            {task.status === 1 &&
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"info"}
                    onClick={() => handleChangeStatus(3)}>
              <FontAwesomeIcon icon={faClock}/> Comenzar
            </Button>}
            {task.status === 4 &&
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"info"}
                    onClick={() => handleChangeStatus(3)}>
              <FontAwesomeIcon icon={faClock}/> Pausar
            </Button>}
            {task.status === 3 &&
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"info"}
                    onClick={() => handleChangeStatus(4)}>
              <FontAwesomeIcon icon={faClock}/> Reanudar
            </Button>}
            {task.status !== 1 && task.status !== 2 &&
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"dark"}
                    onClick={handleReset}>
              <FontAwesomeIcon icon={faRedo}/> Reiniciar
            </Button>}
            {task.status !== 1 && task.status !== 2 &&
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"success"}
                    onClick={() => handleChangeStatus(2)}>
              <FontAwesomeIcon icon={faCheck}/> Finalizar
            </Button>}
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"danger"}
                    onClick={handleDeleteTask}>
              <FontAwesomeIcon icon={faTrash}/> Eliminar
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default ModalModify;
