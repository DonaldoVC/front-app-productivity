import Loader from "react-loader-spinner";

import styles from './loader.module.css';

const LoaderShow = ({visible}) => {

  // Estado para mostrar o no loader
  if (visible) {
    return (
      <div className={styles.loader}>
        <div style={{margin: 'auto'}}>
          <Loader
            type="Oval"
            color="#1856a4"
            height={100}
            width={100}
            visible={"true"}
          />
        </div>
      </div>
    )
  } else {
    return (null)
  }
}

export default LoaderShow;
