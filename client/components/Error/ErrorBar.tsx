import styles from "./ErrorBar.module.scss";
import { useEffect, useState } from "react";

interface IErrorBarProps {
  error: { message: string };
}

const ErrorBar: React.FunctionComponent<IErrorBarProps> = (props) => {
  const [errors, setErrors] = useState<string | undefined>(undefined);
  useEffect(() => {
    setErrors(props.error.message || undefined);
    setTimeout(() => setErrors(undefined), 3000);
  }, []);

  return errors ? (
    <div className={styles.container}>
      <p>Error: {errors[0]}</p>
      <span className={styles.close} onClick={() => setErrors(undefined)}>
        <img src="./img/x.svg" alt="" />
      </span>
    </div>
  ) : null;
};

interface IErrorContainerProps {
  errors: Array<{ message: string }>;
}

const ErrorContainer: React.FunctionComponent<IErrorContainerProps> = ({
  errors,
}) => {
  return (
    <div className={styles.errorContainer}>
      {errors.map((err) => (
        <ErrorBar key={err.message} error={err} />
      ))}
    </div>
  );
};

export default ErrorContainer;
