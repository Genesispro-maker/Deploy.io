import { Feautures } from "./components/features";
import { Footer } from "./components/footer";
import Header from "./components/header";
import { Section } from "./components/section";
import { Security } from "./components/security";
import styles from "./styles/container.module.css"

export default function App(){
    return(
        <>
        <div className={styles.container}>
          <Header />
          <Section />
          <Feautures />
          <Security />
          <Footer />
          </div>
        </>
    )
}