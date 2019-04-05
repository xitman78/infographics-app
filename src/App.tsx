import React, { Component } from "react";
import styled from "styled-components";
import { TenantSelector } from "@cognite/gearbox";
import { ReactAuthProvider } from "@cognite/react-auth";
import BackgroundImage from "./components/BackgroundImage";
import "antd/dist/antd.css";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TenantSelectorContainer = styled.div`
  max-width: 600px;
  min-width: 400px;
`;

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
      <PageContainer>
        {tenant ? (
          <ReactAuthProvider
            project={tenant}
            redirectUrl={window.location.href}
            errorRedirectUrl={window.location.href}
          >
            <BackgroundImage/>
          </ReactAuthProvider>
        ) : (
          <TenantSelectorContainer>
            <TenantSelector
              onTenantSelected={this.handleTenantSelect}
              validateTenant={this.validateTenant}
              initialTenant="publicdata"
              title="Infographic Demo"
            />
          </TenantSelectorContainer>
        )}
      </PageContainer>
    );
  }
}

export default InfographicApp;
