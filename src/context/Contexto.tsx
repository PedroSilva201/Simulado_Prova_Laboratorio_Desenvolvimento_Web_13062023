import { createContext, useState } from "react";
import { ContextProps, MesoProps, RegiaoProps, UfProps } from "../types";

interface ProviderProps {
  children: React.ReactNode;
}

interface ExtendedContextProps extends ContextProps {
  setRegioes: React.Dispatch<React.SetStateAction<RegiaoProps[]>>;
  setUfs: React.Dispatch<React.SetStateAction<UfProps[]>>;
  setMesos: React.Dispatch<React.SetStateAction<MesoProps[]>>;
}

const Contexto = createContext({} as ExtendedContextProps);

function Provider({ children }: ProviderProps) {
  const [regioes, setRegioes] = useState([] as RegiaoProps[]);
  const [ufs, setUfs] = useState([] as UfProps[]);
  const [mesos, setMesos] = useState([] as MesoProps[]);

  const contextValue: ExtendedContextProps = {
    regioes,
    setRegioes,
    ufs,
    setUfs,
    mesos,
    setMesos,
  };

  return (
    <Contexto.Provider value={contextValue}>
      {children}
    </Contexto.Provider>
  );
}

export { Contexto, Provider };
