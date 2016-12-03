import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"

export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle}>
                    {this.props.messages.map(renderMessage)}
                </ul>

                {/* Exercise 2: Add a ReplyBox componen*/}
                <ReplyBox />
            </div>
        )
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
        return message.text
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
