import styles from './index.less';
import { user1 } from '@@/plugin-interface/api'

import { defineRequireConfig } from 'umi'

export default function IndexPage() {

  user1({},).then(res => {
    console.log('res', res)
  })

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
