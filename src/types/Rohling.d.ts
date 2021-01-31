export interface Rohling {
  Id: number;
  Textilkennzeichen: string;
  Bestand: number;
}

export interface RohlingeResponse {
  count: number;
  rows: Rohling[];
}
