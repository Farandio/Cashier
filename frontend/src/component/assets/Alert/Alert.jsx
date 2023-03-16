import React, { Component } from 'react'
import {HiInformationCircle} from "react-icons/hi"

export default class Alert extends Component {
  render() {
    return (
        <Alert
        color="failure"
        icon={HiInformationCircle}
      >
        <span>
          <span className="font-medium">
            Info alert!
          </span>
          {' '}Change a few things up and try submitting again.
        </span>
      </Alert>
    )
  }
}
