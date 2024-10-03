import { createContext, useState } from "react";

export type GithubInfo = {
  name: string;
  description: string;
  language: string;
  author: string;
  website: string;
  language: string;
};

export const GithubContext = createContext<{
  githubInfo: GithubInfo | undefined;
  setGithubInfo: (info: GithubInfo) => void;
}>({
  githubInfo: undefined,
  setGithubInfo: () => {},
});

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [githubInfo, setGithubInfo] = useState<GithubInfo | undefined>(
    undefined
  );
  return (
    <GithubContext.Provider
      value={{
        githubInfo,
        setGithubInfo,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
