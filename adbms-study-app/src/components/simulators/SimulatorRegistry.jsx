import React from 'react';
import Simulator1_1 from './Simulator1_1';
import Simulator1_2 from './Simulator1_2';
import Simulator1_3 from './Simulator1_3';
import Simulator1_4 from './Simulator1_4';
import Simulator3_1 from './Simulator3_1';
import Simulator3_2 from './Simulator3_2';
import Simulator3_3 from './Simulator3_3';
import Simulator3_4 from './Simulator3_4';
import Simulator3_5 from './Simulator3_5';
import Simulator4_1 from './Simulator4_1';
import Simulator4_2 from './Simulator4_2';
import Simulator4_3 from './Simulator4_3';
import Simulator4_4 from './Simulator4_4';
import Simulator5_1 from './Simulator5_1';
import Simulator5_2 from './Simulator5_2';
import Simulator5_3 from './Simulator5_3';

export default function SimulatorRegistry({ topicId }) {
  switch (topicId) {
    case '1.1': return <Simulator1_1 />;
    case '1.2': return <Simulator1_2 />;
    case '1.3': return <Simulator1_3 />;
    case '1.4': return <Simulator1_4 />;
    case '3.1': return <Simulator3_1 />;
    case '3.2': return <Simulator3_2 />;
    case '3.3': return <Simulator3_3 />;
    case '3.4': return <Simulator3_4 />;
    case '3.5': return <Simulator3_5 />;
    case '4.1': return <Simulator4_1 />;
    case '4.2': return <Simulator4_2 />;
    case '4.3': return <Simulator4_3 />;
    case '4.4': return <Simulator4_4 />;
    case '5.1': return <Simulator5_1 />;
    case '5.2': return <Simulator5_2 />;
    case '5.3': return <Simulator5_3 />;
    default: return null;
  }
}
