export interface Produkt {
  Id: string;
  Textilkennzeichen: string;
  Produktnummer: string;
  Bestand: number;
}

export interface ProdukteResponse {
  count: number;
  rows: Produkt[];
}
