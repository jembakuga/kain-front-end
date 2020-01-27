import * as React from "react";
import { Component } from "react";

export interface BaseProps {
  history: any;
}

export interface BaseState {}

class Base extends React.Component<BaseProps, BaseState> {
  // state = { data :  object}
  render() {
    return <h1></h1>;
  }
}

export default Base;
