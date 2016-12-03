import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"

const myId = "ee7cea725eedb19792a57636d9a1aaf54a7f440f0cf1926a36bbf25f22e6324d"

export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle} ref="messages">
                    {this.props.messages.map(renderMessage)}
                </ul>

                {/* Exercise 2: Add a ReplyBox componen*/}
                <ReplyBox />
            </div>
        )
    }

    componentDidUpdate (prevProps) {
        if (prevProps.messages.length === this.props.messages.length) {
            return
        }

        const element = this.refs.messages
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }
}

function renderMessage (message) {
    return (
      <div>
      <div style={divTitle}>
      <strong>{message.author.name}</strong>
      </div>
      <img style={imageStyle} src = {message.author.picture}/>
      <div style={divStyle}>
        <li key={message.messageId}>

            {getMessageBody(message)}

        </li>
      </div>
      </div>
    )
}

const divTitle = {
  fontSize:"15px"
}

const divStyle = {
  backgroundColor: "#b3ecff",
  color: "#000000",
  width: "250px",
  borderRadius: "200px",
  marginBottom: "55px",
  padding: "50px",
  display: "inline-block"
}
const ulStyle = {
    overflowY: "scroll",
    fontFamily: "monospace",
    listStyle: "none",
    marginBottom: "100px"
    /* Exercise 4: Add your own styles */

}


const imageStyle = {
    maxWidth: "50px",
    maxHeight: "50px",
    borderRadius: "25px",
    objectFit: "contain",
    display: "inline-block"
}


const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%"
}

function getMessageDate (message) {
    return moment(message.timestampUtc).format("dddd, h:mm A")
}

function getMessageBody (message) {
    if (message.data) {
        return <img src={message.data} style={imageStyle} />
    } else {
        const text = message.text
        /*const bold = text.replace(/(_.*_)/gi, function boldMachine(x){
          <strong> x </strong>
        }) */
        if (message.author.userId === myId){
          return (
            <span style={{float:"right"}}>{text}</span>
          )
        } else{
            return (
              <span>{text}</span>
                )
        }
    }
}

Chat.propTypes = {
    messages: PropTypes.array
}

function mapStateToProps (state) {
    return {
        messages: state.messages
    }
}

export default connect(
    mapStateToProps
)(Chat)
