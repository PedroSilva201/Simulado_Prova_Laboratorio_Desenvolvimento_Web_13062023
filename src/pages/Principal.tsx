import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Regiao {
  id: number;
  nome: string;
}

interface Estado {
  id: number;
  nome: string;
}

interface Mesorregiao {
  id: number;
  nome: string;
}

export default function Principal() {
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [mesorregioes, setMesorregioes] = useState<Mesorregiao[]>([]);

  useEffect(() => {
    async function fetchRegioes() {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/regioes?orderBy=nome"
        );
        const data = await response.json();
        setRegioes(data as Regiao[]);
      } catch (error) {
        console.error("Erro ao carregar as regiões:", error);
      }
    }

    fetchRegioes();
  }, []);

  async function carregarEstados(regiaoId: number) {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiaoId}/estados?orderBy=nome`
      );
      const data = await response.json();
      setEstados(data as Estado[]);
      setMesorregioes([]);
    } catch (error) {
      console.error("Erro ao carregar os estados:", error);
    }
  }

  async function carregarMesorregioes(estadoId: number) {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/mesorregioes?orderBy=nome`
      );
      const data = await response.json();
      setMesorregioes(data as Mesorregiao[]);
    } catch (error) {
      console.error("Erro ao carregar as mesorregiões:", error);
    }
  }

  return (
    <WrapperSld>
      <BoxSld>
        <PanelTitle>Regiões</PanelTitle>
        {regioes.map((regiao) => (
          <TitleSld
            key={regiao.id}
            onClick={() => carregarEstados(regiao.id)}
          >
            {regiao.nome}
          </TitleSld>
        ))}
      </BoxSld>
      <BoxSld>
        <PanelTitle>Estados</PanelTitle>
        {estados.map((estado) => (
          <TitleSld
            key={estado.id}
            onClick={() => carregarMesorregioes(estado.id)}
          >
            {estado.nome}
          </TitleSld>
        ))}
      </BoxSld>
      <BoxSld>
        <PanelTitle>Mesorregiões</PanelTitle>
        {mesorregioes.map((mesorregiao) => (
          <TitleSld key={mesorregiao.id}>{mesorregiao.nome}</TitleSld>
        ))}
      </BoxSld>
    </WrapperSld>
  );
}

const WrapperSld = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoxSld = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  margin: 0 10px;
  flex: 1;
`;

const PanelTitle = styled.h3`
  text-align: center;
`;

const TitleSld = styled.h5`
  text-align: center;
  margin: 10px 0;
  cursor: pointer;
`;
