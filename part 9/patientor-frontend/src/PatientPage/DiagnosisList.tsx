import React from 'react'
import { List, ListItem } from 'semantic-ui-react'
import { useStateValue } from '../state'
import { Diagnosis } from '../types'

const DiagnosisList: React.FC<{
  diagnosisCodes: Array<Diagnosis['code']>
}> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue()

  return (
    <List bulleted>
      {diagnosisCodes.map(code => (
        <ListItem key={code}>
          {diagnoses[code] && (
            <span style={{ color: 'grey' }}>
              {diagnoses[code].code} {diagnoses[code].name}
            </span>
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default DiagnosisList
