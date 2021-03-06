import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

export default class Modal extends Component {

  constructor(props) {
    super(props);
  }

  login(event) {
    event.preventDefault();
    var a = this;
    jQuery(document).ready(function ($) {
      var loginInfo = {};
      $.each($('#userloginModalForm').serializeArray(), function (i, field) {
        loginInfo[field.name] = field.value;
      });

      Meteor.loginWithPassword(loginInfo.email, loginInfo.password, function (err) {
        if (err) {
          throw new Meteor.Error(err);
        }
        else {
          $('#userloginModal').modal('toggle');
          a.props.login();
        }
      });
    });
  }

  signUp(event) {
    event.preventDefault();
    var a = this;
    jQuery(document).ready(function ($) {
      var signUpInfo = {};
      $.each($('#userregisterModalForm').serializeArray(), function (i, field) {
        signUpInfo[field.name] = field.value;
      });

      var newProfile = {
        first_name: signUpInfo.first_name,
        last_name: signUpInfo.last_name,
        retailer: "none"
      }
      Accounts.createUser({
        email: signUpInfo.email,
        password: signUpInfo.password,
        profile: newProfile
      }, function (err) {
        if (err) {
          throw new Meteor.Error(err);
        }
        else {
          $('#userregisterModal').modal('toggle');
          $('#userloginModal').modal('toggle');
        }
      });
    });
  }

  render() {
    return (
      <div>
        <div className="modal fade user-login-modal" id="userloginModal" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <form id="userloginModalForm" onSubmit={this.login.bind(this)}>
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span className="sr-only">Cerrar</span>
                  </button>
                  <h4 className="modal-title">Ingresar</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="user_name_enterprise">Email</label>
                    <input type="email" id="email" required name="email" className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" required name="password" className="form-control" placeholder="Contraseña" />
                  </div>
                </div>
                <div className="modal-footer">
                  <span className="user-login-modal-register pull-left">
                    <a data-rel="registerModal" href="#">¿No eres un miembro todavía?</a>
                  </span>
                  <button type="submit" className="btn btn-default btn-outline">Ingresa</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal fade user-register-modal" id="userregisterModal" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <form id="userregisterModalForm" onSubmit={this.signUp.bind(this)}>
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                  </button>
                  <h4 className="modal-title">Crea una cuenta</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="userName">Nombre</label>
                    <input type="text" id="user_first_name" name="first_name" required className="form-control" placeholder="Nombres" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userLastName">Apellidos</label>
                    <input type="text" id="user_last_name" name="last_name" required className="form-control" placeholder="Apellidos" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user_email">Email</label>
                    <input type="email" id="user_email" name="email" required className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user_password">Contraseña</label>
                    <input type="password" id="user_password" required name="password" className="form-control" placeholder="Contraseña" />
                  </div>
                </div>
                <div className="modal-footer">
                  <span className="user-login-modal-link pull-left">
                    <a data-rel="loginModal" href="#loginModal">¿Ya tienes una cuenta?</a>
                  </span>
                  <button type="submit" className="btn btn-default btn-outline">Registrate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
