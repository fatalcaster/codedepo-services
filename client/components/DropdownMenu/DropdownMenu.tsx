import * as React from "react";
import styles from "./DropdownMenu.module.scss";
interface IDropdownMenuProps {}

const DropdownMenu: React.FunctionComponent<IDropdownMenuProps> = (props) => {
  return (
    <div className={styles.container}>
      <a>I WOULDN'T WANNA DO THAT</a>
    </div>
  );
};

export default DropdownMenu;
