import React from 'react';
import { injectIntl} from 'react-intl';
import Articles from './Articles';
const PressRelease = ({insert, limit, history}) => {
  return <Articles filter={"&categories_contains=Press"} insert limit={limit}/>
}
export default injectIntl(PressRelease);
