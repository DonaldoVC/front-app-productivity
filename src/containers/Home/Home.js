import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import swal from 'sweetalert';

import {selectSection} from "../../selectors/section.selector";
import {selectLoader} from "../../selectors/loader.selector";

import {getSections, saveSection} from "../../actions/section.action";
import {getTasks} from "../../actions/task.action";

import List from "../../views/List";
import LoaderShow from "../../views/Loader";

import styles from './home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  const section = useSelector(selectSection);
  const loader = useSelector(selectLoader);

  // Obtención de listado tareas/listas
  useEffect(() => {
    dispatch(getSections())
    dispatch(getTasks())
  }, [dispatch])

  // Creación de nueva sección
  const handleNewSection = () => {
    swal({
      text: 'Nueva lista',
      content: "input",
      button: {
        text: "Crear",
        closeModal: false,
      },
    }).then((name) => {
      if (!name) throw null;

      // Guardado de lista / cerrado de alert
      dispatch(saveSection({name}))
      swal.stopLoading();
      swal.close();
    });
  }

  return (
    <>
      <Container fluid className={`list ${styles.container}`}>
        <div className={styles.allList}>
          {section.all_sections.map((section, index) =>
            <div key={index} className={styles.list}>
              <List title={section.name} section={section}/>
            </div>)}
          <div className={styles.list}>
            <List completed={true}/>
          </div>
          <div className={styles.list}>
            <Card>
              <Button className={`txt ${styles.button}`} variant={"light"} size={"sm"} onClick={handleNewSection}>
                <FontAwesomeIcon icon={faPlus}/> Añadir otra lista
              </Button>
            </Card>
          </div>
        </div>
      </Container>
      <LoaderShow visible={loader.loading}/>
    </>
  )
}

export default Home;
