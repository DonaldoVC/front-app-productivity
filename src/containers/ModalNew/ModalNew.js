import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import TimePicker from 'rc-time-picker';
import moment from "moment";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faClock, faCheck, faTimes, faFileSignature} from "@fortawesome/free-solid-svg-icons";

import {saveTask} from "../../actions/task.action";
import {getSections} from "../../actions/section.action";

import {selectTask} from "../../selectors/task.selector";

import {BIG, MID, SMALL, LIMIT} from "../../constants";

import {formatTime} from "../../utils/format";

import styles from './modalNew.module.css';

const defaultTask = {
  name: "",
  description: "",
  time: 0,
  estimated: 0,
  section: ""
}

const ModalContent = ({section, show, handleClose}) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState(defaultTask);
  const [showPicker, setShowPicker] = useState(false);

  const taskSelect = useSelector(selectTask);

  useEffect(() => {
    setTask({...defaultTask, section: section._id})
  }, [section])

  const handleSave = () => {
    setTask({...defaultTask, section: section._id})

    if (task.name && task.description && task.time && task.estimated) {
      dispatch(saveTask(task));
      if (taskSelect.lastStatus) dispatch(getSections())
      setTimeout(() => {
        if (taskSelect.lastStatus) dispatch(getSections())
      }, 1000)
      handleClose();
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body className={styles.content}>
        <Row>
          <Col>
            <FontAwesomeIcon onClick={handleClose} className={`float-right ${styles.close}`} icon={faTimes}/>
          </Col>
        </Row>

        <Row>
          <Col md={9}>
            <div>
              <p>
                <FontAwesomeIcon className="mr-2" icon={faFileSignature}/>
                Nombre
              </p>

              <FormControl as={"input"} type={"text"} className={`txt ${styles.description}`} value={task.name}
                           onChange={(e) => setTask({...task, name: e.target.value})}/>
            </div>

            <div>
              <p>
                <FontAwesomeIcon className="mr-2" icon={faBars}/>
                Descripción
              </p>

              <FormControl as={"textarea"} className={`txt ${styles.editDescription}`} value={task.description}
                           onChange={(e) => setTask({...task, description: e.target.value})}/>
            </div>

            <div className="mt-2">
              <p>
                <FontAwesomeIcon className="mr-2" icon={faClock}/>
                Duración
              </p>

              <FormControl as={"select"} className={`txt ${styles.description}`}
                           onChange={(e) => {
                             if (e.target.value === 'picker') {
                               setShowPicker(true)
                             } else {
                               setTask({...task, estimated: e.target.value, time: e.target.value})
                             }
                           }}>
                <option value={0}>Selecciona una opción</option>
                <option value={SMALL}>Corta: 30 min</option>
                <option value={MID}>Media: 45 min</option>
                <option value={BIG}>Larga: 1 hr</option>
                <option value={'picker'}>Otro</option>
              </FormControl>

              {showPicker &&
              <TimePicker value={moment(formatTime(task.time), "HH:mm:ss")} className={styles.picker} onChange={(value) => {
                if (moment(value).diff(moment().startOf('day'), 'seconds') <= LIMIT) {
                  setTask({
                    ...task,
                    estimated: moment(value).diff(moment().startOf('day'), 'seconds'),
                    time: moment(value).diff(moment().startOf('day'), 'seconds')
                  })
                } else {
                  setTask({...task, estimated: 0, time: 0})
                }
              }}/>}
            </div>
          </Col>
          <Col md={3}>
            <Button disabled={!task.name || !task.description || !task.time || !task.estimated}
                    className={`float-right ${styles.button}`} size={"sm"} variant={"success"} onClick={handleSave}>
              <FontAwesomeIcon icon={faCheck}/> Crear
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default ModalContent
