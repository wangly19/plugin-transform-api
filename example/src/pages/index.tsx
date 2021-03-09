import styles from './index.less';
import { user1,  } from 'umi'
import { user } from '@@/plugin-interface/api'
import { useDispatch } from 'dva'

export default function IndexPage() {

  user1().then(res => {
    console.log('res', res)
  })

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
