import { Shield } from "lucide-react";
import Spring from "/public/spring.webp"
import Star from "/public/star (1).webp"
import styles from "../styles/security.module.css"

export function Security(){
    return (
        <>
          <article className={styles.article}>
               <div className={styles.wrapper}>
                  <div className={styles.iconwrapper}>
                    <Shield fill="white" stroke="white" size={80} className={styles.shield}/>
                  </div>
                  <h1 className={styles.headingtext}>Safe and Secure</h1>                
                  <p className={styles.paragraph}>Peace of mind with your money shouldn't be a nice-to-have. All transactions are fully secure with industry-standard encryption and 2-factor authentication. Bucx is built with advanced biometrics, robust recoveries and cryptographic controls. We use multiple security layers to keep your money and data safe.</p>
               </div>
               
                <div className={styles.textwrapper}>
              <h1 className={styles.text}>The world has borders but your <br /> finances shouldn't</h1>

               <p className={styles.para}>Your money should be where you want when you want it. Make your life, <br /> borderless. Make your money borderless. With Bucx the possibilities are <br /> endless.</p>
               </div>

               <main className={styles.main}>
                   <input type="text" placeholder="Email your email Address" className={styles.input} required aria-labelledby="sign_form_label" role="form"/>
                   <button className={styles.btn}>Join the waitlist</button>
               </main>

               <div>
                 <picture>
                    <img src={Spring} alt="Gradient Spring Image" className={styles.spring}/>

                    <img src={Star} alt="Gradient Star Image" className={styles.star}/>
                 </picture>
               </div>
          </article>
        </>
    )
}