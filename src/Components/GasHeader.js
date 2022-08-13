import React from 'react';
import{
    Header,
    Segment
} from 'semantic-ui-react'

const GasHeader = () => {
  return (
    <Segment padded='very' inverted vertical>
        <Header as='h2'>This is a header for Jordii's Gas App!</Header>
    </Segment>
  )
}

export default GasHeader