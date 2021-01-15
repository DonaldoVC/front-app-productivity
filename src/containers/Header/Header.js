import {useDispatch} from "react-redux";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {graph} from "../../actions/task.action";

import styles from './header.module.css';

const Header = () => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(graph())
  }

  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <p>Productivity APP</p>

        </Col>

        <Col md={2}>
          <Button className="float-right" variant={"outline-primary"} onClick={handleCreate}>Precargar tareas</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Header;
