import React, {PropTypes} from "react"
import {connect} from "react-redux"

function click (){
    if (event.keyCode == 13){
      document.getElementById('clicking')
  };
}

export class ReplyBox extends React.Component {
    state = {
        text: ""
    }

    updateText = (e) => {
        this.setState({text: e.target.value})
    }

    sendReply = () => {
        this.props.replyText(this.state.text)
        this.setState({text: ""})
    }

    render () {
        return (
            <div>

                {/* Exercise 2: Render a text input and a button */}
                <input value= {this.state.text} onChange = {this.updateText}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    this.sendReply()
                  }
                }}
                 />
                <button id="clicking" onClick= {this.sendReply} disabled={this.state.text === ""}>
                        send &#2639;</button>
            </div>
        )
    }
}

ReplyBox.propTypes = {
    replyImage: PropTypes.func,
    replyText: PropTypes.func
}

export default connect(undefined, {
    replyText: (text) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {text}
    }),
    replyImage: (data) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {data}
    })
})(ReplyBox)
