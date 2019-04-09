import React, { Component } from "react";
import styled from "styled-components";
import { TenantSelector } from "@cognite/gearbox";
import { ReactAuthProvider } from "@cognite/react-auth";
import InfoLayout from "./containers/InfoLayout";
import persistentDataService from "./services/PersistentData";

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

interface InfographicAppProps {}

interface InfographicAppState {
  tenant: string | null;
}

class InfographicApp extends Component<
  InfographicAppProps,
  InfographicAppState
> {
  constructor(props: InfographicAppProps) {
    super(props);

    this.state = {
      tenant: persistentDataService.getTenant()
    };
  }

  handleTenantSelect = (
    tenant: string,
    advancedOptions: ({ [name: string]: string | number }) | null
  ) => {
    persistentDataService.setTenant(tenant);
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

  handleLogout = () => {
    persistentDataService.clearTenant();
    this.setState({ tenant: null });
  };

  render() {
    const { tenant } = this.state;

    return (
      <>
        {tenant ? (
          <ReactAuthProvider
            project={tenant}
            redirectUrl={window.location.href}
            errorRedirectUrl={window.location.href}
          >
            <InfoLayout logoutAction={this.handleLogout} />
          </ReactAuthProvider>
        ) : (
          <PageContainer>
            <TenantSelectorContainer>
              <TenantSelector
                onTenantSelected={this.handleTenantSelect}
                validateTenant={this.validateTenant}
                initialTenant="publicdata"
                title="Infographic Demo"
              />
            </TenantSelectorContainer>
          </PageContainer>
        )}
      </>
    );
  }
}

export default InfographicApp;
