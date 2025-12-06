import Hero from "/public/hero-image.webp"
import Avatar from "/public/group.svg"
import Star from "/public/star.webp"
import styles from "../styles/section.module.css"
export function Section(){
    return (
        <>
       <section className={styles.section}>

          <div className={styles.wrapper}>

            <div className={styles.intro}>
                <h1 className={styles.headingtext}>Receive USD Payments Globally From Companies & Clients. <span className={styles.mini}>Cheap. Fast.</span></h1>

                <p className={styles.text}>Get a USD account to receive payments through ACH or Wire from US banks, PayPal, Wise, Fiverr, Upwork, <br /> Payoneer, Deel, Youtube & others.</p>

                <div className={styles.buttongroup}>

                    <div className={styles.prof}>

                <button className={styles.call}>Join the waitlist</button>


               <div className={styles.gm}>
                <picture>
                    <img src={Avatar} alt="" className={styles.group}/>
                </picture>

               <span className={styles.professionals}>Join 300+ professionals</span>
               </div>
               </div>

                </div>
            </div>
            <picture>
                <img src={Hero} alt="Bucx App" className={styles.image}/>
            </picture>
          </div>

              <picture>
                <img src={Star} alt="Star image" className={styles.star}/>
            </picture>
            </section>
        </>
    )
}