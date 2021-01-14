import {useState} from "react";
import {useDispatch} from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';

import swal from 'sweetalert';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faClock, faTrash, faTimes, faCheck, faRedo} from "@fortawesome/free-solid-svg-icons";

import {changeStatus, deleteTask, modifyTask, reset} from "../../actions/task.action";

import {formatTime} from "../../utils/format";

import {BIG, MID, SMALL} from "../../constants";

import styles from './modal.module.css';

const ModalContent = ({task, time, show, handleClose}) => {
  const dispatch = useDispatch();

  const [editDescription, setEditDescription] = useState({
    toEdit: false,
    description: task.description
  });
  const [editTime, setEditTime] = useState({
    toEdit: false,
    estimated: task.estimated
  });

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

  const handleChangeStatus = (status) => {
    dispatch(changeStatus({...task, time, status}))
  }

  const handleReset = () => {
    dispatch(reset(task))
  }

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
                <Button className="ml-2" variant={"light"} size={"sm"}
                        onClick={() => setEditDescription({...editDescription, toEdit: true})}>Editar</Button>
              </p>
              {task.description === '' &&
              <div className={styles.emptyDescription}>
                <p>Añadir descripción</p>
              </div>
              }

              {!editDescription.toEdit && task.description !== '' ? (
                <p className={`txt ${styles.description}`} onClick={() => setEditDescription({...editDescription, toEdit: true})}>
                  {task.description}
                </p>
              ) : (
                <>
                  <FormControl as={"textarea"} className={`txt ${styles.editDescription}`}
                               defaultValue={task.description}
                               onChange={(e) => setEditDescription({...editDescription, description: e.target.value})}/>
                  <Button variant={"success"} size={"sm"} className={styles.save} onClick={handleUpdate}>Guardar</Button>
                  <FontAwesomeIcon onClick={() => setEditDescription({...editDescription, toEdit: false})} className={styles.close} icon={faTimes}/>
                </>
              )}
            </div>

            <div className="mt-2">
              <p>
                <FontAwesomeIcon className="mr-2" icon={faClock}/>
                Duración
                <Button className="ml-2" variant={"light"} size={"sm"} onClick={() => setEditTime({...editTime, toEdit: true})}>Editar</Button>
              </p>
              {!editTime.toEdit && task.description !== '' ? (
                <p className={`txt ${styles.description}`} onClick={() => setEditTime({...editTime, toEdit: true})}>
                  {formatTime(task.estimated)}
                </p>
              ) : (
                <>
                  <FormControl as={"select"} className={`txt ${styles.description}`} onChange={(e) => setEditTime({...editTime, estimated: e.target.value})}>
                    <option value={SMALL}>Corta: 30 min</option>
                    <option value={MID}>Media: 45 min</option>
                    <option value={BIG}>Larga: 1 hr</option>
                    <option>Otro</option>
                  </FormControl>
                  <Button variant={"success"} size={"sm"} className={styles.save} onClick={handleUpdate}>Guardar</Button>
                  <FontAwesomeIcon onClick={() => setEditTime({...editTime, toEdit: false})} className={styles.close} icon={faTimes}/>
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
                    onClick={() => handleChangeStatus(1)}>
              <FontAwesomeIcon icon={faRedo}/> Reiniciar
            </Button>}
            {task.status !== 1 && task.status !== 2 &&
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"success"}
                    onClick={handleReset}>
              <FontAwesomeIcon icon={faCheck}/> Finalizar
            </Button>}
            <Button className={`float-right ${styles.button}`} size={"sm"} variant={"danger"} onClick={handleDeleteTask}>
              <FontAwesomeIcon icon={faTrash}/> Eliminar
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default ModalContent
