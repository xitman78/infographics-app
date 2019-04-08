const TENANT = 'tenant';

class PersistentDataService {
  public getTenant(): string | null {
    return window.localStorage.getItem(TENANT) || null;
  }

  public setTenant(tenant: string): void {
    window.localStorage.setItem(TENANT, tenant);
  }

  public clearTenant() {
    window.localStorage.removeItem(TENANT);
  }
}

export default new PersistentDataService();
