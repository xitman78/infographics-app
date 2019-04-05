import React, { Component } from "react";
import { TenantSelector } from "@cognite/gearbox";
import { ReactAuthProvider } from "@cognite/react-auth";
import "antd/dist/antd.css";

interface InfographicAppState {
  tenant: string | null;
}

class InfographicApp extends Component<{}, InfographicAppState> {
  state = {
    tenant: null
  };

  handleTenantSelect = (
    tenant: string,
    advancedOptions: ({ [name: string]: string | number }) | null
  ) => {
    this.setState({ tenant });
  };

  validateTenant = (
    tenant: string,
    advancedOptions: ({ [name: string]: string | number }) | null
  ): Promise<void> => {
    return tenant && tenant.trim().length
      ? Promise.resolve()
      : Promise.reject();
  };

  render() {
    const { tenant } = this.state;

    return (
      <div className="App">
        {tenant ? (
          <ReactAuthProvider
            project={tenant}
            redirectUrl={window.location.href}
            errorRedirectUrl={window.location.href}
          >
            <div>Hello World</div>
          </ReactAuthProvider>
        ) : (
          <TenantSelector
            onTenantSelected={this.handleTenantSelect}
            validateTenant={this.validateTenant}
            initialTenant="publicdata"
            title="Infographic Demo"
          />
        )}
      </div>
    );
  }
}

export default InfographicApp;
