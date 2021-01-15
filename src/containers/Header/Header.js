import React, {useState} from "react";
import {useDispatch} from "react-redux";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar} from "@fortawesome/free-solid-svg-icons";

import {graph} from "../../actions/task.action";

import styles from './header.module.css';

import ModalChart from "../Modals/Chart";

const Header = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCreate = () => {
    dispatch(graph())
  }

  return (
    <>
      <div className={styles.container}>
        <Row>
          <Col>
            <Button className="float-left" variant={"outline-primary"} onClick={handleShow}>
              <FontAwesomeIcon onClick={handleClose} icon={faChartBar}/> Ver gráfica
            </Button>
            <span>Productivity APP</span>
            <Button className="float-right" variant={"outline-primary"} onClick={handleCreate}>Precargar tareas</Button>
          </Col>
        </Row>
      </div>

      <ModalChart show={show} handleClose={handleClose}/>
    </>
  )
}

export default Header;
