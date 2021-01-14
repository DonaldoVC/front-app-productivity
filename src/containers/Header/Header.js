import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './header.module.css';

const Header = () => {

  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <p>Productivity APP</p>

        </Col>

        <Col md={2}>
          <Button className="float-right" variant={"outline-primary"}>Precargar tareas</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Header;
