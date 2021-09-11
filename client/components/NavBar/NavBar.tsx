import * as React from "react";
import styles from "./NavBar.module.scss";

export interface INavBarProps {
  notifications: Array<string>;
  currentUser?: {
    email: string;
    username: string;
    id: string;
    git_id: string;
  } | null;
}

export function NavBar({ notifications, currentUser }: INavBarProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.logo_container}>
        <img className={styles.logo} src="/img/logo.svg" />
      </div>
      <div className={styles.search_container}>
        <input placeholder="Search..." />
      </div>
      {currentUser ? <SignedIn notifications={notifications} /> : signedOut}
    </div>
  );
}

const signedOut = (
  <div className={styles.signIn}>
    <a href="/api/users/get_token">
      <img src="/img/github.svg" />
      Sign in
    </a>
  </div>
);

const SignedIn = ({ notifications }: INavBarProps) => {
  return (
    <div className={styles.icons}>
      <p className={styles.balance}>$545.54</p>
      <img className={styles.search} src="/img/magnifier.svg" />
      <div className={styles.user}></div>
      <a className={styles.notification} href="">
        <img className={styles.notification_bell} src="/img/notification.svg" />
        {notifications.length ? (
          <span className={styles.notification_number}>
            {notifications.length < 10 ? notifications.length : "9+"}
          </span>
        ) : null}
      </a>
      <img src="/img/setting.svg" />
    </div>
  );
};
