import * as React from "react";
// import axios from "axios";

export interface BaseProps {
  history: any;
  location: any;
  match: any;
}

export interface BaseState {}

class Base extends React.Component<BaseProps, BaseState> {
  // state = { data :  object}

  // doAjax(props: any) {
  //   let form = this;

  //   axios(props)
  //     .then(function(response) {
  //       if (response.data.success == "true") {
  //         if (props["onSuccess"]) {
  //           props["onSuccess"](response, form);
  //         }
  //       } else {
  //         if (props["onFailure"]) {
  //           props["onFailure"](response, form);
  //         }
  //       }
  //     })
  //     .catch(function(response) {
  //       // form.showSummaryMessage({
  //       //   msgCode: ["error_Unknown_Error"],
  //       //   msgHeader: "error"
  //       // });
  //     });
  // }

  // doFormSubmit(props) {
  //   let onSuccess = function(response: any, form) {
  //     var responseObj = response.data;
  //     var msgObj = responseObj.msgDetail;

  //     if (msgObj) {
  //       form.showSummaryMessage(msgObj);
  //     } else {
  //       form.showSummaryMessage({
  //         msgCode: ["info_DefaultSuccessMessage"],
  //         msgHeader: "info_Success"
  //       });
  //     }

  //     form.updateFormState(form.state.model, null, null, true);
  //   };

  //   let onFailure = function(response, form) {
  //     var responseObj = response.data;
  //     var msgObj = responseObj.msgDetail;

  //     if (msgObj) {
  //       form.showSummaryMessage(msgObj);
  //     } else {
  //       form.showSummaryMessage({
  //         msgCode: ["info_DefaultFailedMessage"],
  //         msgHeader: "error"
  //       });
  //     }
  //   };

  //   if (!props["onSuccess"]) {
  //     props["onSuccess"] = onSuccess;
  //   }

  //   if (!props["onFailure"]) {
  //     props["onFailure"] = onFailure;
  //   }

  //   let data = this.state["model"];
  //   if (props["params"]) {
  //     for (var key in props["params"]) {
  //       data[key] = props["params"][key];
  //     }

  //     props["params"] = {};
  //   }

  //   props["data"] = data;
  //   props["method"] = "post";

  //   this.doAjax(props);
  // }

  render() {
    return <h1></h1>;
  }
}

export default Base;
