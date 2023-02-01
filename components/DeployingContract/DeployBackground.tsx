import { BsDiamond } from 'react-icons/bs';
import styles from '../../styles/deploying.module.css';

interface DeployBackgroundProps {
  text: string;
}

export function DeployBackground({ text }: DeployBackgroundProps) {
  return <div className={`${styles['load-container']} font-header`}>
    <div className={`${styles['back-banner']} font-header`}>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
    </div>
    <div className={`${styles['front-banner']} font-header`}>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
      <span className={styles['block-a']}><BsDiamond/> {text}</span>
      <span className={styles['block-b']}><BsDiamond/> {text}</span>
    </div>
  </div>
}
