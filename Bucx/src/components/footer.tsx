import { Instagram, TwitterIcon} from "lucide-react"
import styles from "../styles/footer.module.css"

export function Footer(){
    return (
        <>
              <div className={styles.div} role="contentinfo">
                <h1 className={styles.headingtext}>BORDERLESS BANKING <br /> BUILT FOR YOU</h1>
              </div>

              <div className={styles.footerdata}>
                <h1 className={styles.favicon}>bucx.</h1>
                <div>
                <p className={styles.paragraph}>© 2025, Bucx • All Rights Reserved <br /> Bucx is a financial technology company, not a bank. All banking services are provided by our licensed banking partners.</p>
                 </div>
                <div className={styles.socials}>
                <TwitterIcon href="https://x.com/bucxfinance"/>
                <Instagram href="https://instagram.com/bucxfinance"/>
                </div>
              </div>
        </>
    )
}