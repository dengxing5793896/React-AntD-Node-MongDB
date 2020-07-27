import React from 'react';
import Input from './component/Input'
import Show from './component/Show'
class App extends React.Component {
 render (){
      return(
           <div>
                <h1>组件传值pubsub</h1>
          <Input/>
          <Show/>
           </div>
      ); 
 }
}

export default App;
