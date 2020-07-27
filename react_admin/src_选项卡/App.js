import React from 'react';
import Item from './component/Item'
import Show from './component/Show'
import axios from 'axios'
import './App.css'
class App extends React.Component {
     state={
          resData:null
     }
     componentDidMount(){
          let li = document.getElementsByClassName('type')
          for (let i =0;i<li.length;i++){
               li[i].addEventListener('mouseover',function(){
               for(let a = 0;a<li.length;a++){
                    li[a].style.backgroundColor='darkgrey'
               }
               this.style.backgroundColor='cornsilk'
               })
          }
     }
     getType=val=>{
          let type = val
          let url =`/toutiao/index?type=${type}&key=0de3458cb023fe8da7312a18fadfe653`
          axios.get(url).then((res)=>{
              this.setState({
               resData:res.data.result.data
              })
          })
         
     }
          



     render (){
          return(
               <div>
                    <Item getType={this.getType}/>
                    <Show data = {this.state}/>
               </div>
          ); 
     }
}

export default App;
