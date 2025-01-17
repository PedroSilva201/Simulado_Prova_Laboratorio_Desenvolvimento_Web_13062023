import api from "./api";
import { MesoProps, RegiaoProps, UfProps } from "../types";

class Ibge {
  async getRegioes(): Promise<RegiaoProps[]> {
    const { data } = await api.get("/regioes?orderBy=nome");
    return data;
  }

  async getUfPorRegiao(idRegiao:number): Promise<UfProps[]> {
    const { data } = await api.get(`/regioes/${idRegiao}/estados?orderBy=nome`);
    return data;
  }

  async getMesoPorUf(sigla:string): Promise<MesoProps[]> {
    const { data } = await api.get(`/estados/${sigla}/mesorregioes?orderBy=nome`);
    return data;
  }
}

const ibge = new Ibge();
export default ibge;
