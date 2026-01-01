import styles from "../styles/features.module.css"
import { features } from "../util/data"
export function Feautures(){
   return (
    <>
      <section className={styles.section}>
        <div className={styles.headingtextwrapper}>
         <h1 className={styles.header}>Built to make banking borderless <br /> for professionals in Africa</h1>
         </div>
        <div className={styles.wrapper}>
            {features.map((feauture, index) => {
              const lastImage = index === features.length - 1 // still the same as index === 5
              console.log(features.length - 1)
                return (
                  <div className={styles.card}>
                  <picture>
                      <img key={index} src={feauture.image} className={styles.img} style={lastImage ? {width: "300px", height: "200px", borderRadius: "10px"} : undefined}/>  {/*still the same as {}*/}
                  </picture>

                    <div className={styles.wrap}>
                  <h3 className={styles.title}>{feauture.title}</h3>
                  <p className={styles.info}>{feauture.info}</p>
                  </div>
                  </div>
                )
            })}
        </div>
      </section>
    </>
   )
}
