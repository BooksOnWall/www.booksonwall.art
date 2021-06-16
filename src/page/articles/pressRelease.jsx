import React from 'react';
import { injectIntl} from 'react-intl';
import Articles from './Articles';
const PressRelease = ({insert, limit, history}) =>  <Articles filter={"&categories_contains=Press"} history={history} insert limit={limit}/>
export default injectIntl(PressRelease);
