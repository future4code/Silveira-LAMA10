import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";


export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "NOME_TABELA_BANDAS";

  public async createBand(band: Band): Promise<void> {

    try {
      await this.getConnection()
        .insert({
          id: band.getId(),
          name: band.getName(),
          music_genre: band.getGenre(),
          responsible: band.getResponsible()

        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandByNameOrId(name: string, id?: string): Promise<Band> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ name })
        .orWhere({ id });

      return result[0] && Band.toBandModel(result[0]);

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new BandDatabase()