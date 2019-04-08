import * as lschache from "lscache";

class PersistentDataService {
  public getTenant(): string | null {
    return lschache.get("tenant") || null;
  }

  public setTenant(tenant: string): void {
    console.log("set tenant");
    lscache.set("tenant", tenant);
  }
}

export default new PersistentDataService();
