import styles from "../styles/header.module.css"

export default function Header(){
    return(
        <>
        <header className={styles.header} role="banner">
            <h1 className={styles.heading}>bucx.</h1>
          <nav className={styles.nav} aria-label="Site" role="nav">
            <p className={styles.features}>Features</p>
            <button className={styles.button} disabled><a href=".security" role="link" aria-disabled="true" className={styles.href}>Join Waitlist</a></button>
          </nav>
        </header>
        </>
    )
}