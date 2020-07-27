import React from 'react';


class Detail extends React.Component {
    componentDidMount(){
        console.log(this.props.history.location.state)
    }
    render() {
        return (
            <div>
                <a href='#/'>回到home</a>
            </div>
        )
    }
}
export default Detail