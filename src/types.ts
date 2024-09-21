export type Token = {
  symbol: string;
  icon?: string;
};

export type Network = {
  name: string;
  icon: string;
  color?: string;
  supported: boolean;
  tokens: Token[];
};






