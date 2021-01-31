export type EintragungStatus =
  | 'Verkauf'
  | 'Schenkung'
  | 'Reklamation'
  | 'Storniert'
  | 'Produktion';

export interface Eintragung {
  Id: number;
  Shopify_Id: number | undefined;
  Bestellnummer: string | undefined;
  Datum: string | undefined;
  Textilkennzeichen: string;
  Produktnummer: string;
  Anzahl: number;
  Verkauf: boolean;
  Schenkung: boolean;
  Reklamation: boolean;
  Produziert: boolean;
  Status: EintragungStatus;
  Name: string | undefined;
  Autor: string | undefined;
  Kommentar: string | undefined;
}

export interface EintragungenResponse {
  count: number;
  rows: Eintragung[];
}
